/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FastifyRequest, FastifyReply, RequestGenericInterface } from "fastify";
import { SocketStream } from "@fastify/websocket";
import { db } from "../db/db";
import { Message, NewMessage, messages } from "../db/schema";
import { eq } from "drizzle-orm/expressions";
import { v4 as uuid } from "uuid";
import { clerkClient } from "@clerk/fastify";
import { users } from "@clerk/clerk-sdk-node";

export interface requestID extends RequestGenericInterface {
    Params: {
        id: string;
    };
}

const channelRooms: Record<string, Set<SocketStream>> = {};

export const getChannelMessages = async (req: FastifyRequest<requestID>, res: FastifyReply) => {
    const { id } = req.params;

    if (!req.user!.privateMetadata.channelIds.includes(id)) {
        res.status(400).send("You Do not have Access to this Channel");
    }

    const messageData: Message[] = await db.select().from(messages).where(eq(messages.channelId, id));

    const userIds = Array.from(new Set(messageData.map((msg) => msg.userId))); // Extract unique userIds from the messages
    const usersData = await queryUser(userIds);

    // Create a mapping of userId to user data for easier access
    const usersDataMap: { [userId: string]: any } = {};
    userIds.forEach((userId, index) => {
        usersDataMap[userId] = usersData[index];
    });

    // Combine the user data with the original message data
    const combinedMessages = messageData.map((msg) => ({
        ...msg,
        firstName: usersDataMap[msg.userId]?.firstName ?? "",
        firstLast: usersDataMap[msg.userId]?.firstLast ?? "",
        profileImage: usersDataMap[msg.userId]?.profileImageUrl,
    }));
    res.send(combinedMessages);
};

const queryUser = async (userIds: string[]) => {
    const users = await clerkClient.users.getUserList({ userId: userIds });
    //console.dir(users);
    return users;
};

const updateChannelMessages = async (messageParams: NewMessage) => {
    await db.insert(messages).values(messageParams);
};

export const liveChat = (connection: SocketStream, req: FastifyRequest<requestID>) => {
    const { id } = req.params;

    if (!req.user!.privateMetadata.channelIds.includes(id)) {
        return;
    }

    if (!channelRooms[id]) channelRooms[id] = new Set();

    channelRooms[id].add(connection);

    // Client connect
    console.dir(`Client connected: ${req.user!.emailAddresses[0].emailAddress}`);

    connection.socket.on("message", (message: unknown) => {
        // Handle incoming messages from the WebSocket connection
        // broadcast the messages to other clients in the same channel
        channelRooms[id].forEach((socket) => {
            const messageParams = {
                id: uuid(),
                userId: req.user!.id,
                channelId: id,
                message: `${message}`,
            };

            socket.socket.send(
                JSON.stringify({
                    ...messageParams,
                    profileImage: req.user!.profileImageUrl ?? "",
                    email: req.user!.emailAddresses[0].emailAddress ?? "",
                    firstName: req.user!.firstName ?? "",
                    lastName: req.user!.lastName ?? "",
                })
            );

            updateChannelMessages(messageParams);
        });
    });

    connection.socket.on("close", () => {
        // Handle WebSocket connection close event
        // Clean up any resources or update application state
        console.dir(`Client Disconnected: ${req.user!.username}`);
        channelRooms[id].delete(connection);

        // If the room becomes empty, remove it from the rooms object
        if (channelRooms[id].size === 0) {
            delete channelRooms[id];
        }
    });
};

export default {
    liveChat,
};

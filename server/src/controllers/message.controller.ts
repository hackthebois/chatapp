import { FastifyRequest, FastifyReply } from "fastify";
import { SocketStream } from "@fastify/websocket";
import { db } from "../db/db";
import { messages } from "../db/schema";
import { eq } from "drizzle-orm/expressions";

interface GetMessagesDTO {
    id: string;
}

export const getAllMessages = async (req: FastifyRequest<{ Params: GetMessagesDTO }>, res: FastifyReply) => {
    const { id } = req.params;
    res.send(await db.select().from(messages).where(eq(messages.channelId, id)));
};
export const chat = (req: FastifyRequest, res: FastifyReply) => {
    res.send("CHAT APP");
};

export const liveChat = (connection: SocketStream, req: FastifyRequest) => {
    // Client connect
    console.log("Client connected");
    // Client message
    connection.socket.on("message", (message: unknown) => {
        connection.socket.send("Hi Welcome");
    });
    // Client disconnect
    connection.socket.on("close", () => {
        console.log("Client disconnected");
    });
};

export default {
    liveChat,
    chat,
};

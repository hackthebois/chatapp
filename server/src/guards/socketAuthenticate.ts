import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest, RequestGenericInterface } from "fastify/types/request";
import clerk from "@clerk/clerk-sdk-node";
import { ClerkUser } from "../types/types";
import { clerkClient } from "@clerk/fastify";

export interface requestToken extends RequestGenericInterface {
    Querystring: {
        token: string;
    };
}

export const socketAuthenticate = async (request: FastifyRequest<requestToken>, reply: FastifyReply) => {
    const { token } = request.query;

    console.dir("HERE");

    const res = await clerk.authenticateRequest({ headerToken: token });
    const userId = res.toAuth()?.userId;
    const user = userId ? await clerkClient.users.getUser(userId) : null;

    if (!user) reply.status(401).send();
    else {
        request.user = user as ClerkUser;
        if (!user.privateMetadata.channelIds) {
            request.user.privateMetadata = { channelIds: [] };
            await clerkClient.users.updateUser(user.id, { privateMetadata: request.user.privateMetadata });
        }
    }
};

export default socketAuthenticate;

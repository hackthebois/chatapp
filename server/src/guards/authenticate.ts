import { FastifyRequest, FastifyReply } from "fastify";
import { clerkClient, getAuth } from "@clerk/fastify";
import { ClerkUser } from "../types/types";

export const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
    const { userId } = getAuth(request);
    const user = userId ? await clerkClient.users.getUser(userId) : null;
    if (!user) reply.status(401).send();
    else {
        request.user = user as ClerkUser;
        if (!user.privateMetadata.channelIds) {
            request.user!.privateMetadata = { channelIds: [] };
            await clerkClient.users.updateUser(user.id, { privateMetadata: request.user!.privateMetadata });
        }
    }
};

export default authenticate;

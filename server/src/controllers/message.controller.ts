import { FastifyRequest, FastifyReply } from "fastify";

export const liveChat = async (req: FastifyRequest, res: FastifyReply, connection: SocketStream) => {};

export default {
    liveChat,
};

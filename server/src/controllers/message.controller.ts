import { FastifyRequest, FastifyReply } from "fastify";
import { SocketStream } from "@fastify/websocket";

export const liveChat = async (req: FastifyRequest, res: FastifyReply, connection: SocketStream) => {};

export default {
    liveChat,
};

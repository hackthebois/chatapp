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

export const liveChat = (connection: SocketStream, req: FastifyRequest, res: FastifyReply) => {};

export default {
    liveChat,
};

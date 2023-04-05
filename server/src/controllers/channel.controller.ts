import { FastifyReply, FastifyRequest } from "fastify";
import { NewChannel, channel, channels } from "../db/schema";
import { db } from "../db/db";
import { v4 as uuid } from "uuid";
import { and, eq } from "drizzle-orm/expressions";

interface ChangeChannelDTO {
    name: string;
}

interface GetChannelDTO {
    id: string;
}

export const getChannels = async (req: FastifyRequest, res: FastifyReply) => {
    res.send(await db.select().from(channels).where(eq(channels.userId, req.user!.id)));
};

export const getChannel = async (req: FastifyRequest<{ Params: GetChannelDTO }>, res: FastifyReply) => {
    const { id } = req.params;
    var channel: channel[] = await db.select().from(channels).where(eq(channels.id, id));

    if (channel.length) {
        res.send(channel[0]);
    } else res.status(404).send("Channel Does Not Exist");
};

export const addChannel = async (req: FastifyRequest<{ Body: ChangeChannelDTO }>, res: FastifyReply) => {
    const { name } = req.body;
    const newChannel: NewChannel = {
        id: uuid(),
        name: name,
        userId: req.user!.id,
    };
    await db.insert(channels).values(newChannel);
    const createdChannel = await db
        .select()
        .from(channels)
        .where(and(eq(channels.userId, req.user!.id), eq(channels.name, name)));
    res.send(createdChannel[0]);
};

export const deleteChannel = async (req: FastifyRequest<{ Params: GetChannelDTO }>, res: FastifyReply) => {
    const { id } = req.params;
    await db.delete(channels).where(eq(channels.id, id));

    const deleteChannel = await db
        .select()
        .from(channels)
        .where(and(eq(channels.userId, req.user!.id), eq(channels.id, id)));

    if (deleteChannel.length) res.status(400).send("Channel Was NOT Deleted");
    else res.send("Channel Was Deleted");
};

export const updateChannel = async (
    req: FastifyRequest<{ Body: ChangeChannelDTO; Params: GetChannelDTO }>,
    res: FastifyReply
) => {
    const { name } = req.body;
    const { id } = req.params;

    await db.update(channels).set({ name: name }).where(eq(channels.id, id));
    const updatedChannel = await db
        .select()
        .from(channels)
        .where(and(eq(channels.userId, req.user!.id), eq(channels.name, name)));
    if (!updateChannel.length) res.status(400).send("Channel Was NOT Updated");
    else res.send(updatedChannel[0]);
};

export default {
    getChannels,
    getChannel,
    addChannel,
    deleteChannel,
    updateChannel,
};

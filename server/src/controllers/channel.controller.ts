/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { clerkClient } from "@clerk/fastify";
import { and, eq, sql } from "drizzle-orm";
import { FastifyReply, FastifyRequest } from "fastify";
import { v4 as uuid } from "uuid";
import { db } from "../db/db";
import { NewChannel, channels } from "../db/schema";

interface ChangeChannelDTO {
    name: string;
}

interface GetChannelDTO {
    id: string;
}

export const getChannels = async (req: FastifyRequest, res: FastifyReply) => {
    if (req.user!.privateMetadata.channelIds.length > 0)
        res.send(
            await db
                .select()
                .from(channels)
                .where(sql`${channels.id} in ${req.user!.privateMetadata.channelIds}`)
        );
    else res.send([]);
};

export const getChannel = async (req: FastifyRequest<{ Params: GetChannelDTO }>, res: FastifyReply) => {
    const { id } = req.params;
    const channel = await db.select().from(channels).where(eq(channels.id, id));

    if (channel.length && req.user!.privateMetadata.channelIds.includes(id)) {
        res.send(channel[0]);
    } else res.status(404).send("Channel Does Not Exist");
};

export const createChannel = async (req: FastifyRequest<{ Body: ChangeChannelDTO }>, res: FastifyReply) => {
    const { name } = req.body;

    const newChannel: NewChannel = {
        id: uuid(),
        name: name,
        ownerId: req.user!.id,
    };

    await db.insert(channels).values(newChannel);
    const createdChannel = await db
        .select()
        .from(channels)
        .where(and(eq(channels.ownerId, req.user!.id), eq(channels.name, name)));

    req.user!.privateMetadata.channelIds.push(createdChannel[0].id);
    clerkClient.users.updateUser(req.user!.id, { privateMetadata: req.user!.privateMetadata });

    res.send(createdChannel[0]);
};

export const joinChannel = async (req: FastifyRequest<{ Params: GetChannelDTO }>, res: FastifyReply) => {
    const { id } = req.params;

    if (!req.user!.privateMetadata.channelIds.includes(id)) {
        req.user!.privateMetadata.channelIds.push(id);
        clerkClient.users.updateUser(req.user!.id, { privateMetadata: req.user!.privateMetadata });
        res.send(`Joined Channel: ${id}`);
    } else {
        res.status(400).send(`Already Joined Channel: ${id}`);
    }
};

export const deleteChannel = async (req: FastifyRequest<{ Params: GetChannelDTO }>, res: FastifyReply) => {
    const { id } = req.params;

    const deleteChannel = await db
        .select()
        .from(channels)
        .where(and(eq(channels.ownerId, req.user!.id), eq(channels.id, id)));

    await db.delete(channels).where(and(eq(channels.id, id), eq(channels.ownerId, req.user!.id)));

    if (deleteChannel.length) res.status(400).send("Channel Was NOT Deleted");
    else res.send("Channel Was Deleted");
};

export const updateChannel = async (
    req: FastifyRequest<{ Body: ChangeChannelDTO; Params: GetChannelDTO }>,
    res: FastifyReply
) => {
    const { name } = req.body;
    const { id } = req.params;

    await db
        .update(channels)
        .set({ name: name })
        .where(and(eq(channels.id, id), eq(channels.ownerId, req.user!.id)));

    const updatedChannel = await db
        .select()
        .from(channels)
        .where(and(eq(channels.ownerId, req.user!.id), eq(channels.name, name)));

    if (!updateChannel.length) res.status(400).send("Channel Was NOT Updated");
    else res.send(updatedChannel[0]);
};

export default {
    getChannels,
    getChannel,
    addChannel: createChannel,
    deleteChannel,
    updateChannel,
};

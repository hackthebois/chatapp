import { FastifyReply, FastifyRequest } from "fastify";
import { NewChannel, channel, channels } from "../db/schema";
import { db } from "../db/db";
import { v4 as uuid } from "uuid";
import { and, eq } from "drizzle-orm/expressions";

interface CreateChannelDTO {
  name: string;
}

interface GetChannelDTO {
  id: string;
}

export const getChannels = async (req: FastifyRequest, res: FastifyReply) => {
  res.send(await db.select().from(channels));
};

export const getChannel = async (req: FastifyRequest<{ Params: GetChannelDTO }>, res: FastifyReply) => {
  const { id } = req.params;
  var channel: channel[] = await db.select().from(channels).where(eq(channels.id, id));

  if (channel.length) {
    res.send(channel[0]);
  } else res.status(404).send("Channel Does Not Exist");
};

export const addChannel = async (req: FastifyRequest<{ Body: CreateChannelDTO }>, res: FastifyReply) => {
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
  res.send(createdChannel);
};

export const deleteChannel = (req: FastifyRequest, res: FastifyReply) => {
  res.send("delete");
};

export const updateChannel = (req: FastifyRequest, res: FastifyReply) => {
  res.send("update");
};

export default {
  getChannels,
  getChannel,
  addChannel,
  deleteChannel,
  updateChannel,
};

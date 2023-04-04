import { FastifyReply, FastifyRequest } from "fastify";
import { NewChannel, channels } from "../Database/schema";
import { db } from "../Database/db";

const channels_test = [
  {
    id: "1",
    name: "General",
  },
  {
    id: "2",
    name: "Bois",
  },
  {
    id: "3",
    name: "Tech",
  },
  {
    id: "4",
    name: "General",
  },
  {
    id: "5",
    name: "Bois",
  },
];

interface CreateChannel {
  name: string;
}

export const getChannels = (req: FastifyRequest, res: FastifyReply) => {
  res.send(channels_test);
};

export const getChannel = (req: FastifyRequest, res: FastifyReply) => {
  res.send("get");
};

export const addChannel = async (req: FastifyRequest<{ Querystring: CreateChannel }>, res: FastifyReply) => {
  const { name } = req.query;
  const newChannel: NewChannel = {
    name: name,
  };

  res.send(await db.insert(channels).values(newChannel));
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

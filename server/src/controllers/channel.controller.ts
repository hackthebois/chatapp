import { FastifyReply, FastifyRequest } from "fastify";

const channels = [
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

export const getChannels = (req: FastifyRequest, res: FastifyReply) => {
  res.send(channels);
};

export const getChannel = (req: FastifyRequest, res: FastifyReply) => {
  res.send("get");
};

export const addChannel = (req: FastifyRequest, res: FastifyReply) => {
  res.send("add");
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

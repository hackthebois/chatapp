import { FastifyReply, FastifyRequest } from "fastify";

export const getChannels = (req: FastifyRequest, res: FastifyReply) => {
  res.send("get all");
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

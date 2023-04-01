import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { authenticate } from "../guards/authenticate";
import { getChannels, getChannel, addChannel, deleteChannel, updateChannel } from "../controllers/channel.controller";

// Item schema
const Item = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
  },
};

const getChannelsOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: Item,
      },
    },
  },
  preHandler: authenticate,
  handler: getChannels,
};

const getChannelOpts = {
  schema: {
    response: {
      200: Item,
    },
  },
  preHandler: authenticate,
  handler: getChannel,
};

const postChannelOpts = {
  schema: {
    body: {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
      },
    },
    response: {
      201: Item,
    },
  },
  preHandler: authenticate,
  handler: addChannel,
};

const deleteChannelOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
  preHandler: authenticate,
  handler: deleteChannel,
};

const updateChannelOpts = {
  schema: {
    response: {
      200: Item,
    },
  },
  preHandler: authenticate,
  handler: updateChannel,
};

async function chatRoutes(fastify: FastifyInstance, options: FastifyPluginOptions, done: () => void) {
  // Get all items
  fastify.get("/channels", getChannelsOpts);

  // Get single items
  fastify.get("/channels/:id", getChannelOpts);

  // Add item
  fastify.post("/channels", postChannelOpts);

  // Delete item
  fastify.delete("/channels/:id", deleteChannelOpts);

  // Update item
  fastify.put("/channels/:id", updateChannelOpts);

  done();
}

export default chatRoutes;

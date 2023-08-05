import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { authenticate } from "../guards/authenticate";
import {
    getChannels,
    getChannel,
    createChannel,
    deleteChannel,
    updateChannel,
    joinChannel,
} from "../controllers/channel.controller";

// Item schema
const Channel = {
    type: "object",
    properties: {
        id: { type: "string" },
        name: { type: "string" },
        userId: { type: "string" },
    },
};

const getChannelsOpts = {
    schema: {
        response: {
            200: {
                type: "array",
                items: Channel,
            },
        },
    },
    preHandler: authenticate,
    handler: getChannels,
};

const getChannelOpts = {
    schema: {},
    preHandler: authenticate,
    handler: getChannel,
};

const joinChannelOpts = {
    schema: {},
    preHandler: authenticate,
    handler: joinChannel,
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
            201: Channel,
        },
    },
    preHandler: authenticate,
    handler: createChannel,
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
            200: Channel,
        },
    },
    preHandler: authenticate,
    handler: updateChannel,
};

async function channelRoutes(fastify: FastifyInstance, options: FastifyPluginOptions, done: () => void) {
    // Get all channels
    fastify.get("/channels", getChannelsOpts);

    // Get single channel
    fastify.get("/channels/:id", getChannelOpts);

    // Join a Channel
    fastify.get("/channels/:id/join", joinChannelOpts);

    // Add channel
    fastify.post("/channels", postChannelOpts);

    // Delete channel
    fastify.delete("/channels/:id", deleteChannelOpts);

    // Update channel
    fastify.put("/channels/:id", updateChannelOpts);

    done();
}

export default channelRoutes;

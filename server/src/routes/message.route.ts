import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { authenticate } from "../guards/authenticate";
import { getChannelMessages, liveChat, requestID } from "../controllers/message.controller";

// Item schema
const Message = {
    type: "object",
    properties: {
        id: { type: "string" },
        name: { type: "string" },
        userId: { type: "string" },
        username: { type: "string" },
    },
};
const getMessagesOpts = {
    schema: {
        response: {
            200: {
                type: "array",
                items: Message,
            },
        },
    },
    preHandler: authenticate,
    handler: getChannelMessages,
};

const wsOpts = {
    schema: {
        response: {
            200: {
                type: "array",
                items: Message,
            },
        },
    },
    //preHandler: authenticate,
    handler: getChannelMessages,
    wsHandler: liveChat, // handles websockets for channels
};

async function messageRoutes(fastify: FastifyInstance, options: FastifyPluginOptions, done: () => void) {
    // Live Chat
    fastify.get("/channels/:id/chat", getMessagesOpts);

    fastify.addHook("preValidation", async (request, reply) => {
        // check if the request is authenticated
    });
    fastify.get("/ws/channels/:id", { websocket: true }, liveChat);

    done();
}

export default messageRoutes;

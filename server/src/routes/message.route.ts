import { FastifyInstance, FastifyPluginOptions } from "fastify";
import authenticate from "../guards/authenticate";
import { getChannelMessages, liveChat } from "../controllers/message.controller";
import socketAuthenticate from "../guards/socketAuthenticate";

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

async function messageRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    // Live Chat
    fastify.get("/channels/:id/chat", getMessagesOpts);

    fastify.addHook("preValidation", socketAuthenticate);
    fastify.get("/ws/channels/:id", { websocket: true }, liveChat);
}

export default messageRoutes;

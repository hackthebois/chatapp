import { FastifyInstance } from "fastify";
import authenticate from "../guards/authenticate";
import { getChannelMessages, liveChat } from "../controllers/message.controller";
import socketAuthenticate from "../guards/socketAuthenticate";

// Item schema
const Message = {
    type: "object",
    properties: {
        id: { type: "string" },
        channelId: { type: "string" },
        userId: { type: "string" },
        profileImage: { type: "string" },
        firstName: { type: "string" },
        lastName: { type: "string" },
        message: { type: "string" },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
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

async function websocketRoute(fastify: FastifyInstance) {
    fastify.addHook("preValidation", socketAuthenticate);
    fastify.get("/ws/channels/:id", { websocket: true }, liveChat);
}

async function messageRoutes(fastify: FastifyInstance) {
    // Live Chat
    fastify.get("/channels/:id/chat", getMessagesOpts);

    // register websocket route to add custom hook
    fastify.register(websocketRoute);
}
export default messageRoutes;

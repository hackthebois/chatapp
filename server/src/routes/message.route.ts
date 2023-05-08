import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { authenticate } from "../guards/authenticate";
import { chat, getAllMessages, liveChat } from "../controllers/message.controller";
import { SocketStream } from "@fastify/websocket";

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

const LiveMessageOpts = {
    websocket: true,
    schema: {},
    //preHandler: authenticate,
    handler: chat,
    wsHandler: liveChat,
};

const GetAllMessages = {
    schema: {
        response: {
            200: {
                type: "array",
                items: Message,
            },
        },
    },
    preHandler: authenticate,
    handler: getAllMessages,
};

async function messageRoutes(fastify: FastifyInstance, options: FastifyPluginOptions, done: () => void) {
    // Live Chat
    fastify.get("/chat", LiveMessageOpts);

    fastify.get("/channels/:id/messages", GetAllMessages);

    done();
}

export default messageRoutes;

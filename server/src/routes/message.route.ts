import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { authenticate } from "../guards/authenticate";
import { getAllMessages, liveChat } from "../controllers/message.controller";

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
    WebSocket: true,
    schema: {},
    preHandler: authenticate,
    handler: liveChat,
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

async function chatRoutes(fastify: FastifyInstance, options: FastifyPluginOptions, done: () => void) {
    // Live Chat
    fastify.get("/channels/:id/chat", LiveMessageOpts, (res, req) => {});

    fastify.get("/channels/:id/messages", GetAllMessages);

    done();
}

export default chatRoutes;

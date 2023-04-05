import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { authenticate } from "../guards/authenticate";
import { liveChat } from "../controllers/message.controller";

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

const messageOpts = {
    WebSocket: true,
    schema: {
        response: {
            type: "array",
            200: Message,
        },
    },
    preHandler: authenticate,
    handler: liveChat,
};

async function chatRoutes(fastify: FastifyInstance, options: FastifyPluginOptions, done: () => void) {
    // Live Chat
    fastify.get("/channels/:id/chat", messageOpts);

    done();
}

export default chatRoutes;

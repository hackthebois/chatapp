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

async function messageRoutes(fastify: FastifyInstance, options: FastifyPluginOptions, done: () => void) {
    // Live Chat
    fastify.route<requestID>({
        method: "GET",
        url: "/channels/:id/chat",
        schema: {
            response: {
                200: {
                    type: "array",
                    items: Message,
                },
            },
        },
        preHandler: authenticate,
        handler: getChannelMessages, //Gets channel Messages
        wsHandler: liveChat, // handles websockets for channels
    });

    done();
}

export default messageRoutes;

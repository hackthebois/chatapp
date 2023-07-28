import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest, RequestGenericInterface } from "fastify/types/request";
import jwt from "jsonwebtoken";

export interface requestToken extends RequestGenericInterface {
    Querystring: {
        token: string;
    };
}

export const socketAuthenticate = async (request: FastifyRequest<requestToken>, reply: FastifyReply) => {
    const { token } = request.query;
    const publicKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "";

    try {
        console.log(token);
        jwt.verify(token, publicKey);
        console.log("VALID");
    } catch (error) {
        console.log("invalid jwt");
    }
};

export default socketAuthenticate;

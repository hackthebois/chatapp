import { FastifyRequest, FastifyReply } from "fastify";
import "../loadEnv";
import { clerkClient, getAuth } from "@clerk/fastify";
import { ClerkUser } from "../types/types";

export const authenticate = async (request: FastifyRequest, reply: FastifyReply, done: () => void) => {
  const { userId } = getAuth(request);
  const user = userId ? await clerkClient.users.getUser(userId) : null;
  if (!user) {
    return reply.status(401).send({ error: "Unauthorized" });
  } else {
    request.user = user as ClerkUser;
  }
  done();
};

export default authenticate;

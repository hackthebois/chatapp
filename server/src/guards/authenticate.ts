import { FastifyRequest, FastifyReply } from "fastify";
import "../loadEnv";
import { getAuth } from "@clerk/fastify";
import { ClerkUser } from "../types/types";

export function authenticate(request: FastifyRequest, reply: FastifyReply, done: () => void) {
  const { user } = getAuth(request);
  if (!user) {
    return reply.status(401).send({ error: "Unauthorized" });
  } else {
    request.user = user as ClerkUser;
  }
  done();
}

export default authenticate;

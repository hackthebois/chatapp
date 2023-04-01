import "./loadEnv";
import Fastify from "fastify";
import { clerkClient, clerkPlugin, getAuth } from "@clerk/fastify";
import routes from "./routes/chat";

const fastify = Fastify();

fastify.register(clerkPlugin);
fastify.register(routes, { prefix: "/chat" });

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();

export default fastify;

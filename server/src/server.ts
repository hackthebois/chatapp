import "./loadEnv";
import Fastify from "fastify";
import { clerkPlugin } from "@clerk/fastify";
import routes from "./routes/channel.route";
import cors from "@fastify/cors";

const fastify = Fastify();

fastify.register(cors, {
  origin: "*",
});
fastify.register(clerkPlugin);
fastify.register(routes);

const start = async () => {
  try {
    await fastify.listen({ port: Number(process.env.PORT) || 8000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();

export default fastify;

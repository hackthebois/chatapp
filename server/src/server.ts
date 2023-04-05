import * as dotenv from "dotenv";
dotenv.config();

import Fastify from "fastify";
import { clerkPlugin } from "@clerk/fastify";
import routes from "./routes/channel.route";
import cors from "@fastify/cors";

const fastify = Fastify({ logger: true });

fastify.get("/", (req, res) => {
  res.send("MADE IT");
});

const start = async () => {
  try {
    await fastify.register(clerkPlugin);
    await fastify.register(cors, {
      origin: "*",
      allowedHeaders: ["Authorization", "Content-Type"],
    });

    await fastify.register(routes);
    await fastify.listen({ port: Number(process.env.PORT) || 8000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();

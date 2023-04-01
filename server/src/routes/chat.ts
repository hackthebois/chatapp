import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { authenticate } from "../guards/authenticate";

async function routes(fastify: FastifyInstance, options: FastifyPluginOptions, done: () => void) {
  fastify.get("/", { preHandler: [authenticate] }, async (req, res) => {
    res.send("Hi");
  });

  done();
}

export default routes;

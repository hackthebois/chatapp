declare module "fastify" {
  interface FastifyRequest {
    user?: ClerkUser;
  }
}

export interface ClerkUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
}

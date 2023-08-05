import { User } from "@clerk/backend/dist/types/api/resources/User";

declare module "fastify" {
    interface FastifyRequest {
        user?: ClerkUser;
    }
}

export declare class ClerkUser extends User {
    privateMetadata: { channelIds: string[] };
}

import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const db = drizzle(neon(process.env.DATABASE_URL!), { logger: true });

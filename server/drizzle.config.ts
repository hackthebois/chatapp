import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
    schema: "./src/db/schema.ts",
    driver: "pg",
    out: "./src/db/migrations",
    dbCredentials: {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        connectionString: process.env.DATABASE_URL!,
    },
    verbose: true,
    strict: true,
} satisfies Config;

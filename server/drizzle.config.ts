// import "dotenv/config";

// /** @type { import("drizzle-kit").Config } */
// export default {
//     schema: "./src/db/schema.ts",
//     driver: "pg",
//     dbCredentials: {
//         // eslint-disable-next-line no-undef
//         connectionString: process.env.DB_URL,
//     },
// };

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

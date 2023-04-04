import "dotenv/config";

/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./src/db/schema.ts",
  // eslint-disable-next-line no-undef
  connectionString: process.env.DB_URL,
};

import { drizzle } from "drizzle-orm/mysql2";

import mysql from "mysql2/promise";

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: true,
  },
});

export const db = drizzle(connection, { logger: true });

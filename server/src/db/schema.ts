import { mysqlTable, serial, varchar, datetime, text, uniqueIndex } from "drizzle-orm/mysql-core";
import { InferModel } from "drizzle-orm";

export const channels = mysqlTable("Channels", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  userId: varchar("user_id", { length: 256 }),
  createdAt: datetime("created_at").notNull().default(new Date()),
  updatedAt: datetime("updated_at").notNull().default(new Date()),
});

export type channel = InferModel<typeof channels>;
export type NewChannel = InferModel<typeof channels, "insert">;

export const messages = mysqlTable(
  "messages",
  {
    id: serial("id").primaryKey(),
    message: text("message").notNull(),
    userId: varchar("user_id", { length: 256 }),
    username: varchar("name", { length: 100 }).notNull(),
    createdAt: datetime("created_at").notNull().default(new Date()),
    updatedAt: datetime("updated_at").notNull(),
  },
  (message) => ({
    channelIndex: uniqueIndex("channel_idx").on(message.id),
  })
);

export type Message = InferModel<typeof messages>;
export type NewMessage = InferModel<typeof messages, "insert">;

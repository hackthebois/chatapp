import { mysqlTable, varchar, datetime, text, uniqueIndex, primaryKey, foreignKey } from "drizzle-orm/mysql-core";
import { InferModel } from "drizzle-orm";

export const channels = mysqlTable("channels", {
    id: varchar("id", { length: 256 }).primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    ownerId: varchar("user_id", { length: 256 }).notNull(),
    createdAt: datetime("created_at").notNull().default(new Date()),
    updatedAt: datetime("updated_at").notNull().default(new Date()),
});

export type channel = InferModel<typeof channels>;
export type NewChannel = InferModel<typeof channels, "insert">;

export const messages = mysqlTable(
    "messages",
    {
        id: varchar("id", { length: 256 }).primaryKey(),
        message: text("message").notNull(),
        userId: varchar("user_id", { length: 256 }).notNull(),
        username: varchar("username", { length: 100 }).notNull(),
        createdAt: datetime("created_at").notNull().default(new Date()),
        updatedAt: datetime("updated_at").notNull().default(new Date()),
        channelId: varchar("channel_id", { length: 256 }).notNull(),
    },
    (message) => ({
        channelIdIndex: uniqueIndex("channel_id_idx").on(message.channelId),
    })
);

export type Message = InferModel<typeof messages>;
export type NewMessage = InferModel<typeof messages, "insert">;

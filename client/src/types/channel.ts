import { z } from "zod";

export const MessageSchema = z.object({
	id: z.string(),
	username: z.string(),
	profileImage: z.string(),
	userId: z.string(),
	message: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
});
export type MessageType = z.infer<typeof MessageSchema>;

export const ChannelSchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(1).max(100),
});
export type ChannelType = z.infer<typeof ChannelSchema>;

export const CreateChannelSchema = z.object({
	name: ChannelSchema.shape.name,
});
export type CreateChannelType = z.infer<typeof CreateChannelSchema>;

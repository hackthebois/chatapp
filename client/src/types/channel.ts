import { z } from "zod";

export const ChannelSchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(1).max(100),
	userId: z.string(),
});
export type ChannelType = z.infer<typeof ChannelSchema>;

export const CreateChannelSchema = z.object({
	name: ChannelSchema.shape.name,
});
export type CreateChannelType = z.infer<typeof CreateChannelSchema>;

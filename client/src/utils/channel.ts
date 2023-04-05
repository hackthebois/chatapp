import { ChannelSchema } from "../types/channel";

export const getChannel = async (id: string) => {
	const res = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/channels/${id}`,
		{
			headers: {
				Authorization: `Bearer ${await window.Clerk.session.getToken()}`,
			},
		}
	);
	if (!res.ok) {
		throw new Error("Network response error");
	}
	const body: unknown = await res.json();
	return ChannelSchema.parse(body);
};

export const getChannels = async () => {
	const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/channels`, {
		headers: {
			Authorization: `Bearer ${await window.Clerk.session.getToken()}`,
		},
	});
	if (!res.ok) {
		throw new Error("Network response error");
	}
	const body: unknown = await res.json();
	return ChannelSchema.array().parse(body);
};

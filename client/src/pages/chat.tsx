import { UserButton, useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { Link, Outlet } from "@tanstack/react-router";
import React, { useState } from "react";
import { FaBars, FaPlus } from "react-icons/fa";
import { z } from "zod";

const ChannelSchema = z.object({
	id: z.string(),
	name: z.string(),
});

type ChannelType = z.infer<typeof ChannelSchema>;

const channels: ChannelType[] = [
	{
		id: "1",
		name: "General",
	},
	{
		id: "2",
		name: "Bois",
	},
	{
		id: "3",
		name: "Tech",
	},
	{
		id: "4",
		name: "General",
	},
	{
		id: "5",
		name: "Bois",
	},
];

const useChannels = () => {
	const { getToken } = useAuth();
	return useQuery({
		queryFn: async () => {
			const res = await fetch(
				`${import.meta.env.VITE_SERVER_URL}/channels`,
				{
					headers: { Authorization: `Bearer ${await getToken()}` },
				}
			);
			if (!res.ok) {
				throw new Error("Network response error");
			}
			const body = await res.json();
			console.log(body);
			return body;
		},
		queryKey: ["channels"],
	});
};

const Chat = () => {
	const { data } = useChannels();
	const [drawerOpen, setDrawerOpen] = useState(true);
	console.log(data);

	return (
		<>
			<header className="z-20 flex h-12 flex-row items-center justify-between bg-zinc-800 pr-4 shadow-2xl">
				<button
					className="h-full px-4"
					onClick={() => setDrawerOpen(!drawerOpen)}
				>
					<FaBars size={20} className="text-zinc-200" />
				</button>
				<UserButton />
			</header>
			<div className="relative flex h-screen max-h-screen w-screen flex-1 justify-start overflow-y-auto">
				{drawerOpen && (
					<div className="absolute bottom-0 left-0 top-0 z-10 flex h-full max-h-full w-52 flex-col bg-zinc-800 shadow-xl sm:relative">
						<div className="flex h-12 items-center justify-between pl-4 text-zinc-400">
							<p className="font-bold">Channels</p>
							<Link
								to="/chat"
								className="flex w-12 justify-end pr-4"
							>
								<FaPlus />
							</Link>
						</div>
						<div className="mb-4 flex-1 overflow-y-auto px-4 scrollbar-thin  scrollbar-thumb-zinc-600 scrollbar-thumb-rounded">
							{channels.map((channel, index) => (
								<Link
									key={channel.id}
									to="/chat/$channelId"
									params={{ channelId: channel.id }}
									className={`flex h-10 w-full items-center rounded bg-zinc-900 px-3 font-bold text-zinc-200 shadow ${
										index !== channels.length - 1
											? "mb-2"
											: ""
									}`}
								>
									{channel.name}
								</Link>
							))}
						</div>
					</div>
				)}
				<Outlet />
			</div>
		</>
	);
};

export default Chat;

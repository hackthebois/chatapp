import { UserButton, useAuth } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, Outlet, useNavigate, useParams } from "@tanstack/react-router";
import React, { useState } from "react";
import { FaBars, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { getChannels } from "../../utils/channel";

const Chat = () => {
	const queryClient = useQueryClient();
	const { getToken } = useAuth();
	const { channelId } = useParams({ from: "/chat" });
	const navigate = useNavigate({ from: `/chat/$channelId` });
	const { data: channels } = useQuery({
		queryFn: getChannels,
		queryKey: ["channels"],
	});
	const { mutate } = useMutation({
		mutationFn: async (id: string) => {
			await fetch(`${import.meta.env.VITE_SERVER_URL}/channels/${id}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${await getToken()}`,
				},
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["channels"]).then(() => {
				navigate({ to: "/chat" });
			});
		},
	});
	const [drawerOpen, setDrawerOpen] = useState(true);

	const activeChannel = channels?.find((channel) => channel.id === channelId);

	return (
		<main className="relative flex h-full w-screen flex-col">
			<header className="flex h-12 flex-row items-center justify-between bg-zinc-900 pr-4 shadow-2xl">
				<button
					className="h-full px-4"
					onClick={() => setDrawerOpen(!drawerOpen)}
				>
					<FaBars size={20} className="text-zinc-200" />
				</button>
				<button
					onClick={async () => {
						console.log(await getToken({ template: "User_Token" }));
					}}
				>
					LOG TOKEN
				</button>
				<UserButton afterSignOutUrl="/" />
			</header>
			<div className="relative z-10 flex h-screen max-h-screen w-screen flex-1 justify-start overflow-y-auto">
				{drawerOpen && (
					<div className="absolute bottom-0 left-0 top-0 z-10 flex h-full max-h-full w-60 flex-col bg-zinc-800 shadow-xl sm:relative">
						<div className="flex h-12 items-center justify-between pl-4 text-zinc-400">
							<p className="font-bold">Channels</p>
							<Link
								to="/chat/create"
								className="flex w-12 justify-end pr-4"
							>
								<FaPlus />
							</Link>
						</div>
						<div className="relative mb-4 flex-1 overflow-y-auto px-4  scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-thumb-rounded">
							{channels &&
								channels.map((channel, index) => {
									console.log(channel.id, channelId);
									return (
										<Link
											key={channel.id}
											to="/chat/$channelId"
											params={{ channelId: channel.id }}
											className={`group flex h-10 w-full items-center overflow-hidden rounded bg-zinc-900 pr-2 font-bold text-zinc-200 shadow-2xl ${
												index !== channels.length - 1
													? "mb-2"
													: ""
											}`}
										>
											<div
												className="mr-2 h-full w-[6px] overflow-hidden bg-zinc-700 transition-colors"
												style={{
													backgroundColor:
														channelId === channel.id
															? "rgb(241 245 249)"
															: "rgb(63 63 70)",
												}}
											/>
											<p className="overflow-hidden text-ellipsis">
												{channel.name}
											</p>
										</Link>
									);
								})}
						</div>
						{activeChannel && (
							<button
								className="mx-4 mb-4 flex h-8 items-center justify-center rounded border border-red-500 font-bold text-red-500 transition-colors hover:bg-white/5"
								onClick={() => {
									mutate(activeChannel.id);
								}}
							>
								<FaSignOutAlt className="mr-2" />
								Leave Channel
							</button>
						)}
					</div>
				)}
				<Outlet />
			</div>
		</main>
	);
};

export default Chat;

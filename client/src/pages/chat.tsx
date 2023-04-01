import { useUser } from "@clerk/clerk-react";
import { Form, Field } from "houseform";
import { z } from "zod";
import { useRef, useState } from "react";
import { FaSmileBeam } from "react-icons/fa";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import dayjs from "dayjs";
dayjs.extend(isToday);
dayjs.extend(isYesterday);
import useOnClickOutside from "../hooks/useOnClickOutside";

const MessageSchema = z.object({
	user: z.object({
		id: z.string(),
		image: z.string(),
		fullName: z.string(),
	}),
	text: z.string().min(1),
	createdAt: z.date(),
});

type MessageType = z.infer<typeof MessageSchema>;

const formatTime = (date: Date) => {
	const djs = dayjs(date);

	if (djs.isToday()) return `Today at ${djs.format("h:mm A")}`;

	if (djs.isYesterday()) return `Yesterday at ${djs.format("h:mm A")}`;

	return djs.format("MMM D, YYYY");
};

const Message = ({ message }: { message: MessageType }) => {
	const currentUser = (Math.random() * 10) % 2 === 0;

	return (
		<>
			<p className="mb-2">
				<span className="text-slate-200 font-bold text-sm sm:text-base mr-2">
					{message.user.fullName}
				</span>
				<span className="text-xs sm:text-sm text-slate-400">
					{formatTime(message.createdAt)}
				</span>
			</p>
			<div
				className={`px-4 py-3 flex items-center rounded-2xl mb-4 h-14 ${
					currentUser ? "bg-blue-600" : "bg-zinc-800"
				}`}
			>
				<div className="w-8 h-8 mr-3">
					<img src={message.user.image} className="rounded-full" />
				</div>
				{message.text}
			</div>
		</>
	);
};

const Chat = () => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	useOnClickOutside(ref, () => setShowEmojiPicker(false));
	const { user } = useUser();
	const [messages, setMessages] = useState<MessageType[]>([]);
	if (!user) return null;

	return (
		<div className="max-w-screen-sm m-auto p-4 sm:p-8 flex-1 w-screen flex flex-col justify-end">
			<div className="flex-1 w-full flex flex-col justify-end items-start">
				{messages.map((message, index) => (
					<Message key={index} message={message} />
				))}
			</div>
			<Form
				onSubmit={(data) => {
					setMessages([
						...messages,
						{
							user: {
								id: user.id,
								image: user.profileImageUrl,
								fullName: user.fullName || user.username || "",
							},
							text: data.message,
							createdAt: new Date(),
						},
					]);
				}}
			>
				{({ submit }) => (
					<div
						className="bg-zinc-800 px-4 pr-2 h-14 w-full rounded-2xl shadow-xl flex relative items-center"
						ref={ref}
					>
						<Field
							name="message"
							initialValue={""}
							onChangeValidate={z.string().min(1)}
						>
							{({ value, setValue, onBlur }) => (
								<>
									<input
										value={value}
										onChange={(e) => setValue(e.target.value)}
										onBlur={onBlur}
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												submit()
													.then(() => setValue(""))
													.catch((e) => {
														console.error(e);
													});
											}
										}}
										placeholder="Type a message..."
										className="bg-zinc-800 outline-none flex-1"
									/>
									{showEmojiPicker && (
										<div className="absolute right-0 bottom-16">
											<Picker
												data={data}
												onEmojiSelect={(emoji: any) => {
													setValue(`${value}${emoji.native}`);
												}}
												theme="dark"
											/>
										</div>
									)}
									<button
										className="text-zinc-400 hover:bg-zinc-700 transition-colors w-10 h-10 rounded-full flex justify-center items-center"
										onClick={() => setShowEmojiPicker(!showEmojiPicker)}
									>
										<FaSmileBeam size={22} />
									</button>
								</>
							)}
						</Field>
					</div>
				)}
			</Form>
		</div>
	);
};

export default Chat;

import { UserButton, useUser } from "@clerk/clerk-react";
import { Form, Field } from "houseform";
import { z } from "zod";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { FaSmileBeam } from "react-icons/fa";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const useOnClickOutside = (ref: any, handler: any) => {
	useEffect(() => {
		const listener = (event: any) => {
			if (!ref.current || ref.current.contains(event.target)) {
				return;
			}
			handler(event);
		};
		document.addEventListener("mousedown", listener);
		document.addEventListener("touchstart", listener);
		return () => {
			document.removeEventListener("mousedown", listener);
			document.removeEventListener("touchstart", listener);
		};
	}, [ref, handler]);
};

const MessageSchema = z.object({
	user: z.object({
		id: z.string(),
		image: z.string(),
	}),
	message: z.string().min(1),
});

type Message = z.infer<typeof MessageSchema>;

const Chat = () => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	useOnClickOutside(ref, () => setShowEmojiPicker(false));
	const { user } = useUser();
	const [parent] = useAutoAnimate();
	const [messages, setMessages] = useState<Message[]>([]);
	if (!user) return null;

	return (
		<div
			className="max-w-screen-sm m-auto p-4 sm:p-8 flex-1 w-screen flex flex-col justify-end"
			ref={parent}
		>
			<div className="flex-1 w-full flex flex-col justify-end">
				{messages.map((message) => (
					<div className="bg-zinc-800 px-3 py-3 flex items-center rounded-2xl mb-4">
						<div className="w-8 h-8 mr-4">
							<img src={message.user.image} className="rounded-full" />
						</div>
						{message.message}
					</div>
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
							},
							message: data.message,
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
											<EmojiPicker
												onEmojiClick={({ emoji }) =>
													setValue(`${value}${emoji}`)
												}
												width={300}
												height={400}
												theme={Theme.DARK}
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

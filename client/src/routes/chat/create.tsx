import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { Field, Form } from "houseform";
import React from "react";
import {
	ChannelSchema,
	CreateChannelSchema,
	CreateChannelType,
} from "../../types/channel";
import Loading from "../../components/Loading";

const createChannel = async (input: CreateChannelType) => {
	const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/channels`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${await window.Clerk.session.getToken()}`,
		},
		body: JSON.stringify(input),
	});
	const data = await res.json();
	return ChannelSchema.parse(data);
};

const CreateChannel = () => {
	const router = useRouter();
	const navigate = useNavigate({ from: "/chat/create" });
	const queryClient = useQueryClient();

	const { mutate, isLoading, isSuccess } = useMutation({
		mutationFn: createChannel,
		onSuccess: (data) => {
			queryClient.invalidateQueries(["channels"]).then(() => {
				navigate({
					to: "/chat/$channelId",
					params: { channelId: data.id },
				});
			});
		},
	});

	return (
		<div className="m-auto flex max-w-screen-sm flex-1 items-center justify-center p-4">
			{isLoading || isSuccess ? (
				<Loading size={40} />
			) : (
				<Form<CreateChannelType>
					onSubmit={(data) => {
						mutate(data);
					}}
				>
					{({ submit }) => (
						<div className="flex w-full">
							<Field<string>
								name="name"
								initialValue={""}
								onChangeValidate={
									CreateChannelSchema.shape.name
								}
							>
								{({ value, setValue, onBlur }) => (
									<input
										value={value}
										onChange={(e) =>
											setValue(e.target.value)
										}
										onBlur={onBlur}
										className="input mr-2"
										placeholder="Channel Name..."
									/>
								)}
							</Field>
							<button onClick={submit} className="btn mr-2">
								Create
							</button>
							<button
								onClick={() => router.history.go(-1)}
								className="gbtn"
							>
								Cancel
							</button>
						</div>
					)}
				</Form>
			)}
		</div>
	);
};

export default CreateChannel;

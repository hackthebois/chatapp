import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Field, Form } from "houseform";
import Loading from "../../components/Loading";
import {
	ChannelSchema,
	CreateChannelSchema,
	CreateChannelType,
} from "../../types/channel";
import { joinChannel } from "../../utils/channel";

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
	const navigate = useNavigate({ from: "/chat/create" });
	const queryClient = useQueryClient();

	const createChannelMutation = useMutation({
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

	const joinChannelMutation = useMutation({
		mutationFn: joinChannel,
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
			{createChannelMutation.isLoading ||
			createChannelMutation.isSuccess ||
			joinChannelMutation.isLoading ||
			joinChannelMutation.isSuccess ? (
				<Loading size={40} />
			) : (
				<div className="w-full">
					<Form<CreateChannelType>
						onSubmit={(data) => {
							createChannelMutation.mutate(data);
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
											placeholder="Channel Name"
										/>
									)}
								</Field>
								<button onClick={submit} className="btn">
									Create
								</button>
							</div>
						)}
					</Form>
					<h3 className="my-8 w-full text-center text-slate-300">
						Or Join Channel
					</h3>
					<Form<{ id: string }>
						onSubmit={({ id }) => {
							joinChannelMutation.mutate(id);
						}}
					>
						{({ submit }) => (
							<div className="flex w-full">
								<Field<string>
									name="id"
									initialValue={""}
									onChangeValidate={ChannelSchema.shape.id}
								>
									{({ value, setValue, onBlur }) => (
										<input
											value={value}
											onChange={(e) =>
												setValue(e.target.value)
											}
											onBlur={onBlur}
											className="input mr-2"
											placeholder="Join ID"
										/>
									)}
								</Field>
								<button onClick={submit} className="btn">
									Join
								</button>
							</div>
						)}
					</Form>
				</div>
			)}
		</div>
	);
};

export default CreateChannel;

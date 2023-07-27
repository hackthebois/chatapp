import React from "react";
import "./index.css";
import {
	Router,
	Route,
	RootRoute,
	Navigate,
	Outlet,
} from "@tanstack/react-router";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

import SignIn from "./routes/sign-in";
import SignUp from "./routes/sign-up";
import Channel from "./routes/chat/channel";
import CreateChannel from "./routes/chat/create";
import Chat from "./routes/chat/chat";

import queryClient from "./utils/queryclient";
import { getChannel } from "./utils/channel";

// Create a root route
const rootRoute = new RootRoute({
	component: Outlet,
	errorComponent: (error) => <div>{error.error.message}</div>,
});

// Create an index route
const homeRoute = new Route({
	getParentRoute: () => rootRoute,
	path: "/",
	component: () => <Navigate to="/chat" />,
});

const signInRoute = new Route({
	getParentRoute: () => rootRoute,
	path: "/sign-in",
	component: SignIn,
});

const signUpRoute = new Route({
	getParentRoute: () => rootRoute,
	path: "/sign-up",
	component: SignUp,
});

export const chatRoute = new Route({
	getParentRoute: () => rootRoute,
	path: "/chat",
	// onLoad: async () => {
	// 	await queryClient.ensureQueryData(["channels"], getChannels);
	// },
	component: () => (
		<>
			<SignedIn>
				<Chat />
			</SignedIn>
			<SignedOut>
				<Navigate to="/sign-in" />
			</SignedOut>
		</>
	),
});

export const chatChannelRoute = new Route({
	getParentRoute: () => chatRoute,
	path: "$channelId",
	component: Channel,
	onLoad: async ({ params: { channelId } }) => {
		await queryClient.ensureQueryData(["channel", channelId], () =>
			getChannel(channelId)
		);
	},
});

export const chatCreateRoute = new Route({
	getParentRoute: () => chatRoute,
	path: "/create",
	component: CreateChannel,
});

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([
	homeRoute,
	chatRoute.addChildren([chatChannelRoute, chatCreateRoute]),
	signInRoute,
	signUpRoute,
]);

const router = new Router({
	routeTree,
	defaultPreload: "intent",
});

// Register your router for maximum type safety
declare module "@tanstack/router" {
	interface Register {
		router: typeof router;
	}
}

export default router;

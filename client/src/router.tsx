import App from "./App";
import "./index.css";
import { Router, Route, RootRoute, Navigate } from "@tanstack/react-router";
import Home from "./pages/home";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import Chat from "./pages/chat";

// Create a root route
const rootRoute = new RootRoute({
	component: App,
});

// Create an index route
const homeRoute = new Route({
	getParentRoute: () => rootRoute,
	path: "/",
	component: Home,
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

const chatRoute = new Route({
	getParentRoute: () => rootRoute,
	path: "/chat",
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

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([homeRoute, chatRoute, signInRoute, signUpRoute]);

// Create the router using your route tree
const router = new Router({ routeTree });

// Register your router for maximum type safety
declare module "@tanstack/router" {
	interface Register {
		router: typeof router;
	}
}

export default router;

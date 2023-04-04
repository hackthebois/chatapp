import {
	ClerkProvider,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/clerk-react";
import { Link, Outlet } from "@tanstack/react-router";
import { dark } from "@clerk/themes";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const clerkPubKey = import.meta.env.VITE_CLERK_PUB_KEY;

const queryClient = new QueryClient();

const App = () => {
	return (
		<ClerkProvider
			publishableKey={clerkPubKey}
			appearance={{ baseTheme: dark }}
		>
			<QueryClientProvider client={queryClient}>
				<main className="relative flex h-full w-screen flex-col">
					<Outlet />
				</main>
			</QueryClientProvider>
		</ClerkProvider>
	);
};

export default App;

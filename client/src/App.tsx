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
				<main className="flex h-full w-screen flex-col">
					<header className="z-10 flex h-12 flex-row items-center justify-end bg-zinc-800 px-4 shadow-2xl sm:px-8">
						<nav className="flex items-center justify-end">
							<Link to="/" className="mr-6 font-bold">
								Home
							</Link>
							<SignedIn>
								<Link to="/chat" className="mr-6 font-bold">
									Chat
								</Link>
							</SignedIn>
							<SignedOut>
								<Link
									to="/sign-in"
									className="rounded bg-zinc-200 px-3 py-2 font-bold text-zinc-800"
								>
									Get Started
								</Link>
							</SignedOut>
							<UserButton afterSignOutUrl="/" />
						</nav>
					</header>
					<Outlet />
				</main>
			</QueryClientProvider>
		</ClerkProvider>
	);
};

export default App;

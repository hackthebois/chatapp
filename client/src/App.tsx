import {
	ClerkProvider,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/clerk-react";
import { Link, Outlet } from "@tanstack/react-router";
import { dark } from "@clerk/themes";
import React from "react";

const clerkPubKey = import.meta.env.VITE_CLERK_PUB_KEY;

const App = () => {
	return (
		<ClerkProvider
			publishableKey={clerkPubKey}
			appearance={{ baseTheme: dark }}
		>
			<main className="flex h-full w-screen flex-col">
				<header className="z-10 bg-zinc-800 px-4 py-3 shadow-2xl sm:px-8">
					<nav className="m-auto flex max-w-screen-sm items-center justify-end">
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
		</ClerkProvider>
	);
};

export default App;

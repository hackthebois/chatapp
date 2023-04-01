import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link, Outlet } from "@tanstack/react-router";
import { dark } from "@clerk/themes";

const clerkPubKey = import.meta.env.VITE_CLERK_PUB_KEY;

const App = () => {
	return (
		<ClerkProvider publishableKey={clerkPubKey} appearance={{ baseTheme: dark }}>
			<main className="w-screen h-full flex flex-col">
				<header className="bg-zinc-800 px-4 sm:px-8 py-3">
					<nav className="max-w-screen-sm m-auto flex justify-end items-center">
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
								className="font-bold px-3 py-2 bg-zinc-200 text-zinc-800 rounded"
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

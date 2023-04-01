import { ClerkProvider, UserButton } from "@clerk/clerk-react";
import { Outlet } from "@tanstack/react-router";
import { dark } from "@clerk/themes";

const clerkPubKey = import.meta.env.VITE_CLERK_PUB_KEY;

const App = () => {
	return (
		<ClerkProvider publishableKey={clerkPubKey} appearance={{ baseTheme: dark }}>
			<main className="w-screen h-screen flex flex-col">
				<header className="bg-zinc-800 px-8 py-3">
					<nav className="max-w-screen-sm m-auto flex justify-end">
						<UserButton />
					</nav>
				</header>
				<Outlet />
			</main>
		</ClerkProvider>
	);
};

export default App;

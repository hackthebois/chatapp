import React from "react";
import { Link } from "@tanstack/react-router";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const Home = () => {
	return (
		<>
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
			<div className="flex flex-1 items-center justify-center p-4 sm:p-8">
				<div className="flex flex-col items-center justify-center">
					<h2 className="mb-12 text-center text-6xl font-bold">
						The Community Chat
					</h2>
					<p className="mb-10 text-center text-xl">
						Chirp is a new and open source chat application. No big
						tech. Just community.
					</p>
					<div>
						<a
							href="https://github.com/hackthebois/chirp"
							className="gbtn mr-4"
							target="_blank"
							rel="noreferrer"
						>
							View On GitHub
						</a>
						<Link to="/chat" className="btn">
							Go To Chat
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;

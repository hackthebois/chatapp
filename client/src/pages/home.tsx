import React from "react";
import { Link } from "@tanstack/react-router";

const Home = () => {
	return (
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
	);
};

export default Home;

import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";

const Home = () => {
	return (
		<div className="flex-1 p-4 sm:p-8 flex justify-center items-center">
			<div className="flex justify-center items-center flex-col">
				<h2 className="text-6xl font-bold text-center mb-12">The Community Chat</h2>
				<p className="text-xl text-center mb-10">
					Chirp is a new and open source chat application. No big tech. Just community.
				</p>
				<div>
					<a
						href="https://github.com/hackthebois/chirp"
						className="gbtn mr-4"
						target="_blank"
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

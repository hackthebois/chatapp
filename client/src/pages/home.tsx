import { UserButton } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";

const Home = () => {
	return (
		<div className="App-header">
			<UserButton />
			<Link to="/chat">Chat</Link>
		</div>
	);
};

export default Home;

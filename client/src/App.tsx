import "./App.css";
import {
	ClerkProvider,
	RedirectToSignIn,
	SignedIn,
	SignedOut,
	UserButton,
	useUser,
} from "@clerk/clerk-react";

const clerkPubKey = import.meta.env.VITE_CLERK_PUB_KEY;

const App = () => {
	return (
		<ClerkProvider publishableKey={clerkPubKey}>
			<SignedIn>
				<Hello />
			</SignedIn>
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
			<div>This is a test</div>
		</ClerkProvider>
	);
};

function Hello() {
	// Get the user's first name
	const { user } = useUser();

	return (
		<div className="App-header">
			{/* Mount the UserButton component */}
			<UserButton />
			{user ? <h1>Hello, {user.firstName}!</h1> : null}
		</div>
	);
}

export default App;

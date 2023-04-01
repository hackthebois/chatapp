import { SignIn as SignUpUI } from "@clerk/clerk-react";

const SignIn = () => {
	return (
		<main className="w-screen h-screen flex justify-center items-center">
			<SignUpUI routing="path" path="/sign-in" signUpUrl="/sign-up" redirectUrl="/chat" />
		</main>
	);
};

export default SignIn;

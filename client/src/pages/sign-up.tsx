import { SignUp as SignUpUI } from "@clerk/clerk-react";

const SignUp = () => {
	return (
		<main className="w-screen h-screen flex justify-center items-center">
			<SignUpUI routing="path" path="/sign-up" signInUrl="/sign-in" redirectUrl="/chat" />
		</main>
	);
};

export default SignUp;

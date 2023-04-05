import { SignIn as SignUpUI } from "@clerk/clerk-react";
import React from "react";

const SignIn = () => {
	return (
		<main className="flex h-screen w-screen items-center justify-center">
			<SignUpUI
				routing="path"
				path="/sign-in"
				signUpUrl="/sign-up"
				redirectUrl="/chat"
			/>
		</main>
	);
};

export default SignIn;

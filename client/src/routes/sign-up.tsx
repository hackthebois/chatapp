import { SignUp as SignUpUI } from "@clerk/clerk-react";
import React from "react";

const SignUp = () => {
	return (
		<main className="flex h-screen w-screen items-center justify-center">
			<SignUpUI
				routing="path"
				path="/sign-up"
				signInUrl="/sign-in"
				redirectUrl="/chat"
			/>
		</main>
	);
};

export default SignUp;

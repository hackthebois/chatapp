import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

const clerkPubKey = import.meta.env.VITE_CLERK_PUB_KEY;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ClerkProvider
			publishableKey={clerkPubKey}
			appearance={{ baseTheme: dark }}
		>
			<App />
		</ClerkProvider>
	</React.StrictMode>
);

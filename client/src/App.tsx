import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import router from "./router";
import { useAuth } from "@clerk/clerk-react";
import queryClient from "./utils/queryclient";

const App = () => {
	const { isLoaded } = useAuth();

	return (
		<QueryClientProvider client={queryClient}>
			{isLoaded && <RouterProvider router={router} />}
		</QueryClientProvider>
	);
};

export default App;

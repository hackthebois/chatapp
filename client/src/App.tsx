import { useAuth } from "@clerk/clerk-react";
import "@fontsource/open-sans";
import "@fontsource/open-sans/700.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import router from "./router";
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

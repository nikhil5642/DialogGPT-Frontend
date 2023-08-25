import { createContext } from "react";

const LoaderContext = createContext({
	isLoading: false,
	message: "",
	showLoader: () => {},
	hideLoader: () => {},
});

export default LoaderContext;

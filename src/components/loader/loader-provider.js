import React, { useState } from "react";
import LoaderContext from "./loader-context";

const LoaderProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState("");

	const showLoader = (msg = "") => {
		setMessage(msg);
		setIsLoading(true);
	};

	const hideLoader = () => {
		setMessage("");
		setIsLoading(false);
	};

	return (
		<LoaderContext.Provider
			value={{ isLoading, message, showLoader, hideLoader }}
		>
			{children}
		</LoaderContext.Provider>
	);
};

export default LoaderProvider;

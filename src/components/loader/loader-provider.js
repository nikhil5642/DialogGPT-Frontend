import React, { useState, useRef } from "react";
import LoaderContext from "./loader-context";

const LoaderProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState("");

	const loaderTimeout = useRef(null); // Using useRef to hold the timeout reference

	const showLoader = (msg = "") => {
		clearTimeout(loaderTimeout.current); // Clear any existing timeout
		setMessage(msg);
		setIsLoading(true);
	};

	const hideLoader = () => {
		// Instead of hiding immediately, set a timeout
		loaderTimeout.current = setTimeout(() => {
			setMessage("");
			setIsLoading(false);
		}, 500); // Ensures loader displays for at least 500ms
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

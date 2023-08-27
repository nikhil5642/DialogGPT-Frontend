// FirebaseProvider.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getRemoteConfig, fetchAndActivate } from "firebase/remote-config";
import { FirebaseFeatures } from "./feature-flags";

const firebaseConfig = {
	apiKey: "AIzaSyCJ8u8nMGdqmaPeq9NBG5_wFJiKaTAozhA",
	authDomain: "chatbot-37637.firebaseapp.com",
	projectId: "chatbot-37637",
	storageBucket: "chatbot-37637.appspot.com",
	messagingSenderId: "570891403073",
	appId: "1:570891403073:web:aacbae1b1436bcd98d2bc0",
	measurementId: "G-YH1V9X5434",
};

const FirebaseContext = createContext();

export const useFirebase = () => {
	return useContext(FirebaseContext);
};

export const FirebaseProvider = ({ children }) => {
	const [isConfigLoaded, setIsConfigLoaded] = useState(false);
	const [remoteConfig, setRemoteConfig] = useState(null);
	useEffect(() => {
		const app = initializeApp(firebaseConfig);
		const remoteConfig = getRemoteConfig(app);
		remoteConfig.defaultConfig = {
			[FirebaseFeatures.SHOW_FILES_EDIT_VIEW]: false,
			[FirebaseFeatures.SHOW_TEXT_EDIT_VIEW]: false,
			[FirebaseFeatures.SHOW_WEBSITE_EDIT_VIEW]: false,
			[FirebaseFeatures.SHOW_QNA_EDIT_VIEW]: false,
		};
		fetchAndActivate(remoteConfig)
			.then(() => {
				setIsConfigLoaded(true);
				setRemoteConfig(remoteConfig);
			})
			.catch((error) => {
				console.error("Failed to fetch remote config:", error);
			});
	}, []);

	return (
		<FirebaseContext.Provider value={{ isConfigLoaded, remoteConfig }}>
			{children}
		</FirebaseContext.Provider>
	);
};

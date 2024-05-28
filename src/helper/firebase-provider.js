// FirebaseProvider.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getRemoteConfig, fetchAndActivate } from "firebase/remote-config";
import { getAnalytics } from "firebase/analytics";
import { FirebaseFeatures } from "./feature-flags";

export const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const FirebaseContext = createContext();

export const useFirebase = () => {
	return useContext(FirebaseContext);
};

export const FirebaseProvider = ({ children }) => {
	const [isConfigLoaded, setIsConfigLoaded] = useState(false);
	const [remoteConfig, setRemoteConfig] = useState(null);
	const [analytics, setAnalytics] = useState(null); // Added this state

	useEffect(() => {
		const app = initializeApp(firebaseConfig);
		const remoteConfig = getRemoteConfig(app);
		// Initializing Firebase Analytics
		setAnalytics(getAnalytics(app));

		remoteConfig.defaultConfig = {
			[FirebaseFeatures.SHOW_GOOGLE_LOGIN]: true,
			[FirebaseFeatures.SHOW_APPLE_LOGIN]: false,
			[FirebaseFeatures.SHOWEm]: false,
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
			.catch(() => {});
	}, []);

	return (
		<FirebaseContext.Provider
			value={{ isConfigLoaded, remoteConfig, analytics }}
		>
			{children}
		</FirebaseContext.Provider>
	);
};

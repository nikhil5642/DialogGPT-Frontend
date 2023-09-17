import React, { useState, useEffect, useContext } from "react";
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signInWithRedirect,
	OAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
} from "firebase/auth";
import styles from "./styles/signin.module.scss"; // Import the SCSS module
import Image from "next/image";
import { useRouter } from "next/router";
import AuthService from "../src/helper/AuthService";
import LoaderContext from "../src/components/loader/loader-context";
import {
	getCookie,
	removeCookie,
	storeCookie,
} from "../src/helper/cookie-helper";
import { getValue } from "firebase/remote-config";
import { FirebaseFeatures } from "../src/helper/feature-flags";
import { useFirebase } from "../src/helper/firebase-provider";
import { firebaseConfig } from "../src/helper/firebase-provider";
import { initializeApp, getApps } from "firebase/app";
import { showErrorToast } from "src/helper/toast-helper";
import { useTrackEvent } from "/src/helper//event-tracker";

let app;

try {
	app = initializeApp(firebaseConfig);
} catch (e) {
	// If the app is already initialized, reuse the existing instance
	app = getApps()[0];
}

const SignInPage = () => {
	const { trackEvent, trackScreenView } = useTrackEvent(); // Extract analytics instance from context

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();
	const auth = getAuth();
	const provider = new GoogleAuthProvider();
	const { showLoader, hideLoader } = useContext(LoaderContext);
	const { isConfigLoaded, remoteConfig } = useFirebase();
	const [featureVisibility, setFeatureVisibility] = useState({
		google: true,
		apple: false,
		email: false,
	});

	useEffect(() => {
		if (isConfigLoaded && remoteConfig) {
			setFeatureVisibility({
				google: getValue(
					remoteConfig,
					FirebaseFeatures.SHOW_GOOGLE_LOGIN,
				).asBoolean(),
				apple: getValue(
					remoteConfig,
					FirebaseFeatures.SHOW_APPLE_LOGIN,
				).asBoolean(),
				email: getValue(
					remoteConfig,
					FirebaseFeatures.SHOW_EMAIL_LOGIN,
				).asBoolean(),
			});
		}
	}, [isConfigLoaded, remoteConfig]);

	useEffect(() => {
		if (getCookie("authInProgress") === "true") {
			showLoader("Logging you in...");
		}
		trackScreenView("login-screen");
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				showLoader("Logging you in...");
				await user
					.getIdToken()
					.then((token) => {
						trackEvent("login-success");
						hideLoader();
						AuthService.login(token).then(() => router.push("/my-chatbots"));
					})
					.catch(() => {
						trackEvent("login-failure");
						hideLoader();
					});
			} else {
				hideLoader();
			}
		});

		return () => unsubscribe();
	}, []);

	const handleSignInWithGoogle = async () => {
		showLoader("Logging you in...");
		storeCookie("authInProgress", "true");
		trackEvent("login-google-initated");
		try {
			await signInWithRedirect(auth, provider);
			trackEvent("login-google-success");
		} catch (e) {
			trackEvent("login-google-failure");
			showErrorToast("Error logging you in!");
			hideLoader();
			removeCookie("authInProgress");
		}
	};

	const handleSignInWithApple = async () => {
		const provider = new OAuthProvider("apple.com");
		showLoader("Logging you in...");
		trackEvent("login-apple-initated");
		signInWithPopup(auth, provider)
			.then((userCredential) => {
				const user = userCredential.user;
				trackEvent("login-apple-success");
			})
			.catch(() => {
				showErrorToast("Error logging you in!");
				trackEvent("login-apple-failure");
			});
	};

	const handleSignInWithEmailAndPassword = async () => {
		showLoader("Logging you in...");
		trackEvent("login-email-initated");
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				trackEvent("login-email-success");
			})
			.catch(() => {
				showErrorToast("Error logging you in!");
				trackEvent("login-email-failure");
			});
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h2>Sign In</h2>
				{featureVisibility.google && (
					<button
						className={styles.googleButton}
						onClick={handleSignInWithGoogle}
					>
						<Image
							className={styles.googleIcon}
							src="/assets/google_icon.png"
							alt={"Google"}
							title={"Google"}
							loading="lazy"
							height={24}
							width={24}
						></Image>
						<p className={styles.googleText}>Sign in with Google</p>
					</button>
				)}
				{featureVisibility.apple && (
					<button
						className={styles.appleButton}
						onClick={handleSignInWithApple}
					>
						<Image
							className={styles.appleIcon}
							src="/assets/apple_logo.png"
							alt={"Google"}
							title={"Google"}
							loading="lazy"
							height={24}
							width={24}
						></Image>
						<p className={styles.googleText}>Sign in with Apple</p>
					</button>
				)}

				<hr className="horizontalLine" />

				{featureVisibility.email && (
					<div>
						<input
							className={styles.input}
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							className={styles.input}
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						<button
							className={styles.button}
							onClick={handleSignInWithEmailAndPassword}
						>
							Sign in
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default SignInPage;

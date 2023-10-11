import React, { useState, useEffect, useContext } from "react";
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signInWithRedirect,
	OAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	TwitterAuthProvider,
	GithubAuthProvider,
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
import { showSuccessToast, showErrorToast } from "src/helper/toast-helper";
import { useTrackEvent } from "/src/helper//event-tracker";
import Head from "next/head";
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
	const [isSignUp, setIsSignUp] = useState(false);
	const router = useRouter();
	const auth = getAuth();
	const { showLoader, hideLoader } = useContext(LoaderContext);
	const { isConfigLoaded, remoteConfig } = useFirebase();
	const [featureVisibility, setFeatureVisibility] = useState({
		google: true,
		apple: false,
		email: false,
		twitter: false,
		github: false,
	});

	useEffect(() => {
		if (isConfigLoaded && remoteConfig) {
			setFeatureVisibility({
				...featureVisibility,
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
				twitter: getValue(
					remoteConfig,
					FirebaseFeatures.SHOW_TWITTER_LOGIN,
				).asBoolean(),
				github: getValue(
					remoteConfig,
					FirebaseFeatures.SHOW_GITHUB_LOGIN,
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
						AuthService.login(token).then(() => router.push("/pricing"));
						hideLoader();
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
		const provider = new GoogleAuthProvider();

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
				hideLoader();
				removeCookie("authInProgress");
			});
	};
	const handleSignInWithTwitter = async () => {
		const provider = new TwitterAuthProvider();
		showLoader("Logging you in...");
		trackEvent("login-twitter-initated");
		signInWithPopup(auth, provider)
			.then((userCredential) => {
				const user = userCredential.user;
				trackEvent("login-twitter-success");
			})
			.catch((e) => {
				showErrorToast("Error logging you in!");
				trackEvent("login-twitter-failure");
				hideLoader();
				removeCookie("authInProgress");
			});
	};
	const handleSignInWithGithub = async () => {
		const provider = new GithubAuthProvider();
		showLoader("Logging you in...");
		trackEvent("login-github-initated");
		signInWithPopup(auth, provider)
			.then((userCredential) => {
				const user = userCredential.user;
				trackEvent("login-github-success");
			})
			.catch((e) => {
				showErrorToast("Error logging you in!");
				trackEvent("login-github-failure");
				hideLoader();
				removeCookie("authInProgress");
			});
	};

	const handleSignInWithEmailAndPassword = async () => {
		showLoader("Logging you in...");
		trackEvent("login-email-initated");
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				trackEvent("login-email-success");
				hideLoader();
			})
			.catch(() => {
				showErrorToast("Error logging you in!");
				trackEvent("login-email-failure");
				hideLoader();
			});
	};
	const handleSignUpWithEmailAndPassword = async () => {
		showLoader("Signing you up...");
		trackEvent("signup-email-initated");
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				trackEvent("signup-email-success");
				hideLoader();
			})
			.catch(() => {
				showErrorToast("Error signing you up!");
				trackEvent("signup-email-failure");
				hideLoader();
			});
	};
	const handleForgotPassword = () => {
		if (!email) {
			showErrorToast("Please enter your email!");
			return;
		}

		showLoader("Sending reset link...");

		sendPasswordResetEmail(auth, email)
			.then(() => {
				showSuccessToast("Password reset link sent to your email!");
				hideLoader();
			})
			.catch((e) => {
				showErrorToast("Error sending reset link!");
				hideLoader();
			});
	};

	return (
		<>
			<Head>
				<title>DialogGPT Login</title>
				<link rel="canonical" href="https://dialoggpt.io/signin" />
				<meta name="description" content="Sign in to DialogGPT.io" />
				<script type="application/ld+json">
					{JSON.stringify({
						"@context": "http://schema.org",
						"@type": "WebSite",
						name: "DialogGPT.io",
						url: "https://dialoggpt.io/signin",
						description: "Sign in to DialogGPT.io",
					})}
				</script>
			</Head>
			<div className={styles.container}>
				<div className={styles.card}>
					<h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
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
							<p className={styles.googleText}>Continue with Google</p>
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
								alt={"Apple"}
								title={"Apple"}
								loading="lazy"
								height={24}
								width={24}
							></Image>
							<p className={styles.googleText}>Continue with Apple</p>
						</button>
					)}
					{featureVisibility.twitter && (
						<button
							className={styles.googleButton}
							onClick={handleSignInWithTwitter}
						>
							<Image
								className={styles.googleIcon}
								src="/assets/twitter_icon.png"
								alt={"Twitter"}
								title={"Twitter"}
								loading="lazy"
								height={24}
								width={24}
							></Image>
							<p className={styles.googleText}>Continue with Twitter</p>
						</button>
					)}
					{featureVisibility.github && (
						<button
							className={styles.googleButton}
							onClick={handleSignInWithGithub}
						>
							<Image
								className={styles.googleIcon}
								src="/assets/github_icon.png"
								alt={"Github"}
								title={"Github"}
								loading="lazy"
								height={24}
								width={24}
							></Image>
							<p className={styles.googleText}>Continue with Github</p>
						</button>
					)}

					<hr className={styles.horizontalLine} />

					{featureVisibility.email && (
						<div className={styles.emailPasswordContainer}>
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
								onClick={
									isSignUp
										? handleSignUpWithEmailAndPassword
										: handleSignInWithEmailAndPassword
								}
							>
								{isSignUp ? "Sign Up" : "Sign In"}
							</button>
							<div className={styles.switchLink}>
								{isSignUp ? (
									<span>
										Already have an account?{" "}
										<a href="#" onClick={() => setIsSignUp(false)}>
											Sign In
										</a>
									</span>
								) : (
									<span>
										<br />
										Don't have an account?{" "}
										<a href="#" onClick={() => setIsSignUp(true)}>
											Sign Up
										</a>
										<br />
										<br />
										<a href="#" onClick={handleForgotPassword}>
											Forgot Password?
										</a>
									</span>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default SignInPage;

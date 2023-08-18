import React, { useState, useEffect } from "react";
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

const SignInPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();
	const auth = getAuth();
	const provider = new GoogleAuthProvider();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				await user
					.getIdToken()
					.then((token) =>
						AuthService.login(token).then(() => router.push("/home")),
					);
			} else {
				console.log("User is signed out");
			}
		});

		return () => unsubscribe();
	}, []);

	const handleSignInWithGoogle = async () => {
		try {
			await signInWithRedirect(auth, provider);
		} catch (error) {
			console.error("Google sign-in error:", error);
		}
	};

	const handleSignInWithApple = async () => {
		const provider = new OAuthProvider("apple.com");
		signInWithPopup(auth, provider)
			.then((userCredential) => {
				const user = userCredential.user;
			})
			.catch((error) => {
				console.error("Apple sign-in error:", error);
			});
	};

	const handleSignInWithEmailAndPassword = async () => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
			})
			.catch((error) => {
				console.error("Email/password sign-in error:", error);
			});
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h2>Sign In</h2>
				<button
					className={styles.googleButton}
					onClick={handleSignInWithGoogle}
				>
					<Image
						className={styles.googleIcon}
						src="/assets/google_icon.png"
						alt={"Google"}
						title={"Google"}
						loading="eager"
						height={24}
						width={24}
					></Image>
					<p className={styles.googleText}>Sign in with Google</p>
				</button>
				<button className={styles.appleButton} onClick={handleSignInWithApple}>
					<Image
						className={styles.appleIcon}
						src="/assets/apple_logo.png"
						alt={"Google"}
						title={"Google"}
						loading="eager"
						height={24}
						width={24}
					></Image>
					<p className={styles.googleText}>Sign in with Apple</p>
				</button>

				<hr className="horizontalLine" />

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
		</div>
	);
};

export default SignInPage;

import React, { useState } from "react";
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	OAuthProvider,
	signInWithEmailAndPassword,
} from "firebase/auth";
import styles from "./styles/signin.module.scss"; // Import the SCSS module
import Image from "next/image";

const auth = getAuth();

const SignInPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignInWithGoogle = async () => {
		const provider = new GoogleAuthProvider();
		try {
			await signInWithPopup(auth, provider);
			// Google sign-in successful, handle user state or redirects here
		} catch (error) {
			console.error("Google sign-in error:", error);
		}
	};

	const handleSignInWithApple = async () => {
		const provider = new OAuthProvider("apple.com");
		try {
			await signInWithPopup(auth, provider);
			// Apple sign-in successful, handle user state or redirects here
		} catch (error) {
			console.error("Apple sign-in error:", error);
		}
	};

	const handleSignInWithEmailAndPassword = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			// Email/password sign-in successful, handle user state or redirects here
		} catch (error) {
			console.error("Email/password sign-in error:", error);
		}
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

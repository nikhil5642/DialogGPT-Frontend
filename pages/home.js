import styles from "./styles/home.module.scss";
import { useEffect } from "react";
// import ReactGA from "react-ga4";
import Head from "next/head";
import { useRouter } from "next/router";
import AuthService from "../src/helper/AuthService";

export default function HomeScreen() {
	const router = useRouter();
	function onCreateChatbot() {
		if (AuthService.isAuthenticated()) {
			router.push("/my-chatbots");
		} else {
			router.push("/signin");
		}
	}

	return (
		<>
			<Head>
				<title>Home</title>
				<meta
					name="description"
					content="Build a chatbot for your website, try now! "
				/>
				<link rel="canonical" href="https://chessmeito.com/home" />
			</Head>
			<div className={styles.homeScreenContainer}>
				<div className={styles.topOverviewContainer}>
					<h1>
						Chat<span>GPT</span>
					</h1>
					<h1>
						for your <span>own data</span>
					</h1>
					<h3>
						Turn Your Data into an Interactive Chatbot! Easily Add to Your
						Website or Chat via Integrations/API.
					</h3>
					<button onClick={onCreateChatbot}>Create your Chatbot Now ➤</button>
				</div>
			</div>
		</>
	);
}

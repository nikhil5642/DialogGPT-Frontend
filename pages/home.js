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
				<link rel="canonical" href="https://dialoggpt.io/home" />
			</Head>
			<div className={styles.homeScreenContainer}>
				<div className={styles.topOverviewContainer}>
					<h1>
						Chat<span>GPT</span>
						<br />
						for your <span>own Website</span>
					</h1>
					<h3>
						Transform your data into a dynamic <span>Chatbot</span>. Seamlessly
						integrate it with your <span>Website</span>. <br />
						<br />
						Connect effortlessly via <span>APIs</span> and other{" "}
						<span>integrations</span>.
					</h3>
					<button onClick={onCreateChatbot}>
						<img
							src="/assets/dialog_gpt_logo_icon_only.png"
							alt="Description of Image"
						/>
						Create your Chatbot Now ➤
					</button>
				</div>
			</div>
		</>
	);
}

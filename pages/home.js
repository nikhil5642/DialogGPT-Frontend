import styles from "./styles/home.module.scss";
import { useEffect } from "react";
// import ReactGA from "react-ga4";
import Head from "next/head";
import { useRouter } from "next/router";
import AuthService from "../src/helper/AuthService";

export default function HomeScreen() {
	const router = useRouter();
	useEffect(() => {
		if (AuthService.isAuthenticated()) {
			router.push("/my-chatbots");
		} else {
			router.push("/signin");
		}
	}, []);
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
			<div className={styles.homeScreenContainer}></div>
		</>
	);
}

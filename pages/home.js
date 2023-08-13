import styles from "./styles/home.module.scss";
import { useEffect } from "react";
// import ReactGA from "react-ga4";
import Head from "next/head";

export default function HomeScreen() {
	useEffect(() => {
		// ReactGA.send({ hitType: "pageview", page: window.location.pathname });
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

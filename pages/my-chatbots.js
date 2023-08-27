import MyChatBots from "../src/components/my-chatbots/my-chatbots";
import styles from "./styles/defaults.module.scss";
import Head from "next/head";

export default function HomeScreen() {
	return (
		<>
			<Head>
				<title>Home</title>
				<meta name="My Chatbots" content="List of already trained chatbots" />
				<link rel="canonical" href="https://dialoggpt.io/my-chatbots" />
			</Head>
			<div className={styles.container}>
				<MyChatBots />
			</div>
		</>
	);
}

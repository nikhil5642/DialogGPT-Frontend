import MyChatBots from "../src/components/my-chatbots/my-chatbots";
import styles from "./styles/defaults.module.scss";
import Head from "next/head";

export default function HomeScreen() {
	return (
		<>
			<Head>
				<title>Chatbots List</title>
				<link rel="canonical" href="https://dialoggpt.io/my-chatbots" />
				<meta name="description" content="List of already trained chatbots" />
				<script type="application/ld+json">
					{JSON.stringify({
						"@context": "http://schema.org",
						"@type": "WebSite",
						name: "DialogGPT.io",
						url: "https://dialoggpt.io/my-chatbots",
						description: "List of already trained chatbots",
					})}
				</script>
			</Head>
			<div className={styles.container}>
				<MyChatBots />
			</div>
		</>
	);
}

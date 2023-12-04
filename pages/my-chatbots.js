import MyChatBots from "../src/components/my-chatbots/my-chatbots";
import styles from "./styles/defaults.module.scss";
import Head from "next/head";

function MyChatBotsPage() {
	return (
		<>
			<Head>
				<title>Chatbots List</title>
				<link rel="canonical" href="http://localhost:3000/my-chatbots" />
				<meta name="description" content="List of already trained chatbots" />
				<script type="application/ld+json">
					{JSON.stringify({
						"@context": "http://schema.org",
						"@type": "WebSite",
						name: "DialogGPT.io",
						url: "http://localhost:3000/my-chatbots",
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
MyChatBotsPage.showHeaderFooter = true;
export default MyChatBotsPage;

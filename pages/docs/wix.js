import styles from "../styles/docs-defaults.module.scss";
import { WixEmbedComponent } from "../../src/components/chatbot-embed/wix-embed/wix-embed";
import Head from "next/head";
function WixPage() {
	return (
		<>
			<Head>
				<title>Embed Chatbot in Wix Website</title> {/* Updated title */}
				<link rel="canonical" href="https://dialoggpt.io/docs/wix" />{" "}
				{/* Updated URL */}
				<meta
					name="description"
					content="Learn how to embed a chatbot in your Wix website."
				/>{" "}
				{/* Updated description */}
				<script type="application/ld+json">
					{JSON.stringify({
						"@context": "http://schema.org",
						"@type": "WebSite",
						name: "DialogGPT.io",
						url: "https://dialoggpt.io/docs/wix", // Updated URL
						description: "Learn how to embed a chatbot in your Wix website.", // Updated description
					})}
				</script>
			</Head>
			<div className={styles.container}>
				<WixEmbedComponent />
			</div>
		</>
	);
}
WixPage.showHeaderFooter = true;
export default WixPage;

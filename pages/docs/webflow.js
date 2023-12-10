import styles from "../styles/docs-defaults.module.scss";
import Head from "next/head";
import { WebflowEmbedComponent } from "../../src/components/chatbot-embed/webflow-embed/webflow-embed";
function WixPage() {
	return (
		<>
			<Head>
				<title>Embed Chatbot in Wix Website</title> {/* Updated title */}
				<link rel="canonical" href="https://dialoggpt.io//docs/webflow" />{" "}
				{/* Updated URL */}
				<meta
					name="description"
					content="Learn how to embed a chatbot in your Webflow website."
				/>{" "}
				{/* Updated description */}
				<script type="application/ld+json">
					{JSON.stringify({
						"@context": "http://schema.org",
						"@type": "WebSite",
						name: "DialogGPT.io",
						url: "https://dialoggpt.io//docs/webflow", // Updated URL
						description:
							"Learn how to embed a chatbot in your Webflow website.", // Updated description
					})}
				</script>
			</Head>
			<div className={styles.container}>
				<WebflowEmbedComponent />
			</div>
		</>
	);
}
WixPage.showHeaderFooter = true;
export default WixPage;

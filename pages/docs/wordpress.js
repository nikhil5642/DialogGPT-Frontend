import styles from "../styles/docs-defaults.module.scss";
import Head from "next/head";
import { WordPressEmbedComponent } from "../../src/components/chatbot-embed/wordpress-embed/wordpress-embed";
function WordPressPage() {
	return (
		<>
			<Head>
				<title>Embed Chatbot in WordPress Website</title> {/* Updated title */}
				<link
					rel="canonical"
					href="http://localhost:3000/docs/wordpress"
				/>{" "}
				{/* Updated URL */}
				<meta
					name="description"
					content="Learn how to embed a chatbot in your WordPress website."
				/>{" "}
				{/* Updated description */}
				<script type="application/ld+json">
					{JSON.stringify({
						"@context": "http://schema.org",
						"@type": "WebSite",
						name: "DialogGPT.io",
						url: "http://localhost:3000/docs/wordpress", // Updated URL
						description:
							"Learn how to embed a chatbot in your Webflow website.", // Updated description
					})}
				</script>
			</Head>
			<div className={styles.container}>
				<WordPressEmbedComponent />
			</div>
		</>
	);
}
WordPressPage.showHeaderFooter = true;
export default WordPressPage;

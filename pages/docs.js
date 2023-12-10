// pages/support.js

import Head from "next/head";

function SupportPage() {
	return (
		<div>
			<Head>
				<title>Support - DialogGPT</title>
				<link rel="canonical" href="http://localhost:3000/docs" />
				<meta
					name="description"
					content="Get assistance with DialogGPT. For queries, issues, or feedback, reach out to us at support@dialoggpt.io."
				/>
				<script type="application/ld+json">
					{JSON.stringify({
						"@context": "http://schema.org",
						"@type": "WebSite",
						name: "DialogGPT.io",
						url: "http://localhost:3000/docs",
						description:
							"Get assistance with DialogGPT. For queries, issues, or feedback, reach out to us at support@dialoggpt.io.",
					})}
				</script>
			</Head>

			<main>
				<h1>Follow the Docs below for Integration</h1>
				<br></br>
				<br></br>
				<ol>
					<li>
						<a href="/docs/wix">Integrate Chatbot on WIX WebSite</a>
					</li>
				</ol>
			</main>

			<style jsx>{`
				main {
					padding: 1rem;
					max-width: 800px;
					margin: 0 auto;
					display: flex;
					flex-direction: column;
				}

				h1 {
					font-size: 2rem;
					color: #000;
					margin-bottom: 0;
					text-align: left;
				}

				p {
					font-size: 1em;
					color: #555;
					line-height: 1.5;
					margin-bottom: 15px;
					margin-top: 24px;
					line-height: 1.8em;
				}
				a {
					color: #333;
					font-weight: 600;
					text-align: left;
					margin: 0;
				}
				ol li {
					margin-top: 1rem;
				}

				@media (max-width: 1280px) {
					h1,
					h2,
					h4,
					p {
						text-align: center;
					}
				}
			`}</style>
		</div>
	);
}
SupportPage.showHeaderFooter = true;
export default SupportPage;

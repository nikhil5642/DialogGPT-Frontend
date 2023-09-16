// pages/support.js

import Head from "next/head";

export default function SupportPage() {
	return (
		<div>
			<Head>
				<title>Support - DialogGPT</title>
				<meta
					name="description"
					content="Need help? Reach out to us at support@dialoggpt.io"
				/>
			</Head>

			<main>
				<h1>Contact us</h1>
				<h4>
					You can contact us at any time you like. We will get back to you as
					soon as possible.
				</h4>
				<h2>Email</h2>
				<p>
					You can contact{" "}
					<a href="https://www.linkedin.com/in/nikhil5642/">Nikhil Agrawal</a>,
					the founder of DialogGPT, directly at{" "}
					<a href="mailto:support@dialoggpt.io">nikhil@dialoggpt.io</a>. You
					will get a response as soon as possible.
				</p>
			</main>

			<style jsx>{`
				main {
					padding: 20px;
					max-width: 800px;
					margin: 0 auto;
					font-family: Arial, sans-serif;
					display: flex;
					flex-direction: column;
				}

				h1 {
					font-size: 2em;
					color: #000;
					margin-bottom: 20px;
					text-align: center;
				}

				h2 {
					font-size: 1.5em;
					color: #000;
					margin-top: 128px;
					margin-bottom: 10px;
				}
				h4 {
					font-size: 1em;
					color: #555;
					line-height: 1.5;
					margin-bottom: 15px;
					margin-top: 20px;
					text-align: center;
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
					font-weight: 500;
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

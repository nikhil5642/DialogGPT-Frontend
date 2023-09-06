import styles from "./styles/home.module.scss";
import Head from "next/head";
import AuthService from "../src/helper/AuthService";

function HomeScreen() {
	function onCreateChatbot() {
		if (AuthService.isAuthenticated()) {
			window.location.href = `/my-chatbots`;
		} else {
			window.location.href = `/signin`;
		}
	}

	return (
		<>
			<Head>
				<title>Home</title>
				<meta
					name="description"
					content="Build a chatbot for your website, try now! "
				/>
				<link rel="canonical" href="https://dialoggpt.io/home" />
			</Head>
			<div className={styles.homeScreenContainer}>
				<div className={styles.topOverviewContainer}>
					<h1>
						Chat<span>GPT</span>
						<br />
						for your <span>own Website</span>
					</h1>
					<h3>
						Transform your data into a dynamic <span>Chatbot</span>. Seamlessly
						integrate it with your <span>Website</span>. <br />
						<br />
						Connect effortlessly via <span>APIs</span> and other{" "}
						<span>integrations</span>.
					</h3>
					<button onClick={onCreateChatbot}>
						<img
							src="/assets/dialog_gpt_logo_icon_only.png"
							alt="Description of Image"
						/>
						Create your Chatbot Now ➤
					</button>
				</div>

				<div className={styles.liveDemoContainer}>
					<h2>Live Demo</h2>
					<p>This chatbot was trained on a document explaining Chatbase.</p>
					<p>You can embed a widget like this on any page on your website!</p>

					<iframe
						className={styles.liveDemoIframe}
						src="https://www.dialoggpt.io/iframe/f38342c0-15b9-49b0-9fa5-c0135cc9c45a"
						frameborder="0"
					/>
				</div>
			</div>
		</>
	);
}
export default HomeScreen;

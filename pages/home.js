import styles from "./styles/home.module.scss";
import Head from "next/head";
import AuthService from "../src/helper/AuthService";
import { useTrackEvent } from "../src/helper/event-tracker";
import { useEffect, useState } from "react";

import Image from "next/image";
function HomeScreen() {
	const { trackEvent, trackScreenView } = useTrackEvent(); // Extract analytics instance from context
	useEffect(() => {
		trackScreenView("HomeScreen", "HomeScreen");
	}, []);
	const structuredData = [
		{
			"@context": "http://schema.org",
			"@type": "WebSite",
			name: "DialogGPT.io",
			url: "https://dialoggpt.io/home",
			description: "Build a chatbot for your website, try now!",
		},
	];

	return (
		<>
			<Head>
				<title>DialogGPT</title>
				<meta
					name="description"
					content="Build a chatbot for your website, try now! "
				/>
				<link rel="canonical" href="https://dialoggpt.io/home" />
				<script type="application/ld+json">
					{JSON.stringify(structuredData)}
				</script>
			</Head>
			<div className={styles.homeScreenContainer}>
				<TopOverviewComponent />
				<VideoDemoComponent />
				<LiveDemoComponent />
			</div>
		</>
	);
}
const TopOverviewComponent = () => {
	const { trackEvent } = useTrackEvent();
	function onCreateChatbot() {
		const isAuthenticated = AuthService.isAuthenticated();

		trackEvent("create_chatbot_click", {
			user_authenticated: isAuthenticated ? "true" : "false",
		});

		if (isAuthenticated) {
			window.location.href = `/my-chatbots`;
		} else {
			window.location.href = `/signin`;
		}
	}

	return (
		<div className={styles.topOverviewContainer}>
			<h1>
				Chat<span>GPT</span>
				<br />
				for your <span>own Website</span>
			</h1>
			<p>
				Transform your data into a dynamic <span>Chatbot</span>. Seamlessly
				integrate it with your <span>Website</span>. <br />
				<br />
				Connect effortlessly via <span>APIs</span> and other{" "}
				<span>integrations</span>.
			</p>
			<button onClick={onCreateChatbot}>
				<Image
					src="/assets/dialog_gpt_logo_icon_only.png"
					alt={"DialogGPT"}
					title={"DialogGPT"}
					loading="lazy"
					height={64}
					width={64}
				/>
				Create your Chatbot Now ➤
			</button>
		</div>
	);
};
const VideoDemoComponent = () => {
	return (
		<div className={styles.videoDemoContainer} id="Demo">
			<h2>Video Demo</h2>
			<p>
				Creating a chatbot for <span>Product Hunt</span> by crawling the website
				and training the AI on its content.
			</p>

			<img
				className={styles.demoVideo}
				src="/videos/video_demo.gif"
				loading="lazy"
			/>

			<p>I can then embed the chatbot on the website!</p>
		</div>
	);
};

const LiveDemoComponent = () => {
	const [iframeLoading, setIframeLoading] = useState(true);
	return (
		<div className={styles.liveDemoContainer}>
			<h2>Live Demo</h2>
			<p>
				This chatbot was trained on a document explaining DialogGPT.
				<br />
				<br />
				You can embed a widget like this on any page on your website!
			</p>

			<div className={styles.liveDemoIframeContainer}>
				{iframeLoading && <div className={styles.roundLoader}></div>}

				<iframe
					loading="lazy"
					className={styles.liveDemoIframe}
					src="https://dialoggpt.io/iframe/23b3dc28-ae71-4cf2-a5b1-652f561c4641"
					frameBorder="0"
					title="DialogGPT Chatbot Demo"
					onLoad={() => setIframeLoading(false)}
				></iframe>
			</div>
		</div>
	);
};

export default HomeScreen;

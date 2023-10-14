import styles from "./styles/home.module.scss";
import Head from "next/head";
import AuthService from "../src/helper/AuthService";
import { useTrackEvent } from "../src/helper/event-tracker";
import { useEffect, useState } from "react";
import Header from "../src/components/header/header";
import Footer from "../src/components/about/about";
import Image from "next/image";
import About from "../src/components/about/about";
import { symbol } from "prop-types";
function HomeScreen() {
	const { trackScreenView } = useTrackEvent(); // Extract analytics instance from context
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
				<FeaturesOverviewComponent />
				<VideoDemoComponent />
				<LiveDemoComponent />
				<BottomOverviewComponent />
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
			<button onClick={onCreateChatbot}>Create your Chatbot Now →</button>
		</div>
	);
};

const FeaturesOverviewComponent = () => {
	const features = [
		{
			key: "1",
			title: "Customized Behavior",
			desc: "Ensure that your chatbot aligns with the brand's persona through personalized guidelines.",
			icon: "/assets/demo_model.png",
		},
		{
			key: "2",
			title: "Customized Appearance",
			desc: "Integrate our chatbot seamlessly into your website by tailoring its appearance for a cohesive user experience.",
			icon: "/assets/demo_chat_interface.png",
		},
		{
			key: "3",
			title: "Chat History",
			desc: " A snapshot of every conversation for quick reference and analysis.",
			icon: "/assets/demo_chat_history.png",
		},
	];
	const [selected, setSelected] = useState(features[0]);
	return (
		<div className={styles.featureOverviewContainer}>
			<h2>Everything you need for your AI Chatbot</h2>
			<div className={styles.featureListContainer}>
				<div className={styles.featureList}>
					{features.map((feature) => (
						<div
							key={feature.key}
							onClick={() => setSelected(feature)}
							className={
								feature.key === selected.key
									? `${styles.sideMenuItem} ${styles.selected}`
									: styles.sideMenuItem
							}
						>
							<h3>{feature.title}</h3>

							<p>{feature.desc}</p>
						</div>
					))}
				</div>
				<p className={styles.selectedDesc}>{selected.desc}</p>
				<div className={styles.featureImgContainer}>
					<img src={selected.icon} loading="lazy" />
				</div>
			</div>
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
			<br />
			<br />
			<p>I can then embed the chatbot on the website!</p>
		</div>
	);
};

const LiveDemoComponent = () => {
	const [iframeLoading, setIframeLoading] = useState(false);
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
const BottomOverviewComponent = () => {
	const { trackEvent } = useTrackEvent();
	function onCreateChatbot() {
		const isAuthenticated = AuthService.isAuthenticated();

		trackEvent("create_try_now_clicked", {
			user_authenticated: isAuthenticated ? "true" : "false",
		});

		if (isAuthenticated) {
			window.location.href = `/my-chatbots`;
		} else {
			window.location.href = `/signin`;
		}
	}
	return (
		<div className={styles.bottomOverViewContainer}>
			<h2>Join the future of AI Chatbots Today</h2>
			<button onClick={onCreateChatbot}>Try Now →</button>
		</div>
	);
};
HomeScreen.showHeaderFooter = true;
export default HomeScreen;

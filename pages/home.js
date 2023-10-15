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
import BottomTryNowComponent from "../src/components/bottom-try-now-component/bottom-try-now-component";
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
				<AvailableIntegrations />
				<FAQComponent />
				<BottomTryNowComponent />
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
const AvailableIntegrations = () => {
	return (
		<div className={styles.availableIntegrationsContainer}>
			<h2>Seamlessly Integrate with Your Preferred Website Builder</h2>
			<div className={styles.availableIntegrationsRow}>
				<Image
					className={styles.integrationItem}
					src="/assets/ic_webflow.png"
					alt={"DialogGPT"}
					title={"DialogGPT"}
					loading="eager"
					priority={true}
					width={512} // default width
					height={150} // default height
				></Image>
				<Image
					className={styles.integrationItem}
					src="/assets/ic_wix.png"
					alt={"DialogGPT"}
					title={"DialogGPT"}
					loading="eager"
					priority={true}
					width={626} // default width
					height={150} // default height
				></Image>
				<Image
					className={styles.integrationItem}
					src="/assets/ic_shopify.png"
					alt={"DialogGPT"}
					title={"DialogGPT"}
					loading="eager"
					priority={true}
					width={200} // default width
					height={150} // default height
				></Image>

				<Image
					className={styles.integrationItem}
					src="/assets/ic_wordpress.png"
					alt={"DialogGPT"}
					title={"DialogGPT"}
					loading="eager"
					priority={true}
					width={500} // default width
					height={200} // default height
				></Image>

				<Image
					className={styles.integrationItem}
					src="/assets/ic_hubspot.png"
					alt={"DialogGPT"}
					title={"DialogGPT"}
					loading="eager"
					priority={true}
					width={500} // default width
					height={200} // default height
				></Image>
				<Image
					className={styles.integrationItem}
					src="/assets/ic_hostinger.png"
					alt={"DialogGPT"}
					title={"DialogGPT"}
					loading="eager"
					priority={true}
					width={250} // default width
					height={200} // default height
				></Image>

				<Image
					className={styles.integrationItem}
					src="/assets/ic_bigcommerce.png"
					alt={"DialogGPT"}
					title={"DialogGPT"}
					loading="eager"
					priority={true}
					width={250} // default width
					height={200} // default height
				></Image>
				<Image
					className={styles.integrationItem}
					src="/assets/ic_woo_commerce.png"
					alt={"DialogGPT"}
					title={"DialogGPT"}
					loading="eager"
					priority={true}
					width={250} // default width
					height={200} // default height
				></Image>
				<Image
					className={styles.integrationItem}
					src="/assets/ic_godaddy.png"
					alt={"DialogGPT"}
					title={"DialogGPT"}
					loading="eager"
					priority={true}
					width={250} // default width
					height={200} // default height
				></Image>
			</div>
		</div>
	);
};

const FAQItem = ({ question, answer }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={styles.faqItem}>
			<h3 onClick={() => setIsOpen(!isOpen)}>
				{question}
				<span className={styles.toggleSign}>{isOpen ? "-" : "+"}</span>
			</h3>
			{isOpen && <p>{answer}</p>}
		</div>
	);
};
const FAQComponent = () => {
	const faqData = [
		{
			question: "What is DialogGPT.io?",
			answer:
				"DialogGPT.io is a cutting-edge conversational AI platform designed to provide seamless interactions and solutions for users. Our platform leverages advanced machine learning techniques to understand and respond to user queries effectively.",
		},
		{
			question: "How does DialogGPT.io differ from other chatbot platforms?",
			answer:
				"Our platform is built on state-of-the-art GPT architecture, ensuring more natural and human-like conversations. We prioritize user experience and continuously update our models for optimal performance.",
		},
		{
			question: "Can I customize the DialogGPT.io bot for my specific needs?",
			answer:
				"Absolutely! DialogGPT.io offers a range of customization options, allowing you to tailor the bot's responses, appearance, and behavior to align with your brand and requirements.",
		},
		{
			question: "Is my data secure with DialogGPT.io?",
			answer:
				"Data security is our top priority. We implement robust encryption and security protocols to ensure that your data remains confidential and protected at all times.",
		},
		{
			question: "Which GPT version does DialogGPT.io use?",
			answer:
				"We by default use GPT-3.5 Turbo, but we offer the GPT-4 option for users on our Pro plan.",
		},
		{
			question:
				"How can I integrate DialogGPT.io into my website or application?",
			answer:
				"You can easily integrate DialogGPT.io into your website or application by using an iframe or embedding our provided JS code.",
		},
		{
			question: "Does DialogGPT.io support multiple languages?",
			answer:
				"Yes, our platform is designed to understand and respond in multiple languages, making it versatile for a global audience.",
		},
		{
			question:
				"Can I share feedback or suggest improvements for DialogGPT.io?",
			answer:
				"Absolutely! We value feedback and suggestions from our users. Please reach out to us with your insights at nikhil@dialoggpt.io. Our team is committed to continuous improvement, and your input plays a crucial role in our development process.",
		},
	];

	return (
		<div className={styles.faqContainer}>
			<h2>Frequently Asked Questions</h2>
			{faqData.map((faq, index) => (
				<FAQItem key={index} question={faq.question} answer={faq.answer} />
			))}
		</div>
	);
};

HomeScreen.showHeaderFooter = true;
export default HomeScreen;

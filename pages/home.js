import styles from "./styles/home.module.scss";
import Head from "next/head";
import AuthService from "../src/helper/AuthService";
import { useTrackEvent } from "../src/helper/event-tracker";

function HomeScreen() {
	const trackEvent = useTrackEvent(); // Extract analytics instance from context

	function onCreateChatbot() {
		const isAuthenticated = AuthService.isAuthenticated();

		// Log an event when the 'Create your Chatbot' button is clicked, including the user's authentication status

		trackEvent("create_chatbot_click", {
			user_authenticated: isAuthenticated ? "true" : "false",
		});

		if (isAuthenticated) {
			window.location.href = `/my-chatbots`;
		} else {
			window.location.href = `/signin`;
		}
	}
	// Log an event when the video ends
	const handleVideoEnd = (e) => {
		trackEvent("video_demo_ended");
		e.target.play();
	};

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
				<div className={styles.videoDemoContainer}>
					<h2>Video Demo</h2>
					<p>This chatbot was trained on a document explaining Chatbase.</p>
					<p>You can embed a widget like this on any page on your website!</p>

					<video
						controls
						width="90%"
						height="auto"
						className={styles.demoVideo}
					>
						<source
							src="/videos/video_demo.mp4"
							type="video/mp4"
							autoPlay
							loop
							onEnded={handleVideoEnd}
						/>
						Your browser does not support the video tag.
					</video>
				</div>

				<div className={styles.liveDemoContainer}>
					<h2>Live Demo</h2>
					<p>This chatbot was trained on a document explaining Chatbase.</p>
					<p>You can embed a widget like this on any page on your website!</p>

					<iframe
						className={styles.liveDemoIframe}
						src="https://www.dialoggpt.io/iframe/23b3dc28-ae71-4cf2-a5b1-652f561c4641"
						frameBorder="0"
					></iframe>
				</div>
			</div>
		</>
	);
}
export default HomeScreen;

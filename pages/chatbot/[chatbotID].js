import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../styles/defaults.module.scss";
import ChatBotEditor from "../../src/components/chatbot-editor/chatbot-editor";
import React, { useEffect } from "react";

export default function ChatbotPage() {
	const { chatbotID, page } = useRouter().query;
	useEffect(() => {
		const handleBeforeUnload = (e) => {
			e.preventDefault();
			e.returnValue = "Are you sure you want to leave or refresh this page?";
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);

	return (
		<>
			<>
				<Head>
					<title>Home</title>
					<meta name="My Chatbots" content="List of already trained chatbots" />
					<link rel="canonical" href="https://diaglogGPT.com/my-chatbots" />
				</Head>
				<div className={styles.container}>
					<ChatBotEditor botID={chatbotID} page={page} />
				</div>
			</>
		</>
	);
}

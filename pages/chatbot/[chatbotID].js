import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../styles/defaults.module.scss";
import ChatBotEditor from "../../src/components/chatbot-editor/chatbot-editor";

export default function GamePlayScreen() {
	const { chatbotID } = useRouter().query;

	return (
		<>
			<>
				<Head>
					<title>Home</title>
					<meta name="My Chatbots" content="List of already trained chatbots" />
					<link rel="canonical" href="https://chessmeito.com/my-chatbots" />
				</Head>
				<div className={styles.container}>
					<ChatBotEditor botID={chatbotID} />
				</div>
			</>
		</>
	);
}

import { use } from "react";
import styles from "./my-chatbots.module.scss";
import { useRouter } from "next/router";

export default function MyChatBots() {
	const router = useRouter();
	const createNewChatBot = () => {
		router.push("/create-new-chatbot");
	};

	return (
		<div className={styles.myChatBotContainer}>
			<h1 className={styles.myChatBotTitleHeading}>My ChatBots</h1>
			<button className={styles.button} onClick={createNewChatBot}>
				Create New ChatBot
			</button>
		</div>
	);
}

import styles from "./my-chatbots.module.scss";
import { useRouter } from "next/router";
import { getRequest } from "../../helper/http-helper";
import { useState, useEffect } from "react";
import Link from "next/link"; // Import the Link component

export default function MyChatBots() {
	const router = useRouter();
	const [chatbotsList, setChatBotsList] = useState([]);
	const createNewChatBot = () => {
		getRequest("/createBot").then((res) => console.log("create chatbots", res));
	};

	useEffect(() => {
		getRequest("/my_chatbots").then((res) => {
			setChatBotsList(res.chatbot_list);
		});
	}, []);

	return (
		<div className={styles.myChatBotContainer}>
			<h1 className={styles.myChatBotTitleHeading}>My ChatBots</h1>

			<div className={styles.chatBotGrid}>
				{chatbotsList.map((chatbot) => (
					<Link
						key={chatbot.chatbot_id}
						href={`/chatbot/${chatbot.chatbot_id}`} // Define the href for the link
						className={styles.card}
					>
						<p className={styles.cardName}>{chatbot.chatbot_name}</p>
					</Link>
				))}
			</div>

			<button className={styles.button} onClick={createNewChatBot}>
				Create New ChatBot
			</button>
		</div>
	);
}

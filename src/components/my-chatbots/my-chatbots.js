import styles from "./my-chatbots.module.scss";
import { useRouter } from "next/router";
import { getRequest, postRequest } from "../../helper/http-helper";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import LoaderContext from "../loader/loader-context";

export default function MyChatBots() {
	const router = useRouter();
	const { showLoader, hideLoader } = useContext(LoaderContext);

	const [chatbotsList, setChatBotsList] = useState([]);
	const createNewChatBot = () => {
		showLoader("Creating a bot...");
		postRequest("/create_bot", {
			chatBotName: "Untitled Chatbot " + (chatbotsList.length + 1),
		})
			.then((res) => {
				hideLoader();
				router.push(`/chatbot/${res.chatbot_id}`);
			})
			.catch(() => {
				hideLoader();
			});
	};

	useEffect(() => {
		showLoader("Loading Chatbot Data...");
		getRequest("/my_chatbots")
			.then((res) => {
				setChatBotsList(res.chatbot_list);
				hideLoader();
			})
			.catch(() => {
				hideLoader();
			});
	}, []);

	return (
		<div className={styles.myChatBotContainer}>
			<h1 className={styles.myChatBotTitleHeading}>My ChatBots</h1>

			<div className={styles.chatBotGrid}>
				{chatbotsList.map((chatbot) => (
					<a
						key={chatbot.chatbot_id}
						href={`/chatbot/${chatbot.chatbot_id}`} // Define the href for the link
						className={styles.chatbotCard}
					>
						<Image
							className={styles.charbotCardImg}
							src="/assets/dialog_gpt_logo_icon_only.png"
							alt={"Message"}
							title={"Message"}
							loading="eager"
							height={64}
							width={64}
						></Image>
						<p className={styles.cardName}>{chatbot.chatbot_name}</p>
					</a>
				))}
			</div>

			<button className={styles.button} onClick={createNewChatBot}>
				Create New ChatBot
			</button>
		</div>
	);
}

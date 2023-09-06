import styles from "./my-chatbots.module.scss";
import { useRouter } from "next/router";
import { getRequest, postRequest } from "../../helper/http-helper";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import LoaderContext from "../loader/loader-context";
import LoadingButton from "../loading-button/loading-button";
import { showErrorToast } from "src/helper/toast-helper";

export default function MyChatBots() {
	const { showLoader, hideLoader } = useContext(LoaderContext);
	const [chatbotLimit, setChatbotLimit] = useState(1);
	const [chatbotsList, setChatBotsList] = useState([]);
	const createNewChatBot = () => {
		showLoader("Creating a bot...");
		postRequest("/create_bot", {
			chatBotName: "Untitled Chatbot " + (chatbotsList.length + 1),
		})
			.then((res) => {
				hideLoader();
				window.location.href = `/chatbot/${res.chatbot_id}`;
			})
			.catch(() => {
				hideLoader();
			});
	};
	function handleChatbotClick(index, chatbotId) {
		if (index >= chatbotLimit) {
			showErrorToast(
				"You are limited to accessing " +
					chatbotLimit +
					" chatbots under your current plan.",
			);
			return;
		}
		// If within limit, navigate to the chatbot page
		window.location.href = `/chatbot/${chatbotId}`;
	}

	useEffect(() => {
		showLoader("Loading Chatbot Data...");
		getRequest("/my_chatbots")
			.then((res) => {
				setChatBotsList(res.chatbot_list);
				setChatbotLimit(res.chatbot_limit);
				hideLoader();
			})
			.catch(() => {
				hideLoader();
			});
	}, []);

	return (
		<div className={styles.myChatBotContainer}>
			<h1 className={styles.myChatBotTitleHeading}>My ChatBots</h1>
			<p className={styles.myChatBotTitleSubHeading}>
				({chatbotLimit} ChatBot Limit)
			</p>
			<div className={styles.chatBotGrid}>
				{chatbotsList.map((chatbot, index) => (
					<a
						key={chatbot.chatbot_id}
						onClick={() => handleChatbotClick(index, chatbot.chatbot_id)} // Add the click handler
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

			<div className={styles.createButtonContainer}>
				<LoadingButton
					title={"Create New ChatBot"}
					onClick={createNewChatBot}
				/>
			</div>
		</div>
	);
}

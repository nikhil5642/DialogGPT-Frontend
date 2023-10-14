import styles from "./my-chatbots.module.scss";
import { useRouter } from "next/router";
import { getRequest, postRequest } from "../../helper/http-helper";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import LoaderContext from "../loader/loader-context";
import LoadingButton from "../loading-button/loading-button";
import { showErrorToast } from "src/helper/toast-helper";
import { useTrackEvent } from "../../helper/event-tracker";
export default function MyChatBots() {
	const { trackEvent, trackScreenView } = useTrackEvent();
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
				window.location.href = `/chatbot/${res.chatbot_id}/sources`;
				trackEvent("create-new-chatbot-success", { name: res.chatbot_name });
			})
			.catch(() => {
				hideLoader();
				trackEvent("create-new-chatbot-failure");
			});
	};
	function handleChatbotClick(index, chatbotId) {
		if (index >= chatbotLimit) {
			showErrorToast(
				"You are limited to accessing " +
					chatbotLimit +
					" chatbots under your current plan.",
			);
			trackEvent("chatbot-click-limit-reached", { index: index });
			return;
		} else {
			trackEvent("chatbot-click-openened", { index: index });
		}
		// If within limit, navigate to the chatbot page
		window.location.href = `/chatbot/${chatbotId}/chatbots`;
	}

	useEffect(() => {
		trackScreenView("MyChatBots", "MyChatBots");
		showLoader("Loading Chatbot Data...");
		getRequest("/my_chatbots")
			.then((res) => {
				setChatBotsList(res.chatbot_list);
				setChatbotLimit(res.chatbot_limit);
				hideLoader();
				trackEvent("my-chatbot-fetch-success");
			})
			.catch(() => {
				trackEvent("my-chatbot-fetch-failure");
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
							src="/assets/ic_bot.png"
							alt={"Message"}
							title={"Message"}
							loading="lazy"
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

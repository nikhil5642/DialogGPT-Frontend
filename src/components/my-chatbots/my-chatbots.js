import styles from "./my-chatbots.module.scss";
import PricingDialog from "../pricing-dialog/pricing-dialog";
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
	const [chatbotLimit, setChatbotLimit] = useState(0);
	const [chatbotsList, setChatBotsList] = useState([]);
	const [isPricingDialogOpen, setPricingDialogOpen] = useState(false);

	const createNewChatBot = (isOnBoarding) => {
		showLoader("Creating a bot...");
		postRequest("/create_bot", {
			chatBotName: isOnBoarding
				? "My First Chatbot"
				: "Untitled Chatbot " + (chatbotsList.length + 1),
		})
			.then((res) => {
				hideLoader();
				if (isOnBoarding) {
					window.location.href = `/onboarding/${res.chatbot_id}`;
				} else {
					window.location.href = `/chatbot/${res.chatbot_id}`;
				}
				trackEvent("create-new-chatbot-success", { name: res.chatbot_name });
			})
			.catch((err) => {
				hideLoader();
				trackEvent("create-new-chatbot-failure");
				if (
					err.response.status == 400 &&
					err.response.data.detail.includes("maximum limit")
				) {
					setPricingDialogOpen(true);
				} else {
					showErrorToast(err.response.data.detail);
				}
			});
	};
	function handleChatbotClick(index, chatbotId) {
		if (index >= chatbotLimit) {
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
				if (res?.is_first_time_user && res.chatbot_list.length === 0) {
					createNewChatBot(true);
				} else if (res?.is_first_time_user) {
					window.location.href = `/onboarding/${res.chatbot_list[0].chatbot_id}`;
				}
				trackEvent("my-chatbot-fetch-success");
			})
			.catch(() => {
				trackEvent("my-chatbot-fetch-failure");
				hideLoader();
			});
	}, []);

	return (
		<div className={styles.myChatBotContainer}>
			<PricingDialog
				isOpen={isPricingDialogOpen}
				onClose={() => setPricingDialogOpen(false)}
				title={(() => {
					if (chatbotLimit === 0) {
						return "Start Your Free Trial Now!";
					} else if (chatbotLimit === 1) {
						return "Unlock Essential Today!";
					} else {
						return "Go Pro and Maximize Benefits!";
					}
				})()}
			/>

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

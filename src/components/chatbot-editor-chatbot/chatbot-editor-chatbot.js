import React, { useState, useEffect, useRef } from "react";
import styles from "./chatbot-editor-chatbot.module.scss";
import ChatBotComponent from "../chatbot-component/chatbot-component";
import { getRequest, postRequest } from "../../helper/http-helper";
import { useTrackEvent } from "../../helper/event-tracker";
import { formatTimestamp } from "../../helper/utils";

export default function ChatBotEditorChatBot({ chatbotData, config }) {
	const { trackScreenView } = useTrackEvent();
	const [messageCredits, setMessageCredits] = useState(0);

	useEffect(() => {
		async function fetchCredits() {
			if (chatbotData.status == "trained") {
				getRequest("/message_credits")
					.then((res) => {
						setMessageCredits(res.result.message_credits);
					})
					.catch(() => {});
			}
		}

		// Fetch once immediately
		fetchCredits();

		// Set up interval to fetch every 5 seconds
		const intervalId = setInterval(fetchCredits, 3000);

		// Clear the interval when the component is unmounted
		return () => clearInterval(intervalId);
	}, [chatbotData.status]);

	function handleUpgradeClick() {
		// Redirect to upgrade page or any other action
		window.location.href = "/pricing";
	}

	return (
		<>
			{chatbotData.status === "training" && (
				<>
					{trackScreenView("ChatBotTrainingScreen", "ChatBotEditorScreen")}
					<div className={styles.chatBotTrainingModelContainer}>
						<h2>Please Wait...</h2>
						<p>Training In Progress</p>
						<progress max="100"></progress>
						<p>Incase if it's taking too long, try to train chatbot again! </p>
					</div>
				</>
			)}
			{chatbotData.status === "untrained" && (
				<>
					{trackScreenView("ChatbotUntrainedScreen", "ChatBotEditorScreen")}
					<div className={styles.chatBotUntrainedModelContainer}>
						<img src="/assets/ic_error.png"></img>
						<h2>Chatbot is not trained</h2>
						<p>Follow the below steps to train your first chatbot.</p>
						<ol>
							<li>
								Navigate to the <strong>Sources</strong> section.
							</li>
							<li>
								Add your desired content:
								<ul>
									<li>Enter plain text or sentences.</li>
									<li>Provide a website URL for content extraction.</li>
								</ul>
							</li>
							<li>
								Click the <strong>Train</strong> button to train the ChatBot on
								the provided data.
							</li>
						</ol>
					</div>
				</>
			)}
			{chatbotData.status === "trained" && (
				<>
					{trackScreenView("ChatBotTrainedScreen", "ChatBotEditorScreen")}

					<div className={styles.chatBottrainedModelContainer}>
						<p className={styles.last_trained}>
							Last Trained: {formatTimestamp(chatbotData.last_updated)}
						</p>
						<div className={styles.chatBotComponentContainer}>
							<ChatBotComponent botID={chatbotData.id} config={config} />
						</div>
						<p className={styles.message_credits}>
							{messageCredits} {"Message Credits remaining."}
						</p>
						{messageCredits < 1 && (
							<div className={styles.upgradeContainer}>
								<div className={styles.upgradeMessage}>
									<img
										src="/assets/ic_error.png"
										alt="Warning"
										className={styles.warningIcon}
									/>
									You've run out of message credits!
								</div>
								<button
									className={styles.upgradeButton}
									onClick={handleUpgradeClick}
								>
									Upgrade Now
								</button>
							</div>
						)}
					</div>
				</>
			)}
		</>
	);
}

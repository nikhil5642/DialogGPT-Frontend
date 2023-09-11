import React from "react";
import ReactDOM from "react-dom";
import ChatBotComponent from "../../src/components/chatbot-component/chatbot-component";
import { chatInit } from "../../src/components/chatbot-settings/chat-interface-settings/chat-interface-settings.utils";
import { ChatBotSource } from "../../src/components/chatbot-component/chatbot-component.utils";
import { useState, useEffect } from "react";

function ChatbotPage({ chatbotID, source }) {
	const [data, setData] = useState(chatInit(chatbotID, source));

	useEffect(() => {
		if (chatbotID) {
			setData({ ...data, botID: chatbotID });
			fetch("https://api.dialoggpt.io/fetch_chatbot_interface", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					botID: chatbotID,
				}),
			})
				.then((response) => response.json())
				.then((res) => {
					setData((prev) => {
						return {
							...prev,
							initialMessage: res.result.initial_message,
							quickPrompts: res.result.quick_prompts,
							theme: res.result.theme,
							profilePicture: res.result.profile_picture,
							userMsgColor: res.result.user_msg_color,
							displayName: res.result.display_name,
							chatIcon: res.result.chat_icon,
							chatBubbleColor: res.result.chat_bubble_color,
						};
					});
				})
				.catch(() => {
					showErrorToast("Error Loading Information");
				});
		}
	}, [chatbotID]);
	return <ChatBotComponent botID={chatbotID} config={data} />;
}
function initializeChatbotOnClient(chatbotID, containerId) {
	const container = document.getElementById(containerId);
	ReactDOM.render(<ChatbotPage chatbotID={chatbotID} />, container);
}

if (typeof window !== "undefined") {
	window.initializeChatbotPage = initializeChatbotOnClient;
}

export async function getServerSideProps(context) {
	const chatbotID = context.params.chatbotID;
	const source = context.query.source || ChatBotSource.IFRAME;
	return {
		props: {
			chatbotID,
			source,
		},
	};
}

ChatbotPage.isIsolatedComponent = true;
export default ChatbotPage;

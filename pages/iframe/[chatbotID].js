import React from "react";
import ReactDOM from "react-dom";
import ChatBotComponent from "../../src/components/chatbot-component/chatbot-component";
import { chatInit } from "../../src/components/chatbot-settings/chat-interface-settings/chat-interface-settings.utils";
import { ChatBotSource } from "../../src/components/chatbot-component/chatbot-component.utils";

function ChatbotPage({ chatbotID }) {
	return (
		<ChatBotComponent
			botID={chatbotID}
			config={chatInit(chatbotID, ChatBotSource.IFRAME)}
		/>
	);
}
function initializeChatbotOnClient(chatbotID, containerId) {
	const container = document.getElementById(containerId);
	ReactDOM.render(<ChatbotPage chatbotID={chatbotID} />, container);
}

if (typeof window !== "undefined") {
	window.initializeChatbotPage = initializeChatbotOnClient;
}
ChatbotPage.isIsolatedComponent = true;
export default ChatbotPage;

import React from "react";
import ReactDOM from "react-dom";
import ChatBotComponent from "../../src/components/chatbot-component/chatbot-component";

function ChatbotPage({ chatbotID }) {
	return <ChatBotComponent botID={chatbotID} />;
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

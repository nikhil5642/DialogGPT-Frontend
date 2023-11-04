import { storeCookie, getCookie, removeCookie } from "./cookie-helper.js";

export const ChatHistoryService = {
	// Retrieve the chat history from the cookie or create a new one if it doesn't exist
	getChatHistory: async (chatbotId) => {
		try {
			const allChatData = getCookie("chatData")
				? JSON.parse(getCookie("chatData"))
				: {};
			const chatData = allChatData[chatbotId];

			if (chatData) {
				return chatData;
			} else {
				// Create a new chat history if it doesn't exist
				const newChatData = {
					chatId: generateNewChatId(), // Assuming you have a function to generate a new chat ID
					history: [],
					leadsSubmitted: false,
				};
				allChatData[chatbotId] = newChatData;
				storeCookie("chatData", JSON.stringify(allChatData));
				return newChatData;
			}
		} catch (error) {
			throw error;
		}
	},
	// Store the chat history in a cookie
	storeChatHistory: async (chatbotId, chatId, leadsSubmitted, history) => {
		try {
			const allChatData = getCookie("chatData")
				? JSON.parse(getCookie("chatData"))
				: {};
			const chatData = {
				chatId: chatId,
				history: history,
				leadsSubmitted: leadsSubmitted,
			};
			allChatData[chatbotId] = chatData;
			await storeCookie("chatData", JSON.stringify(allChatData));
		} catch (error) {
			console.error(error);
		}
	},

	// Clear the chat history from the cookie
	clearChatHistory: async (chatbotId) => {
		const allChatData = getCookie("chatData")
			? JSON.parse(getCookie("chatData"))
			: {};
		delete allChatData[chatbotId];
		storeCookie("chatData", JSON.stringify(allChatData));
	},
};

export function generateNewChatId() {
	const timestamp = new Date().getTime().toString(36); // Current time in base 36
	const randomPart = Math.random().toString(36).substr(2, 9); // Random string
	return timestamp + "-" + randomPart;
}

export default ChatHistoryService;

import { storeCookie, getCookie, removeCookie } from "./cookie-helper.js";

export const ChatHistoryService = {
	// Retrieve the chat history from the cookie or create a new one if it doesn't exist
	getChatHistory: async () => {
		try {
			const chatData = getCookie("chatData");
			if (chatData) {
				return JSON.parse(chatData);
			} else {
				// Create a new chat history if it doesn't exist
				const newChatData = {
					chatId: generateNewChatId(), // Assuming you have a function to generate a new chat ID
					history: [],
					leadsSubmitted: false,
				};
				storeCookie("chatData", JSON.stringify(newChatData));
				return newChatData;
			}
		} catch (error) {
			throw error;
		}
	},
	// Store the chat history in a cookie
	storeChatHistory: async (chatId, leadsSubmitted, history) => {
		try {
			const chatData = {
				chatId: chatId,
				history: history,
				leadsSubmitted: leadsSubmitted,
			};
			await storeCookie("chatData", JSON.stringify(chatData));
		} catch (error) {
			console.error(error);
		}
	},

	// Clear the chat history from the cookie
	clearChatHistory: async () => {
		removeCookie("chatData");
	},
};

function generateNewChatId() {
	const timestamp = new Date().getTime().toString(36); // Current time in base 36
	const randomPart = Math.random().toString(36).substr(2, 9); // Random string
	return timestamp + "-" + randomPart;
}

export default ChatHistoryService;

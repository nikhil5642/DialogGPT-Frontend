import { ChatBotSource } from "../../chatbot-component/chatbot-component.utils";

export const ChatTheme = {
	LIGHT: "light",
	DARK: "dark",
};

export const chatInit = (botID, source) => ({
	botID: botID,
	source: source,
	initialMessage: "",
	quickPrompts: "",
	theme: ChatTheme.LIGHT,
	profilePicture: null,
	userMsgColor: "#ff0000",
	displayName: "",
	chatIcon: null,
	chatBubbleColor: "#000000",
});

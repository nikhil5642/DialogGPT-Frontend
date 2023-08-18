import { useState, useEffect } from "react";
import styles from "./chatbot-editor.module.scss";
import ChatBotSourceEditor from "../chatbot-source-editor/chatbot-source-editor";
import {
	ChatBotOptionSelector,
	ChatBotOptionsEnum,
} from "./chatbot-editor-source.utits";
import { postRequest } from "../../../src/helper/http-helper";

export default function ChatBotEditor({ botID }) {
	const [selector, setSelector] = useState(ChatBotOptionsEnum.SOURCES);
	const [chatbotData, setChatbotData] = useState({
		id: botID,
		name: "",
		status: "untrained",
	});
	useEffect(() => {
		loadChatBotData();
	}, [botID]);

	const loadChatBotData = () => {
		if (botID) {
			postRequest("/load_chatbot_info", { botID: botID }).then((res) =>
				setChatbotData({
					...chatbotData,
					name: res.result.chatbot_name || "",
					status: res.result.chatbot_status || "",
				}),
			);
		}
	};

	return (
		<div className={styles.chatBotEditorContainer}>
			<h1 className={styles.chatbotEditorTitleHeading}>{chatbotData.name}</h1>

			<ChatBotOptionSelector selector={selector} setSelector={setSelector} />

			{selector === ChatBotOptionsEnum.SETTINGS && <div>Settings View</div>}
			{selector === ChatBotOptionsEnum.CHATBOT && <div>Chatbot View</div>}
			{selector === ChatBotOptionsEnum.SOURCES && (
				<ChatBotSourceEditor botID={botID} />
			)}
		</div>
	);
}

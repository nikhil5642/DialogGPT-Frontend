import { useState, useEffect, useContext } from "react";
import styles from "./chatbot-editor.module.scss";
import ChatBotSourceEditor from "../chatbot-source-editor/chatbot-source-editor";
import {
	ChatBotOptionSelector,
	ChatBotOptionsEnum,
} from "./chatbot-editor.utits";
import { postRequest } from "../../../src/helper/http-helper";
import ChatBotComponent from "../chatbot-component/chatbot-component";
import ChatBotSettings from "../chatbot-settings/chatbot-settings";
import LoaderContext from "../loader/loader-context";

export default function ChatBotEditor({ botID }) {
	const [selector, setSelector] = useState(ChatBotOptionsEnum.SETTINGS);
	const { showLoader, hideLoader } = useContext(LoaderContext);
	const [chatbotData, setChatbotData] = useState({
		id: botID,
		name: "",
		status: "untrained",
		last_updated: "2023-08-22T14:00:18.796000",
	});
	useEffect(() => {
		loadChatBotData();
	}, [botID]);

	const loadChatBotData = () => {
		if (botID) {
			showLoader("Loading Info...");
			postRequest("/load_chatbot_info", { botID: botID })
				.then((res) => {
					hideLoader();
					setChatbotData({
						...chatbotData,
						id: botID,
						name: res.result.chatbot_name || "",
						status: res.result.chatbot_status || "",
						last_updated: res.result.last_updated,
					});
				})
				.catch(() => {
					hideLoader();
				});
		}
	};

	return (
		<div className={styles.chatBotEditorContainer}>
			<h1 className={styles.chatbotEditorTitleHeading}>{chatbotData.name}</h1>

			<ChatBotOptionSelector selector={selector} setSelector={setSelector} />

			{selector === ChatBotOptionsEnum.CHATBOT && (
				<ChatBotComponent botID={botID} />
			)}
			{selector === ChatBotOptionsEnum.SOURCES && (
				<ChatBotSourceEditor botID={botID} />
			)}
			{selector === ChatBotOptionsEnum.SETTINGS && (
				<ChatBotSettings data={chatbotData} setData={setChatbotData} />
			)}
		</div>
	);
}

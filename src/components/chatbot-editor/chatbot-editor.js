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
import EmbedComponent from "../chatbot-embed/chatbot-embed";
import { chatInit } from "../chatbot-settings/chat-interface-settings/chat-interface-settings.utils";
import { ChatBotSource } from "../chatbot-component/chatbot-component.utils";
import { showErrorToast } from "../../helper/toast-helper";

export default function ChatBotEditor({ botID, page }) {
	const [selector, setSelector] = useState(ChatBotOptionsEnum.CHATBOT);
	const { showLoader, hideLoader } = useContext(LoaderContext);
	const [chatbotData, setChatbotData] = useState({
		id: botID,
		name: "",
		status: "untrained",
		last_updated: "2023-08-22T14:00:18.796000",
	});
	const [config, setConfig] = useState(chatInit(botID, ChatBotSource.CHATBOT));

	useEffect(() => {
		setSelector(
			(page && ChatBotOptionsEnum[page.toUpperCase()]) ||
				ChatBotOptionsEnum.CHATBOT,
		);
	}, [page]);
	useEffect(() => {
		if (botID) {
			setChatbotData((prev) => {
				return { ...prev, id: botID };
			});
			setConfig((prev) => {
				return { ...prev, botID: botID };
			});
			loadChatBotData(false);
			loadChatBotConfigData();
		}
	}, [botID]);

	const loadChatBotData = (refresh) => {
		if (!refresh) {
			showLoader("Loading Info...");
		}
		postRequest("/load_chatbot_info", { botID: botID })
			.then((res) => {
				hideLoader();
				setChatbotData((prev) => {
					return {
						...prev,
						id: botID,
						name: res.result.chatbot_name || "",
						status: res.result.chatbot_status || "",
						last_updated: res.result.last_updated,
					};
				});
			})
			.catch(() => {
				hideLoader();
			});
	};

	const loadChatBotConfigData = () => {
		postRequest("/fetch_chatbot_interface", {
			botID: botID,
		})
			.then((res) => {
				setConfig((prev) => {
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
	};

	useEffect(() => {
		let interval;

		if (chatbotData.status === "training") {
			interval = setInterval(() => {
				loadChatBotData(true);
			}, 3000); // Check every 3 seconds
		}

		return () => {
			clearInterval(interval); // Clear the interval when the component unmounts or status changes
		};
	}, [chatbotData.status]);

	return (
		<div className={styles.chatBotEditorContainer}>
			<h1 className={styles.chatbotEditorTitleHeading}>{chatbotData.name}</h1>

			<ChatBotOptionSelector selector={selector} setSelector={setSelector} />

			{selector === ChatBotOptionsEnum.CHATBOT &&
				chatbotData.status === "training" && (
					<div className={styles.chatBotTrainingModelContainer}>
						<h2>Please Wait...</h2>
						<p>Training In Progress</p>
						<progress max="100"></progress>
						<p>Incase if it's taking too long, try to train chatbot again! </p>
					</div>
				)}

			{selector === ChatBotOptionsEnum.CHATBOT &&
				chatbotData.status === "untrained" && (
					<div className={styles.chatBotUntrainedModelContainer}>
						<img src="/assets/ic_error.png"></img>
						<h2>Chatbot is not trained</h2>
						<p>Please add the sources and train the ChatBot</p>
					</div>
				)}

			{selector === ChatBotOptionsEnum.CHATBOT &&
				chatbotData.status === "trained" && (
					<div className={styles.chatBottrainedModelContainer}>
						<ChatBotComponent botID={botID} />
					</div>
				)}

			{selector === ChatBotOptionsEnum.SOURCES && (
				<ChatBotSourceEditor
					chatbotInfoData={chatbotData}
					setChatbotInfoData={setChatbotData}
				/>
			)}
			{selector === ChatBotOptionsEnum.SETTINGS && (
				<ChatBotSettings data={chatbotData} setData={setChatbotData} />
			)}
			{selector === ChatBotOptionsEnum.EMBED && (
				<EmbedComponent data={chatbotData} />
			)}
		</div>
	);
}

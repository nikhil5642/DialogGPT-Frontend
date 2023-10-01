import { useState, useEffect, useContext, use } from "react";
import styles from "./chatbot-editor.module.scss";
import ChatBotSourceEditor from "../chatbot-source-editor/chatbot-source-editor";
import {
	ChatBotOptionSelector,
	ChatBotOptionsEnum,
} from "./chatbot-editor.utits";
import { getRequest, postRequest } from "../../../src/helper/http-helper";
import ChatBotComponent from "../chatbot-component/chatbot-component";
import ChatBotSettings from "../chatbot-settings/chatbot-settings";
import LoaderContext from "../loader/loader-context";
import EmbedComponent from "../chatbot-embed/chatbot-embed";
import { chatInit } from "../chatbot-settings/chat-interface-settings/chat-interface-settings.utils";
import { ChatBotSource } from "../chatbot-component/chatbot-component.utils";
import { showErrorToast, showSuccessToast } from "../../helper/toast-helper";
import { useTrackEvent } from "src/helper/event-tracker";
import EditBoxComponent from "../editbox-component/editbox-component";
import { formatTimestamp } from "../../helper/utils";
import { URLStatus } from "../chatbot-source-editor/website-loader/website-loader.utils";
import LoadingButton from "../loading-button/loading-button";

export default function ChatBotEditor({ botID, page }) {
	const { trackEvent, trackScreenView } = useTrackEvent();
	const [selector, setSelector] = useState(ChatBotOptionsEnum.CHATBOT);
	const { showLoader, hideLoader } = useContext(LoaderContext);
	const [nameEditing, setNameEditing] = useState(false);
	const [messageCredits, setMessageCredits] = useState(0);
	const [chatbotData, setChatbotData] = useState({
		id: botID,
		name: "",
		status: "untrained",
		last_updated: "2023-08-22T14:00:18.796000",
	});
	const [config, setConfig] = useState(chatInit(botID, ChatBotSource.CHATBOT));

	useEffect(() => {
		trackScreenView("ChatBotEditorScreen", "ChatBotEditorScreen");
	}, []);
	useEffect(() => {
		setSelector(
			(page && ChatBotOptionsEnum[page.toUpperCase()]) ||
				ChatBotOptionsEnum.CHATBOT,
		);
		trackEvent("chatbot_option_selected", { option: page });
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
				trackEvent("chatbot_info_loaded", {
					success: true,
					botID: botID,
					status: res.result.chatbot_status,
				});
			})
			.catch(() => {
				hideLoader();
				trackEvent("chatbot_info_loaded", { success: false, botID: botID });
			});
	};

	const loadChatBotConfigData = () => {
		postRequest("/fetch_chatbot_interface", {
			botID: botID,
		})
			.then((res) => {
				trackEvent("chatbot_interface_loaded", {
					success: true,
					botID: botID,
					source: "chatbot_editor",
				});
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
				trackEvent("chatbot_interface_loaded", {
					success: false,
					botID: botID,
					source: "chatbot_editor",
				});
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

	useEffect(() => {
		async function fetchCredits() {
			if (
				selector == ChatBotOptionsEnum.CHATBOT &&
				chatbotData.status == URLStatus.Trained
			) {
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
	}, [selector, chatbotData.status]);

	function handleUpgradeClick() {
		// Redirect to upgrade page or any other action
		window.location.href = "/pricing";
	}

	return (
		<div className={styles.chatBotEditorContainer}>
			{nameEditing ? (
				<div className={styles.chatbotEditorTitleEditContainer}>
					<EditBoxComponent
						value={chatbotData.name}
						onChange={(val) => setChatbotData({ ...chatbotData, name: val })}
					/>
					<img
						src="/assets/save_icon.png"
						loading="lazy"
						onClick={() => {
							postRequest("/update_chatbot_name", {
								botID: chatbotData.id,
								chatBotName: chatbotData.name,
							})
								.then(() => {
									showSuccessToast("Name Updated");
									trackEvent("chatbot_name_update_success", {
										botID: chatbotData.id,
										name: chatbotData.name,
									});
									setNameEditing(false);
								})
								.catch(() => {
									showErrorToast("Error Updating Information");
									trackEvent("chatbot_name_update_failure", {
										botID: chatbotData.id,
									});
								});
						}}
					/>
				</div>
			) : (
				<div className={styles.chatbotEditorTitleContainer}>
					<h1>{chatbotData.name}</h1>
					<img
						src="/assets/edit_icon.png"
						loading="lazy"
						onClick={() => setNameEditing(true)}
					/>
				</div>
			)}

			<ChatBotOptionSelector
				botID={chatbotData.id}
				selector={selector}
				setSelector={setSelector}
			/>

			{selector === ChatBotOptionsEnum.CHATBOT &&
				chatbotData.status === "training" && (
					<>
						{trackScreenView("ChatBotTrainingScreen", "ChatBotEditorScreen")}
						<div className={styles.chatBotTrainingModelContainer}>
							<h2>Please Wait...</h2>
							<p>Training In Progress</p>
							<progress max="100"></progress>
							<p>
								Incase if it's taking too long, try to train chatbot again!{" "}
							</p>
						</div>
					</>
				)}

			{selector === ChatBotOptionsEnum.CHATBOT &&
				chatbotData.status === "untrained" && (
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
									Click the <strong>Train</strong> button to train the ChatBot
									on the provided data.
								</li>
							</ol>
						</div>
					</>
				)}

			{selector === ChatBotOptionsEnum.CHATBOT &&
				chatbotData.status === "trained" && (
					<>
						{trackScreenView("ChatBotTrainedScreen", "ChatBotEditorScreen")}

						<div className={styles.chatBottrainedModelContainer}>
							<p className={styles.last_trained}>
								Last Trained: {formatTimestamp(chatbotData.last_updated)}
							</p>
							<div className={styles.chatBotComponentContainer}>
								<ChatBotComponent botID={botID} config={config} />
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

			{selector === ChatBotOptionsEnum.SOURCES && (
				<>
					{trackScreenView("ChatbotSourceScreen", "ChatBotEditorScreen")}
					<ChatBotSourceEditor
						chatbotInfoData={chatbotData}
						setChatbotInfoData={setChatbotData}
					/>
				</>
			)}
			{selector === ChatBotOptionsEnum.SETTINGS && (
				<>
					{trackScreenView("ChatbotSettingsScreen", "ChatBotEditorScreen")}
					<ChatBotSettings data={chatbotData} setData={setChatbotData} />
				</>
			)}
			{selector === ChatBotOptionsEnum.EMBED && (
				<>
					{trackScreenView("ChatbotEmbedScreen", "ChatBotEditorScreen")}
					<EmbedComponent data={chatbotData} />
				</>
			)}
		</div>
	);
}

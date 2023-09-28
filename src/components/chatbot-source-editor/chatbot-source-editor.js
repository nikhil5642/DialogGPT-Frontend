import { useState, useEffect, useContext, use } from "react";

import styles from "./chatbot-source-editor.module.scss";
import {
	SourceOptionsEnum,
	SourceSelector,
} from "./chatbot-source-editor.utits";
import WebisteLoader from "./website-loader/website-loader";
import { postRequest } from "../../helper/http-helper";
import TextLoader from "./text-loader/text-loader";
import LoaderContext from "../loader/loader-context";
import LoadingButton from "../loading-button/loading-button";
import { useRouter } from "next/router";
import { ChatBotOptionsEnum } from "../chatbot-editor/chatbot-editor.utits";
import { useTrackEvent } from "../../helper/event-tracker";
import { URLStatus } from "./website-loader/website-loader.utils";
const initialData = {
	texts: { charLength: 0 },
	urls: { count: 0, charLength: 0 },
	files: { count: 0, charLength: 0 },
	qna: { count: 0, charLength: 0 },
};

export default function ChatBotSourceEditor({
	chatbotInfoData,
	setChatbotInfoData,
}) {
	const router = useRouter();
	const [selector, setSelector] = useState(SourceOptionsEnum.TEXT);
	const { showLoader, hideLoader } = useContext(LoaderContext);
	const [data, setData] = useState([]);
	const [trainingData, setTrainingData] = useState(initialData);
	const [totalChars, setTotalChars] = useState(0);
	const [trainingError, setTrainingError] = useState("");
	const { trackEvent, trackScreenView } = useTrackEvent();

	useEffect(() => {
		const pathWithoutQuery = router.asPath.split("?")[0];

		// Split the path to get the segments
		const segments = pathWithoutQuery.split("/");
		const lastSegment = segments[segments.length - 1];
		const secondLastSegment = segments[segments.length - 2];

		let result;

		if (
			Object.values(SourceOptionsEnum).includes(lastSegment) &&
			secondLastSegment === "sources"
		) {
			result = lastSegment;
		} else if (
			lastSegment === "sources" ||
			!Object.values(SourceOptionsEnum).includes(lastSegment)
		) {
			result = SourceOptionsEnum.TEXT; // default value
		}
		setSelector(result);
	}, []);

	const handleSelection = (item) => {
		setSelector(item); // Update internal state

		const newPath = `/chatbot/${chatbotInfoData.id}/sources/${item}`;
		router.push(newPath); // Update the URL
	};

	useEffect(() => {
		const handleBeforeUnload = (e) => {
			e.preventDefault();
			e.returnValue =
				"Are you sure you want to leave this page? Any unsaved changes will be lost.";
			trackEvent("chatbot-editor-before-unload");
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);
	useEffect(() => {
		const initialData = {
			texts: { charLength: 0 },
			urls: { count: 0, charLength: 0 },
			files: { count: 0, charLength: 0 },
			qna: { count: 0, charLength: 0 },
		};
		const updatedTrainingData = data.reduce((acc, curr) => {
			switch (curr.source_type) {
				case "text":
					acc.texts.charLength += curr.char_count;
					break;
				case "url":
					if (curr.status === URLStatus.Removing) break;
					acc.urls.count += 1;
					acc.urls.charLength += curr.char_count;
					break;
				case "files":
					acc.files.count += 1;
					acc.files.charLength += curr.char_count;
					break;
				case "qna":
					acc.qna.count += 1;
					acc.qna.charLength += curr.char_count;
					break;
				default:
					break;
			}
			return acc;
		}, initialData);
		setTrainingData(updatedTrainingData);
	}, [data]);

	useEffect(() => {
		const charCount =
			trainingData.texts.charLength +
			trainingData.urls.charLength +
			trainingData.qna.charLength +
			trainingData.files.charLength;
		setTotalChars(charCount);
		if (charCount > 1000) {
			setTrainingError("");
		}
	}, [trainingData]);

	const trainChatBot = () => {
		if (totalChars < 1000) {
			setTrainingError("***Minimum 1000 characters required to train");
			return;
		}
		router.push(
			{
				pathname: router.pathname,
				query: { ...router.query, page: ChatBotOptionsEnum.CHATBOT },
			},
			undefined,
			{ shallow: true },
		);
		showLoader("Training Chatbot...");
		setChatbotInfoData({ ...chatbotInfoData, status: "training" });
		postRequest("/train_chatbot", { botID: chatbotInfoData.id, data: data })
			.then(() => {
				trackEvent("chatbot-editor-train", { botID: chatbotInfoData.id });
				hideLoader();
				router
					.push(
						{
							pathname: router.pathname,
							query: { ...router.query, page: ChatBotOptionsEnum.CHATBOT },
						},
						undefined,
						{ shallow: true },
					)
					.then(() => {
						window.scrollTo(0, 0);
					});
			})
			.catch(() => {
				trackEvent("chatbot-editor-train-failed", {
					botID: chatbotInfoData.id,
				});
				hideLoader();
			});
	};
	const loadChatBotData = () => {
		if (chatbotInfoData.id) {
			showLoader("Loading Content");
			postRequest("/load_chatbot_content", { botID: chatbotInfoData.id })
				.then((res) => {
					hideLoader();
					trackEvent("chatbot-editor-load-content-success");
					setData(res.result);
				})
				.catch(() => {
					trackEvent("chatbot-editor-load-content-failed");
					hideLoader();
				});
		}
	};

	useEffect(() => {
		if (chatbotInfoData.id) {
			loadChatBotData();
		}
	}, [chatbotInfoData.id]);

	return (
		<div className={styles.chatBotEditorContainer}>
			<SourceSelector selector={selector} handleSelection={handleSelection} />

			{selector === SourceOptionsEnum.FILE && (
				<>
					{trackScreenView("ChatbotFileEditorScreen", "ChatBotEditorScreen")}
					<div>Files View</div>
				</>
			)}
			{selector === SourceOptionsEnum.TEXT && (
				<>
					{trackScreenView("ChatbotTextEditorScreen", "ChatBotEditorScreen")}
					<TextLoader
						bot_id={chatbotInfoData.id}
						data={data}
						setData={setData}
					></TextLoader>
				</>
			)}
			{selector === SourceOptionsEnum.URL && (
				<>
					{trackScreenView("ChatbotWebsiteEditorScreen", "ChatBotEditorScreen")}
					<WebisteLoader
						bot_id={chatbotInfoData.id}
						data={data}
						setData={setData}
					/>
				</>
			)}
			{selector === SourceOptionsEnum.QNA && (
				<>
					{trackScreenView("ChatbotQNAEditorScreen", "ChatBotEditorScreen")}
					<div>Q&A View</div>
				</>
			)}

			<div className={styles.trainingContainer}>
				<h4>Included Sources:</h4>

				{trainingData.texts.charLength > 0 && (
					<p> {trainingData.texts.charLength} Character Texts</p>
				)}

				{trainingData.urls.count > 0 && (
					<p>
						{trainingData.urls.count} URLs | {trainingData.urls.charLength}
						Characters
					</p>
				)}

				{trainingData.files.count > 0 && (
					<p>
						{trainingData.files.count} Files | {trainingData.files.charLength}
						Characters
					</p>
				)}

				{trainingData.qna.count > 0 && (
					<p>
						{trainingData.qna.count} QnA | {trainingData.qna.charLength}
						Characters
					</p>
				)}
				<h5>
					Total Detected Characters: <span>{totalChars}</span>
				</h5>
				<div className={styles.trainButtonContainer}>
					<LoadingButton
						title={"Train ChatBot"}
						onClick={trainChatBot}
					></LoadingButton>
				</div>
				{trainingError && (
					<p className={styles.trainingError}>{trainingError}</p>
				)}
			</div>
		</div>
	);
}

import { useState, useEffect, useContext } from "react";
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

const initialData = {
	texts: { charLength: 0 },
	urls: { count: 0, charLength: 0 },
	files: { count: 0, charLength: 0 },
	qna: { count: 0, charLength: 0 },
};

export default function ChatBotSourceEditor({ botID }) {
	const { showLoader, hideLoader } = useContext(LoaderContext);
	const [data, setData] = useState([]);
	const [trainingData, setTrainingData] = useState(initialData);

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

	const trainChatBot = () => {
		showLoader("Training Chatbot...");
		postRequest("/train_chatbot", { botID: botID, data: data })
			.then(() => {
				hideLoader();
			})
			.catch(() => {
				hideLoader();
			});
	};
	const loadChatBotData = () => {
		if (botID) {
			showLoader("Loading Content");
			postRequest("/load_chatbot_content", { botID: botID })
				.then((res) => {
					hideLoader();
					setData(res.result);
				})
				.catch(() => {
					hideLoader();
				});
		}
	};

	useEffect(() => {
		if (botID) {
			loadChatBotData();
		}
	}, [botID]);

	const [selector, setSelector] = useState(SourceOptionsEnum.TEXT);

	return (
		<div className={styles.chatBotEditorContainer}>
			<SourceSelector selector={selector} setSelector={setSelector} />

			{selector === SourceOptionsEnum.FILE && <div>Files View</div>}
			{selector === SourceOptionsEnum.TEXT && (
				<TextLoader bot_id={botID} data={data} setData={setData}></TextLoader>
			)}
			{selector === SourceOptionsEnum.URL && (
				<WebisteLoader bot_id={botID} data={data} setData={setData} />
			)}
			{selector === SourceOptionsEnum.QNA && <div>Q&A View</div>}

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
					Total Detected Characters:{" "}
					<span>
						{trainingData.texts.charLength +
							trainingData.urls.charLength +
							trainingData.qna.charLength +
							trainingData.files.charLength}
					</span>
				</h5>
				<div className={styles.trainButtonContainer}>
					<LoadingButton
						title={"Train ChatBot"}
						onClick={trainChatBot}
					></LoadingButton>
				</div>
			</div>
		</div>
	);
}

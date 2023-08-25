import { useState, useEffect } from "react";
import styles from "./chatbot-source-editor.module.scss";
import { useRouter } from "next/router";
import {
	SourceOptionsEnum,
	SourceSelector,
} from "./chatbot-source-editor.utits";
import WebisteLoader from "./website-loader/website-loader";
import { postRequest } from "../../helper/http-helper";
import TextLoader from "./text-loader/text-loader";

export default function ChatBotSourceEditor({ botID }) {
	const trainChatBot = () => {
		postRequest("/train_chatbot", { botID: botID, data: data });
	};
	const [data, setData] = useState([]);
	const loadChatBotData = () => {
		if (botID) {
			postRequest("/load_chatbot_content", { botID: botID }).then((res) =>
				setData(res.result),
			);
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

			<button className={styles.button} onClick={trainChatBot}>
				Train ChatBot
			</button>
		</div>
	);
}

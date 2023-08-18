import { useState } from "react";
import styles from "./chatbot-source-editor.module.scss";
import { useRouter } from "next/router";
import {
	SourceOptionsEnum,
	SourceSelector,
} from "./chatbot-source-editor.utits";
import WebisteLoader from "./website-loader/website-loader";

export default function ChatBotSourceEditor() {
	const router = useRouter();
	const createNewChatBot = () => {
		router.push("/create-new-chatbot");
	};
	const [data, setData] = useState({
		files: [],
		texts: [],
		urls: [],
		qna: [],
	});

	const [selector, setSelector] = useState(SourceOptionsEnum.URLS);

	return (
		<div className={styles.chatBotEditorContainer}>
			<h1 className={styles.chatbotEditorTitleHeading}>Data Sources</h1>

			<SourceSelector selector={selector} setSelector={setSelector} />

			{selector === SourceOptionsEnum.FILES && <div>Files View</div>}
			{selector === SourceOptionsEnum.TEXTS && <div>Texts View</div>}
			{selector === SourceOptionsEnum.URLS && (
				<WebisteLoader bot_id={"abc"} data={data} setData={setData} />
			)}
			{selector === SourceOptionsEnum.QNA && <div>Q&A View</div>}

			<button className={styles.button} onClick={createNewChatBot}>
				Create ChatBot
			</button>
		</div>
	);
}

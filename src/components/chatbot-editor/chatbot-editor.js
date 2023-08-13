import { useState } from "react";
import styles from "./chatbot-editor.module.scss";
import { useRouter } from "next/router";
import {
	SourceOptionsEnum,
	SourceSelector,
} from "./chatbot-editor-source.utits";

export default function ChatBotEditor() {
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

	const [selector, setSelector] = useState("files");

	return (
		<div className={styles.chatBotEditorContainer}>
			<h1 className={styles.chatbotEditorTitleHeading}>Data Sources</h1>

			<SourceSelector selector={selector} setSelector={setSelector} />

			{selector === SourceOptionsEnum.FILES && <div>Files View</div>}
			{selector === SourceOptionsEnum.TEXTS && <div>Texts View</div>}
			{selector === SourceOptionsEnum.URLS && <div>URLs View</div>}
			{selector === SourceOptionsEnum.QNA && <div>Q&A View</div>}

			<button className={styles.button} onClick={createNewChatBot}>
				Create ChatBot
			</button>
		</div>
	);
}

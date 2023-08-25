import styles from "./text-loader.module.scss";
import { useState, useEffect } from "react";
import { postRequest } from "../../../helper/http-helper";

export default function TextLoader({ bot_id, data, setData }) {
	const [text, setText] = useState("");

	useEffect(() => {
		if (text == "") {
			const item = data.find((item) => item.source_type == "text");
			if (item) {
				postRequest("/load_content", { contentID: item.content_id }, {}, 1000)
					.then((res) => {
						setText(res.result);
					})
					.catch(() => {});
			}
		}
	}, [data]);

	const saveText = () => {
		postRequest("/save_text", { text: text, botID: bot_id }, {}, 1000)
			.then((res) => {
				if (!data.find((item) => item.source_type === "text")) {
					setData([...data, res.result]);
				}
			})
			.catch(() => {});
	};

	return (
		<div className={styles.container}>
			<textarea
				rows={15}
				placeholder="Type a message..."
				value={text}
				onChange={(e) => setText(e.target.value)}
				className={styles.inputTextArea}
			></textarea>
			<button className={styles.buttonFetchLinks} onClick={saveText}>
				Save Text
			</button>
		</div>
	);
}

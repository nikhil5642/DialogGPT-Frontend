import styles from "./text-loader.module.scss";
import { useState, useEffect, useContext } from "react";
import { postRequest } from "../../../helper/http-helper";
import LoaderContext from "../../loader/loader-context";

export default function TextLoader({ bot_id, data, setData }) {
	const [text, setText] = useState("");
	const { showLoader, hideLoader } = useContext(LoaderContext);
	useEffect(() => {
		if (text == "") {
			const item = data.find((item) => item.source_type == "text");
			if (item) {
				showLoader("Loading Content...");
				postRequest("/load_content", { contentID: item.content_id }, {}, 1000)
					.then((res) => {
						hideLoader();
						setText(res.result);
					})
					.catch(() => {
						hideLoader();
					});
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

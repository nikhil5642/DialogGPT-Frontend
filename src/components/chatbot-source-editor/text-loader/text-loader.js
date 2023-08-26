import styles from "./text-loader.module.scss";
import { useState, useEffect, useContext } from "react";
import { postRequest } from "../../../helper/http-helper";
import LoaderContext from "../../loader/loader-context";
import LoadingButton from "src/components/loading-button/loading-button";
import { showErrorToast, showSuccessToast } from "src/helper/toast-helper";

export default function TextLoader({ bot_id, data, setData }) {
	const [text, setText] = useState("");
	const { showLoader, hideLoader } = useContext(LoaderContext);
	const [loader, setLoader] = useState({
		texts: false,
	});
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
		setLoader((val) => ({ ...val, texts: true }));
		postRequest("/save_text", { text: text, botID: bot_id }, {}, 1000)
			.then((res) => {
				if (!data.find((item) => item.source_type === "text")) {
					setData([...data, res.result]);
				} else {
					const updatedData = data.map((item) => {
						if (item.source_type === "text") {
							return {
								...item,
								char_count: text.length,
							};
						}
						return item;
					});
					setData(updatedData);
				}
				setLoader((val) => ({ ...val, texts: false }));
				showSuccessToast("Saved");
			})
			.catch(() => {
				setLoader((val) => ({ ...val, texts: false }));
				showErrorToast("Error Saving");
			});
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

			<div className={styles.buttonSaveText}>
				<LoadingButton
					title={"Save Text"}
					onClick={saveText}
					isLoading={loader.texts}
				/>
			</div>
		</div>
	);
}

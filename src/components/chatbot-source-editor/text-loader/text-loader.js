import styles from "./text-loader.module.scss";
import { useState, useEffect, useContext } from "react";
import { postRequest } from "../../../helper/http-helper";
import LoaderContext from "../../loader/loader-context";
import LoadingButton from "src/components/loading-button/loading-button";
import { showErrorToast, showSuccessToast } from "src/helper/toast-helper";
import { useTrackEvent } from "src/helper/event-tracker";
import TrainComponent from "../train-component/train-component";
export default function TextLoader({
	bot_id,
	data,
	setData,
	chatbotInfoData,
	setChatbotInfoData,
}) {
	const { trackEvent } = useTrackEvent();
	const [text, setText] = useState("");
	const { showLoader, hideLoader } = useContext(LoaderContext);
	const [loader, setLoader] = useState(false);
	useEffect(() => {
		if (text == "") {
			const item = data.find((item) => item.source_type == "text");
			if (item) {
				showLoader("Loading Content...");
				postRequest("/load_content", { contentID: item.content_id }, {}, 1000)
					.then((res) => {
						hideLoader();
						setText(res.result);
						trackEvent("text_loaded", { botID: bot_id });
					})
					.catch(() => {
						hideLoader();
						trackEvent("text_load_failure", { botID: bot_id });
					});
			}
		}
	}, [data]);

	const saveText = () => {
		setLoader(true);
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
				trackEvent("text_saved", { botID: bot_id, text: text });
				setLoader(false);
				showSuccessToast("Saved");
			})
			.catch(() => {
				setLoader(false);
				showErrorToast("Error Saving");
				trackEvent("text_save_failure", { botID: bot_id });
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
					isLoading={loader}
				/>
			</div>
			<div className={styles.trainComponentContainer}>
				<TrainComponent
					data={data}
					chatbotInfoData={chatbotInfoData}
					setChatbotInfoData={setChatbotInfoData}
				/>
			</div>
		</div>
	);
}

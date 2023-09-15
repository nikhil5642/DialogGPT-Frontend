import React, { useEffect, useState } from "react";
import { postRequest } from "../../../helper/http-helper";
import styles from "./model-settings.module.scss";
import SettingsComponent from "../../settings-component/settings-component";
import { showErrorToast, showSuccessToast } from "../../../helper/toast-helper";
import { GPTModel } from "./model-settings.utils";
import { useTrackEvent } from "../../../helper/event-tracker";
export default function ModelSettings({ chatbotID }) {
	const { trackEvent } = useTrackEvent();
	const [loader, setLoader] = useState(false);
	const [data, setData] = useState({
		botID: chatbotID,
		prompt: "",
		basePrompt: "",
		model: GPTModel.GPT_3_5_turbo,
		temperature: 0,
	});
	useEffect(() => {
		if (chatbotID) {
			setData({ ...data, botID: chatbotID });
			postRequest("/fetch_chatbot_model", {
				botID: chatbotID,
			})
				.then((res) => {
					setLoader(false);
					setData((prev) => {
						return {
							...prev,
							prompt: res.result.prompt,
							basePrompt: res.result.base_prompt,
							model: res.result.model_version,
							temperature: res.result.temperature,
						};
					});
					trackEvent("model_settings_update_success", data);
				})
				.catch(() => {
					setLoader(false);
					showErrorToast("Error Updating Information");
					trackEvent("model_settings_update_failure");
				});
		}
	}, [chatbotID]);

	return (
		<SettingsComponent
			title={"Model"}
			isLoading={loader}
			content={
				<div className={styles.modelContainer}>
					<h5>Base Prompt</h5>
					<textarea
						rows="8"
						type="text"
						value={data.prompt}
						onChange={(e) => {
							setData({ ...data, prompt: e.target.value });
						}}
						placeholder={"Prompt Can't be empty"}
					/>
					<p>
						The base prompt lets you adjust the chatbot's character. Fine-tune
						it to fit your specific needs.
					</p>
					<br></br>
					<h5>Model</h5>
					<select
						value={data.model}
						onChange={(e) => {
							setData({ ...data, model: e.target.value });
						}}
						className={styles.selectStyles}
					>
						<option value={GPTModel.GPT_3_5_turbo}>
							{GPTModel.GPT_3_5_turbo}
						</option>
						<option value={GPTModel.GPT_4}>{GPTModel.GPT_4}</option>
					</select>
					<p>
						GPT-4 is more accurate but slower and 20x costlier than
						GPT-3.5-turbo.
					</p>
					<br></br>
					<h5>Temperature</h5>
					<p>{data.temperature}</p>
					<input
						type="range"
						min="0"
						max="1"
						step="0.1"
						className={styles.temperatureSlider}
						value={data.temperature}
						onChange={(e) => {
							setData({ ...data, temperature: e.target.value });
						}}
					/>
					<div className={styles.temperatureSliderLabels}>
						<p>Reserved</p> <p>Creative</p>
					</div>
				</div>
			}
			onSave={() => {
				setLoader(true);
				postRequest("/update_chatbot_model", {
					botID: data.botID,
					prompt: data.prompt,
					modelVersion: data.model,
					temperature: data.temperature,
				})
					.then(() => {
						setLoader(false);
						showSuccessToast("Information Updated Successfully");
					})
					.catch(() => {
						setLoader(false);
						showErrorToast("Error Updating Information");
					});
			}}
		/>
	);
}

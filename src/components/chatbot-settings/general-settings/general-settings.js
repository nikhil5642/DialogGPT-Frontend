import React, { useState } from "react";
import { postRequest } from "../../../helper/http-helper";
import styles from "./general-settings.module.scss";
import SettingsComponent from "../../settings-component/settings-component";
import { showErrorToast, showSuccessToast } from "../../../helper/toast-helper";
import { useTrackEvent } from "../../../helper/event-tracker";
import { formatTimestamp } from "../../../helper/utils";

export default function GeneralSettings({ data, setData }) {
	const [loader, setLoader] = useState(false);
	const { trackEvent } = useTrackEvent();
	return (
		<SettingsComponent
			title={"General"}
			isLoading={loader}
			content={
				<div className={styles.generalContainer}>
					<h5>Chatbot ID</h5>
					<p>{data.id}</p>
					<h5>Last Trained</h5>
					<p>{formatTimestamp(data.last_updated)}</p>
					<h5>Name</h5>
					<textarea
						rows="1"
						type="text"
						value={data.name}
						onChange={(e) => {
							setData({ ...data, name: e.target.value });
						}}
						placeholder={"Name Can't be empty"}
					/>
				</div>
			}
			onSave={() => {
				setLoader(true);
				postRequest("/update_chatbot_name", {
					botID: data.id,
					chatBotName: data.name,
				})
					.then(() => {
						setLoader(false);
						showSuccessToast("Information Updated Successfully");
						trackEvent("chatbot_name_update_success", {
							botID: data.id,
							name: data.name,
						});
					})
					.catch(() => {
						setLoader(false);
						showErrorToast("Error Updating Information");
						trackEvent("chatbot_name_update_failure", { botID: data.id });
					});
			}}
		/>
	);
}

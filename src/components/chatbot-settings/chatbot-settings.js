import React, { useState, useEffect, useRef } from "react";
import { postRequest } from "../../helper/http-helper";
import styles from "./chatbot-settings.module.scss";
import SettingsComponent from "../settings-component/settings-component";
export default function ChatBotSettings({ data, setData }) {
	return (
		<div className={styles.settingsContainer}>
			<SettingsComponent
				title={"General"}
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
					postRequest("/update_chatbot_name", {
						botID: data.id,
						chatBotName: data.name,
					})
						.then(() => {})
						.catch(() => {});
				}}
			/>
		</div>
	);
}

function formatTimestamp(timestamp) {
	const date = new Date(timestamp);

	// Extracting date components
	const options = {
		month: "short",
		day: "numeric",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		timeZoneName: "short",
	};
	const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

	// Extracting the timezone offset
	const offset = date.getTimezoneOffset();
	const absoluteOffset = Math.abs(offset);
	return formattedDate;
}

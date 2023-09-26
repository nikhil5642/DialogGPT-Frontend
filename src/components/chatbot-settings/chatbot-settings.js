import React, { useState } from "react";
import styles from "./chatbot-settings.module.scss";
import GeneralSettings from "./general-settings/general-settings";
import ModelSettings from "./model-settings/model-settings";
import ChatInterfaceSettings from "./chat-interface-settings/chat-interface-settings";
import LoadingButton from "../loading-button/loading-button";
import DanzerSettings from "./danzer-settings/danzer-settings";
export default function ChatBotSettings({ data, setData }) {
	return (
		<div className={styles.settingsContainer}>
			<GeneralSettings data={data} setData={setData} />
			<br></br>
			<br></br>
			<ModelSettings chatbotID={data.id} />
			<br></br>
			<br></br>
			<ChatInterfaceSettings botID={data.id} />
			<br></br>
			<br></br>
			<DanzerSettings botID={data.id} />
		</div>
	);
}

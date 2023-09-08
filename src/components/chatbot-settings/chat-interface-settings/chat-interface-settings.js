import React, { useState } from "react";
import { postRequest } from "../../../helper/http-helper";
import styles from "./chat-interface-settings.module.scss";
import SettingsComponent from "../../settings-component/settings-component";
import { showErrorToast, showSuccessToast } from "../../../helper/toast-helper";
import { ChatTheme } from "./chat-interface-settings.utils";
import ImageChooseComponent from "../../image-choose-component/image-choose-component";
import ChatBotComponent from "../../chatbot-component/chatbot-component";

export default function ChatInterfaceSettings({ botID }) {
	const [loader, setLoader] = useState(false);
	const [data, setData] = useState({
		botID: botID,
		initialMessage: "",
		quickPrompts: "",
		theme: ChatTheme.LIGHT,
		profilePicture: null,
		displayName: "",
		chatIcon: null,
	});
	return (
		<SettingsComponent
			title={"Chat Interface"}
			isLoading={loader}
			content={
				<div className={styles.chatInterfaceContainer}>
					<div className={styles.chatInterfaceEditorContainer}>
						<h5>Initial Message</h5>
						<textarea
							rows="2"
							type="text"
							value={data.prompt}
							onChange={(e) => {
								setData({ ...data, prompt: e.target.value });
							}}
							placeholder={"Hi! What can I help you with?"}
						/>
						<p>Enter each message in a new line.</p>
						<br></br>
						<h5>Quick Promts</h5>
						<textarea
							rows="2"
							type="text"
							value={data.quickPrompts}
							onChange={(e) => {
								setData({ ...data, quickPrompts: e.target.value });
							}}
							placeholder={"What is example.com?"}
						/>
						<p>Enter each prompt in a new line.</p>
						<br></br>
						<h5>Theme</h5>
						<select
							value={data.theme}
							onChange={(e) => {
								setData({ ...data, theme: e.target.value });
							}}
							className={styles.selectStyles}
						>
							<option value={ChatTheme.LIGHT}>{ChatTheme.LIGHT}</option>
							<option value={ChatTheme.DARK}>{ChatTheme.DARK}</option>
						</select>
						<br></br>
						<br></br>
						<h5>ChatBot Profile Picture</h5>
						<ImageChooseComponent
							onImageSelect={(img) => setData({ ...data, profilePicture: img })}
						/>
						<br></br>
						<h5>Dispaly Name</h5>
						<textarea
							rows="1"
							type="text"
							value={data.displayName}
							onChange={(e) => {
								setData({ ...data, displayName: e.target.value });
							}}
							placeholder={""}
						/>
						<br></br>
						<br></br>
						<h5>Chat Icon</h5>
						<ImageChooseComponent
							onImageSelect={(img) => setData({ ...data, chatIcon: img })}
						/>
					</div>
					<div className={styles.chatBotContainer}>
						<ChatBotComponent botID={botID} />
					</div>
				</div>
			}
			onSave={() => {
				setLoader(true);
				postRequest("/update_chatbot_model_settings", data)
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

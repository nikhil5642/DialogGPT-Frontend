import React, { useEffect, useState } from "react";
import { postRequest } from "../../../helper/http-helper";
import styles from "./chat-interface-settings.module.scss";
import SettingsComponent from "../../settings-component/settings-component";
import { showErrorToast, showSuccessToast } from "../../../helper/toast-helper";
import { chatInit } from "./chat-interface-settings.utils";
import ImageChooseComponent from "../../image-choose-component/image-choose-component";
import ChatBotComponent from "../../chatbot-component/chatbot-component";
import ColorPickerComponent from "../../colour-picker-component/colour-picker-component";
import { ChatBotSource } from "../../chatbot-component/chatbot-component.utils";

export default function ChatInterfaceSettings({ botID }) {
	const [loader, setLoader] = useState(false);
	const [data, setData] = useState(chatInit(botID, ChatBotSource.SETTINGS));

	useEffect(() => {
		if (botID) {
			setData({ ...data, botID: botID });
			postRequest("/fetch_chatbot_interface", {
				botID: botID,
			})
				.then((res) => {
					setLoader(false);
					setData((prev) => {
						return {
							...prev,
							initialMessage: res.result.initial_message,
							quickPrompts: res.result.quick_prompts,
							theme: res.result.theme,
							profilePicture: res.result.profile_picture,
							userMsgColor: res.result.user_msg_color,
							displayName: res.result.display_name,
							chatIcon: res.result.chat_icon,
							chatBubbleColor: res.result.chat_bubble_color,
						};
					});
				})
				.catch(() => {
					setLoader(false);
					showErrorToast("Error Loading Information");
				});
		}
	}, [botID]);
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
							value={data.initialMessage}
							onChange={(e) => {
								setData({ ...data, initialMessage: e.target.value });
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

						{/* TODO:Themes will be added later*/}
						{/* <br></br>
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
						<br></br> */}
						<br></br>
						<h5>ChatBot Profile Picture</h5>
						<div className={styles.imagePicker}>
							<ImageChooseComponent
								currentImage={data.profilePicture}
								onImageSelect={(img) =>
									setData({ ...data, profilePicture: img })
								}
							/>
						</div>

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
						<h5>User Message Colour</h5>
						<div className={styles.colourPicker}>
							<ColorPickerComponent
								color={data.userMsgColor}
								setColor={(color) => setData({ ...data, userMsgColor: color })}
							/>
						</div>
						<br></br>
						<h5>Chat Icon</h5>
						<div className={styles.imagePicker}>
							<ImageChooseComponent
								currentImage={data.chatIcon}
								onImageSelect={(img) => setData({ ...data, chatIcon: img })}
							/>
						</div>
						<br></br>
						<h5>Chat Bubble Colour</h5>
						<div className={styles.colourPicker}>
							<ColorPickerComponent
								color={data.chatBubbleColor}
								setColor={(color) =>
									setData({ ...data, chatBubbleColor: color })
								}
							/>
						</div>
					</div>
					<div>
						<div className={styles.chatBotContainer}>
							<ChatBotComponent config={data} />
						</div>
						<div
							className={styles.chatBubble}
							style={{
								backgroundColor: data.chatIcon
									? "transparent"
									: data.chatBubbleColor,
							}}
						>
							{data.chatIcon ? (
								<img src={data.chatIcon} className={styles.chatImg} />
							) : (
								<img
									src="/assets/chat_icon.png"
									className={styles.chatImgDefault}
								/>
							)}
						</div>
					</div>
				</div>
			}
			onSave={() => {
				setLoader(true);
				postRequest("/update_chatbot_interface", data)
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

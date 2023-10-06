import React, { useState } from "react";
import { postRequest } from "../../../helper/http-helper";
import styles from "./danger-settings.module.scss";
import { showErrorToast, showSuccessToast } from "../../../helper/toast-helper";
import LoadingButton from "src/components/loading-button/loading-button";

export default function DangerSettings({ botID }) {
	const onDeleteChatbot = () => {
		if (window.confirm("Are you sure you want to delete this chatbot?")) {
			setLoader((prev) => {
				return { ...prev, deleteChatbot: true };
			});

			postRequest("/delete_chatbot", { botID: botID })
				.then((res) => {
					setLoader((prev) => {
						return { ...prev, deleteChatbot: false };
					});

					if (res.success) {
						showSuccessToast("Chatbot deleted successfully");
						window.location.href = `/my-chatbots`;
					} else {
						showErrorToast(res.error);
					}
				})
				.catch(() => {});
		}
	};

	const [loader, setLoader] = useState({
		deleteChatbot: false,
	});
	return (
		<div className={styles.settingsContainer}>
			<div className={styles.settingsTitle}>Danger Zone</div>
			<div className={styles.settingsContent}>
				<div className={styles.dangerItemContainer}>
					<p>Delete this Chatbot? </p>
					<div className={styles.dangerButton}>
						<LoadingButton
							title={"Delete Chatbot"}
							onClick={onDeleteChatbot}
							loading={loader.deleteChatbot}
						></LoadingButton>
					</div>
				</div>
			</div>
		</div>
	);
}

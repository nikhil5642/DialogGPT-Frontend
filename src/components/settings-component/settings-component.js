import React from "react";
import styles from "./settings-component.module.scss";
import LoadingButton from "../loading-button/loading-button";

export default function SettingsComponent({
	title,
	content,
	onSave,
	isLoading,
}) {
	return (
		<div className={styles.settingsContainer}>
			<div className={styles.settingsTitle}>{title}</div>

			<div className={styles.settingsContent}>{content}</div>
			<div className={styles.settingsFooter}>
				<LoadingButton title={"Save"} onClick={onSave} isLoading={isLoading} />
			</div>
		</div>
	);
}

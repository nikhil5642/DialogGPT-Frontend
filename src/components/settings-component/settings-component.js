import React from "react";
import styles from "./settings-component.module.scss";

export default function SettingsComponent({ title, content, onSave }) {
	return (
		<div className={styles.settingsContainer}>
			<div className={styles.settingsTitle}>{title}</div>

			<div className={styles.settingsContent}>{content}</div>
			<div className={styles.settingsFooter}>
				<button className={styles.saveButton} onClick={onSave}>
					Save
				</button>
			</div>
		</div>
	);
}

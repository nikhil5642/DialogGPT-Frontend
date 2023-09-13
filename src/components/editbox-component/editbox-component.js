import React, { useState } from "react";
import styles from "./editbox-component.module.scss";
import validator from "validator";

const EditBoxComponent = ({ placeholder, value, onChange }) => {
	const [error, setError] = useState(invalidURLError(value));
	const handleInputChange = (event) => {
		const newValue = event.target.value;
		onChange(newValue);
		setError(invalidURLError(newValue));
	};
	const textareaClass = error
		? `${styles.inputTextArea} ${styles.error}`
		: styles.inputTextArea;
	return (
		<div className={styles.container}>
			<textarea
				rows="1"
				className={textareaClass}
				type="text"
				value={value}
				onChange={handleInputChange}
				placeholder={placeholder} // Add placeholder
			/>
			{error && <div>{error}</div>}
		</div>
	);
};

export default EditBoxComponent;

function invalidURLError(url) {
	if (!url.trim()) {
		return "";
	} else {
		return isValidUrl(url) ? "" : "Invalid Url";
	}
}

function isValidUrl(url) {
	return validator.isURL(url);
}

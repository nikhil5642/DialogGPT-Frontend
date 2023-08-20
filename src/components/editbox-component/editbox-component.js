import React, { useState } from "react";
import styles from "./editbox-component.module.scss";

const EditBoxComponent = ({ placeholder, value, onChange }) => {
	const [error, setError] = useState(invalidURLError(value));
	const handleInputChange = (event) => {
		const newValue = event.target.value;
		onChange(newValue);
		setError(invalidURLError(newValue));
	};
	const inputStyles = {
		borderColor: error ? "red" : "initial", // Change border color on error
	};

	return (
		<div className={styles.container}>
			<textarea
				rows="1"
				className={styles.inputTextArea}
				type="text"
				value={value}
				onChange={handleInputChange}
				style={inputStyles} // Apply inputStyles
				placeholder={placeholder} // Add placeholder
			/>
			{error && <div style={{ color: "red" }}>{error}</div>}
		</div>
	);
};

export default EditBoxComponent;

function invalidURLError(url) {
	if (!url.trim()) {
		return "";
	} else {
		isValidUrl(url) ? "" : "Invalid Url";
	}
}

function isValidUrl(url) {
	const pattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
	return pattern.test(url);
}

import React, { useState } from "react";
import styles from "./editbox-component.module.scss";

const EditBoxComponent = ({ placeholder, value, onChange }) => {
	return (
		<textarea
			rows="1"
			className={styles.inputTextArea}
			type="text"
			value={value}
			onChange={(event) => onChange(event.target.value)}
			placeholder={placeholder}
		/>
	);
};

export default EditBoxComponent;

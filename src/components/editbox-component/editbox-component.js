import React, { useState } from "react";
import styles from "./editbox-component.module.scss";

const EditBoxComponent = ({ placeholder, value, onChange, error }) => {
	const handleInputChange = (event) => {
		onChange(event.target.value);
	};
	const inputStyles = {
		borderColor: error ? "red" : "initial", // Change border color on error
	};

	return (
		<div>
			<input
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

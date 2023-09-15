import React, { useState } from "react";
import styles from "./selection-component.module.scss"; // Import your CSS module

const SelectionComponent = ({ text, isSelected, onClick }) => {
	const containerStyles = `${styles.selectionContainer} ${
		isSelected ? styles.selected : ""
	}`;

	return (
		<div className={containerStyles} onClick={onClick}>
			{text}
		</div>
	);
};

export default SelectionComponent;

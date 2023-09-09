import React, { useState, useRef, useEffect } from "react";
import styles from "./color-picker-component.module.scss";

function ColorPickerComponent({ color, setColor }) {
	const inputRef = useRef(null);

	const handleBoxClick = () => {
		if (inputRef.current) {
			inputRef.current.click(); // trigger the input click
		}
	};

	const handleColorChange = (event) => {
		setColor(event.target.value);
	};

	return (
		<div className={styles["color-picker-container"]}>
			<div
				className={styles["color-box"]}
				style={{ backgroundColor: color }}
				onClick={handleBoxClick}
			/>
			<input
				ref={inputRef}
				type="color"
				value={color}
				onChange={handleColorChange}
				className={styles["color-input"]}
			/>
		</div>
	);
}

export default ColorPickerComponent;

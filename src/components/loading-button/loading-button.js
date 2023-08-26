import styles from "./loading-button.module.scss";
import React, { useState, useCallback } from "react";

function LoadingButton({ title, isLoading, onClick }) {
	const [lastClicked, setLastClicked] = useState(0);

	const debouncedOnClick = useCallback(
		(e) => {
			const now = Date.now();
			if (now - lastClicked < 1000) {
				// 500ms debounce time
				return;
			}
			setLastClicked(now);
			if (onClick) {
				onClick(e);
			}
		},
		[lastClicked, onClick],
	);
	return (
		<button
			className={styles.elegantButton}
			onClick={debouncedOnClick}
			disabled={isLoading}
		>
			{isLoading ? <div className={styles.spinner} /> : title}
		</button>
	);
}

export default LoadingButton;

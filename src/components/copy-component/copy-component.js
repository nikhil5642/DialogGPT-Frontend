import React from "react";
import styles from "./copy-component.module.scss";
import { useState } from "react";

function CopyComponent({ title, content, buttonText }) {
	const [copied, setCopied] = useState(false);

	const handleCopyClick = () => {
		navigator.clipboard.writeText(content).then(() => {
			setCopied(true);

			setTimeout(() => {
				setCopied(false);
			}, 3000);
		});
	};

	return (
		<div className={styles.container}>
			<p className={styles.title}>{title}</p>
			<div className={styles.content}>
				<pre>{content}</pre>
			</div>
			<button className={styles.copyButton} onClick={handleCopyClick}>
				<p>{buttonText}</p>{" "}
				<img
					src={copied ? "/assets/tick.png" : "/assets/copy.png"}
					alt={copied ? "copied" : "copy"}
				/>
			</button>
		</div>
	);
}

export default CopyComponent;

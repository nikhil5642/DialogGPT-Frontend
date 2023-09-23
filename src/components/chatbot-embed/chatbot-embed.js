import React, { useState, useEffect, useRef } from "react";
import styles from "./chatbot-embed.module.scss";
import CopyComponent from "../copy-component/copy-component";
export default function EmbedComponent({ data }) {
	const iframeContent = `<iframe
src="https://www.dialoggpt.io/iframe/${data.id}"
width="100%"
style="height: 100%; min-height: 600px"
frameBorder="0">
</iframe>
`;
	const scriptContent = `<script
src="https://www.dialoggpt.io/embed-chatbot.js"
id="${data.id}"
defer>
</script>`;
	return (
		<div className={styles.settingsContainer}>
			<CopyComponent
				title={
					"To embed the chatbot on your site, insert this iframe into your HTML."
				}
				content={iframeContent}
				buttonText={"Copy Iframe"}
			/>
			<br></br>
			<h3>OR</h3>
			<br></br>
			<CopyComponent
				title={
					"To place a chat bubble on your site's bottom right, insert this script tag into your HTML."
				}
				content={scriptContent}
				buttonText={"Copy Script"}
			/>
		</div>
	);
}

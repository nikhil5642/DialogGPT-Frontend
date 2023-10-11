import React, { useState, useEffect, useRef } from "react";
import styles from "./chatbot-embed.module.scss";
import CopyComponent from "../copy-component/copy-component";
import { IntegratedSidebarComponent } from "../integrated-sidebar-component/integrated-sidebar-component";
import { ChatbotEmbedOptions } from "./chatbot-embed.utils";

export default function EmbedComponent({ data }) {
	const [selectedKey, setSelectedKey] = useState(ChatbotEmbedOptions.IFRAME.id);
	const iframeContent = `<iframe
src="https://www.dialoggpt.io/iframe/${data.id}"
width="100%"
style="height: 100%; min-height: 600px"
frameBorder="0">
</iframe>`;
	const scriptContent = `<script
src="https://www.dialoggpt.io/embed-chatbot.js"
id="${data.id}"
defer>
</script>`;
	const optionsList = {
		IFRAME: {
			details: ChatbotEmbedOptions.IFRAME,
			view: (
				<CopyComponent
					title={
						"To embed the chatbot on your site, insert this iframe into your HTML."
					}
					content={iframeContent}
					buttonText={"Copy Iframe"}
				/>
			),
		},
		JAVASCRIPT: {
			details: ChatbotEmbedOptions.JAVASCRIPT,
			view: (
				<CopyComponent
					title={
						"To place a chat bubble on your site's bottom right, insert this script tag into your HTML."
					}
					content={scriptContent}
					buttonText={"Copy Script"}
				/>
			),
		},
	};

	return (
		<IntegratedSidebarComponent
			sideBarItems={optionsList}
			selectedKey={selectedKey}
			setSelectedKey={setSelectedKey}
		/>
	);
}

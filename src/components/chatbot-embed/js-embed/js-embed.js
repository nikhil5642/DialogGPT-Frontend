import React from "react";
import CopyComponent from "src/components/copy-component/copy-component";

export const JSEmbedComponent = ({ botID, title }) => {
	const scriptContent = `<script
src="https://www.dialoggpt.io/embed-chatbot.js"
id="${botID}"
defer>
</script>`;
	return (
		<CopyComponent
			title={title}
			content={scriptContent}
			buttonText={"Copy Script"}
		/>
	);
};

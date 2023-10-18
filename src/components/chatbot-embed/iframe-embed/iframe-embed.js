import React from "react";
import CopyComponent from "src/components/copy-component/copy-component";

export const IFrameEmbedComponent = ({ botID, title }) => {
	const iframeContent = `<iframe
src="https://www.dialoggpt.io/iframe/${botID}"
width="100%"
style="height: 100%; min-height: 600px"
frameBorder="0">
</iframe>`;
	return (
		<CopyComponent
			title={title}
			content={iframeContent}
			buttonText={"Copy Iframe"}
		/>
	);
};

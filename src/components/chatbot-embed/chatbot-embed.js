import React, { useState, useEffect, useRef } from "react";
import { IntegratedSidebarComponent } from "../integrated-sidebar-component/integrated-sidebar-component";
import { ChatbotEmbedOptions } from "./chatbot-embed.utils";
import { IFrameEmbedComponent } from "./iframe-embed/iframe-embed";
import { JSEmbedComponent } from "./js-embed/js-embed";
import { WixEmbedComponent } from "./wix-embed/wix-embed";

export default function EmbedComponent({ data }) {
	const [selectedKey, setSelectedKey] = useState(ChatbotEmbedOptions.WIX.id);

	const optionsList = {
		IFRAME: {
			details: ChatbotEmbedOptions.IFRAME,
			view: (
				<IFrameEmbedComponent
					botID={data.id}
					title={
						"To embed the chatbot on your site, insert this iframe into your HTML."
					}
				/>
			),
		},
		JAVASCRIPT: {
			details: ChatbotEmbedOptions.JAVASCRIPT,
			view: (
				<JSEmbedComponent
					botID={data.id}
					title={
						"To place a chat bubble on your site's bottom right, insert this script tag into your HTML."
					}
				/>
			),
		},
		WIX: {
			details: ChatbotEmbedOptions.WIX,
			view: <WixEmbedComponent botID={data.id} />,
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

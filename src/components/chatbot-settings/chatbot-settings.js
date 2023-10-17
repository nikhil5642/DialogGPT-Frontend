import React, { useState } from "react";
import GeneralSettings from "./general-settings/general-settings";
import ModelSettings from "./model-settings/model-settings";
import ChatInterfaceSettings from "./chat-interface-settings/chat-interface-settings";
import DangerSettings from "./danger-settings/danger-settings";
import LeadsCollectionSettings from "./leads-collection/leads-collection";
import { ChatbotSettingsOptions } from "./chatbot-settings.utils";
import { IntegratedSidebarComponent } from "../integrated-sidebar-component/integrated-sidebar-component";

export default function ChatBotSettings({ data, setData }) {
	const optionsList = {
		GENERAL_SETTINGS: {
			details: ChatbotSettingsOptions.GENERAL_SETTINGS,
			view: <GeneralSettings data={data} setData={setData} />,
		},
		MODEL_SETTINGS: {
			details: ChatbotSettingsOptions.MODEL_SETTINGS,
			view: <ModelSettings chatbotID={data.id} />,
		},
		CHAT_INTERFACE_SETTINGS: {
			details: ChatbotSettingsOptions.CHAT_INTERFACE_SETTINGS,
			view: <ChatInterfaceSettings botID={data.id} />,
		},
		LEADS_COLLECTION: {
			details: ChatbotSettingsOptions.LEADS_COLLECTION,
			view: <LeadsCollectionSettings botID={data.id} />,
		},
		DANGER_SETTINGS: {
			details: ChatbotSettingsOptions.DANGER_SETTINGS,
			view: <DangerSettings botID={data.id} />,
		},
	};
	const [selectedKey, setSelectedKey] = useState(
		ChatbotSettingsOptions.GENERAL_SETTINGS.id,
	);
	return (
		<IntegratedSidebarComponent
			sideBarItems={optionsList}
			selectedKey={selectedKey}
			setSelectedKey={setSelectedKey}
		/>
	);
}

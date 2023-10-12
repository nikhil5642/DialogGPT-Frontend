import { DashbordOptions } from "./chatbot-dashboard.utils";
import { useState } from "react";
import { IntegratedSidebarComponent } from "../integrated-sidebar-component/integrated-sidebar-component";
import ChatHistory from "./chat-history/chat-history";
export default function ChatBotDashboard({ botID }) {
	const optionsList = {
		CHAT_HISTORY: {
			details: DashbordOptions.CHAT_HISTORY,
			view: <ChatHistory botID={botID} />,
		},
	};

	const [selectedKey, setSelectedKey] = useState(
		DashbordOptions.CHAT_HISTORY.id,
	);
	return (
		<IntegratedSidebarComponent
			sideBarItems={optionsList}
			selectedKey={selectedKey}
			setSelectedKey={setSelectedKey}
		/>
	);
}

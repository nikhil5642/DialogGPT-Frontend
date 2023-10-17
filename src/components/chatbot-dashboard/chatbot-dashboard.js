import { DashbordOptions } from "./chatbot-dashboard.utils";
import { useState } from "react";
import { IntegratedSidebarComponent } from "../integrated-sidebar-component/integrated-sidebar-component";
import ChatHistory from "./chat-history/chat-history";
import LeadsCollected from "./leads-collections/leads-collected";
export default function ChatBotDashboard({ botID }) {
	const optionsList = {
		CHAT_HISTORY: {
			details: DashbordOptions.CHAT_HISTORY,
			view: <ChatHistory botID={botID} />,
		},
		LEADS_COLLECTED: {
			details: DashbordOptions.LEADS_COLLECTED,
			view: <LeadsCollected botID={botID} />,
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

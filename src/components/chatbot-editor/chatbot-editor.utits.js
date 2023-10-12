import SelectionComponent from "../selection-component/selection-component";
import { useRouter } from "next/router";

export const ChatBotOptionsEnum = {
	SOURCES: "sources",
	SETTINGS: "settings",
	CHATBOT: "chatbots",
	DASHBOARD: "dashboard",
	EMBED: "embed",
};
const ChatBotOptionLabels = {
	[ChatBotOptionsEnum.SOURCES]: "Sources",
	[ChatBotOptionsEnum.SETTINGS]: "Settings",
	[ChatBotOptionsEnum.CHATBOT]: "Chatbot",
	[ChatBotOptionsEnum.DASHBOARD]: "Dashboard",
	[ChatBotOptionsEnum.EMBED]: "Embed on Site",
};

export const ChatBotOptionSelector = ({ botID, selector, setSelector }) => {
	const router = useRouter();
	const sourceOptions = [
		ChatBotOptionsEnum.DASHBOARD,
		ChatBotOptionsEnum.CHATBOT,
		ChatBotOptionsEnum.SOURCES,
		ChatBotOptionsEnum.SETTINGS,
		ChatBotOptionsEnum.EMBED,
	];
	const handleSelection = (item) => {
		if (selector === ChatBotOptionsEnum.SOURCES) {
			const isConfirmed = window.confirm(
				"Are you sure you want to leave this page? Your changes will be lost.",
			);
			if (!isConfirmed) return;
		}
		// Update the internal state
		setSelector(item);

		// Construct the new pathname using the botID and the selected option
		const newPathname = `/chatbot/${botID}/${item.toLowerCase()}`;

		router.push(newPathname, undefined, { shallow: true });
	};

	return (
		<div style={{ marginTop: "24px", marginBottom: "24px" }}>
			{sourceOptions.map((item) => (
				<SelectionComponent
					key={item}
					text={getLabel(item)}
					isSelected={item === selector}
					onClick={() => handleSelection(item)}
				/>
			))}
		</div>
	);
};

const getLabel = (sourceOption) => {
	return ChatBotOptionLabels[sourceOption] || "";
};

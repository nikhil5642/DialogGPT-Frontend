import SelectionComponent from "../selection-component/selection-component";

export const ChatBotOptionsEnum = {
	SOURCES: "sources",
	SETTINGS: "settings",
	CHATBOT: "chatbots",
};
const ChatBotOptionLabels = {
	[ChatBotOptionsEnum.SOURCES]: "Sources",
	[ChatBotOptionsEnum.SETTINGS]: "Settings",
	[ChatBotOptionsEnum.CHATBOT]: "ChatBot",
};

export const ChatBotOptionSelector = ({ selector, setSelector }) => {
	const sourceOptions = [
		ChatBotOptionsEnum.SOURCES,
		ChatBotOptionsEnum.SETTINGS,
		ChatBotOptionsEnum.CHATBOT,
	];
	return (
		<div>
			{sourceOptions.map((item) => (
				<SelectionComponent
					key={item}
					text={getLabel(item)}
					isSelected={item === selector}
					onClick={() => setSelector(item)}
				/>
			))}
		</div>
	);
};

const getLabel = (sourceOption) => {
	return ChatBotOptionLabels[sourceOption] || "";
};

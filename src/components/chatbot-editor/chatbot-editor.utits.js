import SelectionComponent from "../selection-component/selection-component";
import { useRouter } from "next/router";

export const ChatBotOptionsEnum = {
	SOURCES: "sources",
	SETTINGS: "settings",
	CHATBOT: "chatbots",
};
const ChatBotOptionLabels = {
	[ChatBotOptionsEnum.SOURCES]: "Sources",
	[ChatBotOptionsEnum.SETTINGS]: "Settings",
	[ChatBotOptionsEnum.CHATBOT]: "Chatbot",
};

export const ChatBotOptionSelector = ({ selector, setSelector }) => {
	const router = useRouter();
	const sourceOptions = [
		ChatBotOptionsEnum.CHATBOT,
		ChatBotOptionsEnum.SOURCES,
		ChatBotOptionsEnum.SETTINGS,
	];
	const handleSelection = (item) => {
		// Update the internal state
		setSelector(item);

		// Update the URL's query parameter
		router.push(
			{
				pathname: router.pathname,
				query: { ...router.query, page: item },
			},
			undefined,
			{ shallow: true },
		); // Shallow routing: updates the URL without running data fetching methods again
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

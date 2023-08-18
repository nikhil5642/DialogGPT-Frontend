import SelectionComponent from "../selection-component/selection-component";

export const SourceOptionsEnum = {
	FILE: "file",
	TEXT: "text",
	URL: "url",
	QNA: "qna",
};
const SourceOptionLabels = {
	[SourceOptionsEnum.FILE]: "Files",
	[SourceOptionsEnum.TEXT]: "Texts",
	[SourceOptionsEnum.URL]: "Website",
	[SourceOptionsEnum.QNA]: "Q&A",
};

export const SourceSelector = ({ selector, setSelector }) => {
	const sourceOptions = [
		SourceOptionsEnum.FILE,
		SourceOptionsEnum.TEXT,
		SourceOptionsEnum.URL,
		SourceOptionsEnum.QNA,
	];
	return (
		<div>
			{sourceOptions.map((item) => (
				<SelectionComponent
					key={item}
					text={getSourceLabel(item)}
					isSelected={item === selector}
					onClick={() => setSelector(item)}
				/>
			))}
		</div>
	);
};

export const getSourceLabel = (sourceOption) => {
	return SourceOptionLabels[sourceOption] || "";
};

export function generateRandomString(length) {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const charactersLength = characters.length;
	let result = "";

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * charactersLength);
		result += characters.charAt(randomIndex);
	}

	return result;
}

import SelectionComponent from "../selection-component/selection-component";

export const SourceOptionsEnum = {
	FILES: "files",
	TEXTS: "texts",
	URLS: "urls",
	QNA: "qna",
};
const SourceOptionLabels = {
	[SourceOptionsEnum.FILES]: "Files",
	[SourceOptionsEnum.TEXTS]: "Texts",
	[SourceOptionsEnum.URLS]: "Website",
	[SourceOptionsEnum.QNA]: "Q&A",
};

export const SourceSelector = ({ selector, setSelector }) => {
	const sourceOptions = [
		SourceOptionsEnum.FILES,
		SourceOptionsEnum.TEXTS,
		SourceOptionsEnum.URLS,
		SourceOptionsEnum.QNA,
	];
	return (
		<div>
			{sourceOptions.map((item) => (
				<SelectionComponent
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

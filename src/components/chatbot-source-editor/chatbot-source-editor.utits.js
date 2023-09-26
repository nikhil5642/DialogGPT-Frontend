import { useEffect, useState } from "react";
import SelectionComponent from "../selection-component/selection-component";
import { FirebaseFeatures } from "../../helper/feature-flags";
import { useFirebase } from "../../helper/firebase-provider";
import { getValue } from "firebase/remote-config";
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

export const SourceSelector = ({ selector, handleSelection }) => {
	const [sourceOptions, setSourceOptions] = useState([]);
	const { isConfigLoaded, remoteConfig } = useFirebase();
	useEffect(() => {
		if (isConfigLoaded && remoteConfig) {
			const sources = [];
			if (
				getValue(
					remoteConfig,
					FirebaseFeatures.SHOW_FILES_EDIT_VIEW,
				).asBoolean()
			) {
				sources.push(SourceOptionsEnum.FILE);
			}
			if (
				getValue(remoteConfig, FirebaseFeatures.SHOW_TEXT_EDIT_VIEW).asBoolean()
			) {
				sources.push(SourceOptionsEnum.TEXT);
			}

			if (
				getValue(
					remoteConfig,
					FirebaseFeatures.SHOW_WEBSITE_EDIT_VIEW,
				).asBoolean()
			) {
				sources.push(SourceOptionsEnum.URL);
			}
			if (
				getValue(remoteConfig, FirebaseFeatures.SHOW_QNA_EDIT_VIEW).asBoolean()
			) {
				sources.push(SourceOptionsEnum.QNA);
			}
			setSourceOptions(sources);
		}
	}, [isConfigLoaded, remoteConfig]);

	return (
		<div>
			{sourceOptions.map((item) => (
				<SelectionComponent
					key={item}
					text={getSourceLabel(item)}
					isSelected={item === selector}
					onClick={() => handleSelection(item)}
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

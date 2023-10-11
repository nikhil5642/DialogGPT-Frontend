import { useEffect, useState } from "react";
import SelectionComponent from "../selection-component/selection-component";

import { useFirebase } from "../../helper/firebase-provider";
import { getValue } from "firebase/remote-config";

export const SourceOptions = {
	FILE: {
		id: "FILE",
		icon: "/assets/ic_file.png",
		text: "File",
	},
	TEXT: {
		id: "TEXT",
		icon: "/assets/ic_text.png",
		text: "Text",
	},
	URL: {
		id: "URL",
		icon: "/assets/ic_link.png",
		text: "Website",
	},
	QNA: {
		id: "QNA",
		icon: "/assets/ic_qna.png",
		text: "Q&A",
	},
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

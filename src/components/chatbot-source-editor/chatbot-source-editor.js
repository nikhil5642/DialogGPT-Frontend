import { useState, useEffect, useContext, useMemo } from "react";

import styles from "./chatbot-source-editor.module.scss";
import { SourceOptions } from "./chatbot-source-editor.utils";
import WebisteLoader from "./website-loader/website-loader";
import { postRequest } from "../../helper/http-helper";
import TextLoader from "./text-loader/text-loader";
import LoaderContext from "../loader/loader-context";
import { useRouter } from "next/router";
import { useTrackEvent } from "../../helper/event-tracker";
import { useFirebase } from "../../helper/firebase-provider";
import { getValue } from "firebase/remote-config";
import { FirebaseFeatures } from "../../helper/feature-flags";

import { IntegratedSidebarComponent } from "../integrated-sidebar-component/integrated-sidebar-component";

export default function ChatBotSourceEditor({
	chatbotInfoData,
	setChatbotInfoData,
}) {
	const router = useRouter();
	const { showLoader, hideLoader } = useContext(LoaderContext);
	const [data, setData] = useState([]);
	const { trackEvent, trackScreenView } = useTrackEvent();
	const { isConfigLoaded, remoteConfig } = useFirebase();
	const sourceSelectionOptions = isConfigLoaded
		? getSourceSelectionOptions(remoteConfig)
		: {};

	function getSourceSelectionOptions(remoteConfig) {
		const firebaseChecks = {
			FILE: getValue(
				remoteConfig,
				FirebaseFeatures.SHOW_FILES_EDIT_VIEW,
			).asBoolean(),
			TEXT: getValue(
				remoteConfig,
				FirebaseFeatures.SHOW_TEXT_EDIT_VIEW,
			).asBoolean(),
			URL: getValue(
				remoteConfig,
				FirebaseFeatures.SHOW_WEBSITE_EDIT_VIEW,
			).asBoolean(),
			QNA: getValue(
				remoteConfig,
				FirebaseFeatures.SHOW_QNA_EDIT_VIEW,
			).asBoolean(),
		};
		return {
			...(firebaseChecks.FILE
				? {
						FILE: {
							details: SourceOptions.FILE,
							view: (
								<>
									{trackScreenView(
										"ChatbotFileEditorScreen",
										"ChatBotEditorScreen",
									)}
									<div>Files View</div>
								</>
							),
						},
				  }
				: {}),

			...(firebaseChecks.URL
				? {
						URL: {
							details: SourceOptions.URL,
							view: (
								<>
									{trackScreenView(
										"ChatbotWebsiteEditorScreen",
										"ChatBotEditorScreen",
									)}
									<WebisteLoader
										bot_id={chatbotInfoData.id}
										data={data}
										setData={setData}
										chatbotInfoData={chatbotInfoData}
										setChatbotInfoData={setChatbotInfoData}
									/>
								</>
							),
						},
				  }
				: {}),
			...(firebaseChecks.TEXT
				? {
						TEXT: {
							details: SourceOptions.TEXT,
							view: (
								<>
									{trackScreenView(
										"ChatbotTextEditorScreen",
										"ChatBotEditorScreen",
									)}
									<TextLoader
										bot_id={chatbotInfoData.id}
										data={data}
										setData={setData}
										chatbotInfoData={chatbotInfoData}
										setChatbotInfoData={setChatbotInfoData}
									></TextLoader>
								</>
							),
						},
				  }
				: {}),
			...(firebaseChecks.QNA
				? {
						QNA: {
							details: SourceOptions.QNA,
							view: (
								<>
									{trackScreenView(
										"ChatbotQNAEditorScreen",
										"ChatBotEditorScreen",
									)}
									<div>Q&A View</div>
								</>
							),
						},
				  }
				: {}),
		};
	}

	const [source, setSource] = useState(SourceOptions.URL.id);
	useEffect(() => {
		const pathWithoutQuery = router.asPath.split("?")[0];

		// Split the path to get the segments
		const segments = pathWithoutQuery.split("/");
		const lastSegment = segments[segments.length - 1].toUpperCase();
		const secondLastSegment = segments[segments.length - 2];

		const availableSources = Object.keys(sourceSelectionOptions);

		let newSource;
		if (
			availableSources.includes(lastSegment) &&
			secondLastSegment === "sources"
		) {
			newSource = lastSegment;
		} else if (lastSegment === "sources") {
			newSource = SourceOptions.TEXT.id; // default value
		}
		if (newSource && newSource !== source) {
			setSource(newSource);
		}
	}, [sourceSelectionOptions]);

	const handleSourceSelection = (item) => {
		setSource(item); // Update internal state

		const newPath = `/chatbot/${
			chatbotInfoData.id
		}/sources/${item.toLowerCase()}`;
		router.replace(newPath, undefined, { shallow: true }); // Update the URL without a refresh
	};

	useEffect(() => {
		const handleBeforeUnload = (e) => {
			e.preventDefault();
			e.returnValue =
				"Are you sure you want to leave this page? Any unsaved changes will be lost.";
			trackEvent("chatbot-editor-before-unload");
		};
		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);

	const loadChatBotData = () => {
		if (chatbotInfoData.id) {
			showLoader("Loading Content");
			postRequest("/load_chatbot_content", { botID: chatbotInfoData.id })
				.then((res) => {
					hideLoader();
					trackEvent("chatbot-editor-load-content-success");
					setData(res.result);
				})
				.catch(() => {
					trackEvent("chatbot-editor-load-content-failed");
					hideLoader();
				});
		}
	};

	useEffect(() => {
		if (chatbotInfoData.id) {
			loadChatBotData();
		}
	}, [chatbotInfoData.id]);

	return (
		<div className={styles.chatBotEditorContainer}>
			{sourceSelectionOptions[source] && (
				<IntegratedSidebarComponent
					sideBarItems={sourceSelectionOptions}
					selectedKey={source}
					setSelectedKey={handleSourceSelection}
				/>
			)}
		</div>
	);
}

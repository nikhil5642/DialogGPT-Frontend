import styles from "./train-component.module.scss";
import { useState, useEffect, useContext } from "react";
import { postRequest, getRequest } from "../../../helper/http-helper";
import LoadingButton from "src/components/loading-button/loading-button";
import { URLStatus } from "../website-loader/website-loader.utils";
import { useRouter } from "next/router";
import { ChatBotOptionsEnum } from "../../chatbot-editor/chatbot-editor.utits";
import LoaderContext from "src/components/loader/loader-context";
import { useTrackEvent } from "../../../helper/event-tracker";
import PricingDialog from "../../pricing-dialog/pricing-dialog";

const initialData = {
	texts: { charLength: 0 },
	urls: { count: 0, charLength: 0 },
	files: { count: 0, charLength: 0 },
	qna: { count: 0, charLength: 0 },
};
export default function TrainComponent({
	data,
	chatbotInfoData,
	setChatbotInfoData,
}) {
	const router = useRouter();

	const [trainingData, setTrainingData] = useState(initialData);
	const [totalChars, setTotalChars] = useState(0);
	const [trainingError, setTrainingError] = useState("");
	const { showLoader, hideLoader } = useContext(LoaderContext);
	const [isPricingDialogOpen, setPricingDialogOpen] = useState(false);

	const { trackEvent } = useTrackEvent();

	useEffect(() => {
		const charCount =
			trainingData.texts.charLength +
			trainingData.urls.charLength +
			trainingData.qna.charLength +
			trainingData.files.charLength;
		setTotalChars(charCount);
		if (charCount > 1000) {
			setTrainingError("");
		}
	}, [trainingData]);

	const checkSubscriptionPlanAndTrain = () => {
		showLoader("Please Wait...");
		getRequest("/current_subscription_plan")
			.then((res) => {
				if (res?.result === "free") {
					hideLoader();
					setPricingDialogOpen(true);
				} else {
					hideLoader();
					trainChatBot();
				}
			})
			.catch(() => {
				hideLoader();
			});
	};

	const trainChatBot = () => {
		if (totalChars < 1000) {
			setTrainingError(
				"***Your input needs to be at least 1,000 characters for training.",
			);
			return;
		}
		router.push(
			{
				pathname: router.pathname,
				query: { ...router.query, page: ChatBotOptionsEnum.CHATBOT },
			},
			undefined,
			{ shallow: true },
		);
		showLoader("Training Chatbot...");
		setChatbotInfoData({ ...chatbotInfoData, status: "training" });
		postRequest("/train_chatbot", { botID: chatbotInfoData.id, data: data })
			.then(() => {
				trackEvent("chatbot-editor-train", { botID: chatbotInfoData.id });
				hideLoader();
				window.location.href = `/chatbot/${chatbotInfoData.id}/chatbots`;
				window.scrollTo(0, 0);
			})
			.catch(() => {
				trackEvent("chatbot-editor-train-failed", {
					botID: chatbotInfoData.id,
				});
				hideLoader();
			});
	};

	useEffect(() => {
		const initialData = {
			texts: { charLength: 0 },
			urls: { count: 0, charLength: 0 },
			files: { count: 0, charLength: 0 },
			qna: { count: 0, charLength: 0 },
		};
		const updatedTrainingData = data.reduce((acc, curr) => {
			switch (curr.source_type) {
				case "text":
					acc.texts.charLength += curr.char_count;
					break;
				case "url":
					if (curr.status === URLStatus.Removing) break;
					acc.urls.count += 1;
					acc.urls.charLength += curr.char_count;
					break;
				case "files":
					acc.files.count += 1;
					acc.files.charLength += curr.char_count;
					break;
				case "qna":
					acc.qna.count += 1;
					acc.qna.charLength += curr.char_count;
					break;
				default:
					break;
			}
			return acc;
		}, initialData);
		setTrainingData(updatedTrainingData);
	}, [data]);
	return (
		<div className={styles.trainingContainer}>
			<h4>Included Sources:</h4>

			{trainingData.texts.charLength > 0 && (
				<p> {trainingData.texts.charLength} Character Texts</p>
			)}

			{trainingData.urls.count > 0 && (
				<p>
					{trainingData.urls.count} URLs | {trainingData.urls.charLength}
					Characters
				</p>
			)}

			{trainingData.files.count > 0 && (
				<p>
					{trainingData.files.count} Files | {trainingData.files.charLength}
					Characters
				</p>
			)}

			{trainingData.qna.count > 0 && (
				<p>
					{trainingData.qna.count} QnA | {trainingData.qna.charLength}
					Characters
				</p>
			)}
			<h5>
				Total Detected Characters: <span>{totalChars}</span>
			</h5>
			<div className={styles.trainButtonContainer}>
				<LoadingButton
					title={"Train ChatBot"}
					onClick={checkSubscriptionPlanAndTrain}
				></LoadingButton>
			</div>

			<PricingDialog
				isOpen={isPricingDialogOpen}
				onClose={() => setPricingDialogOpen(false)}
				title={"Start your trial Now!"}
			/>

			{trainingError && <p className={styles.trainingError}>{trainingError}</p>}
		</div>
	);
}

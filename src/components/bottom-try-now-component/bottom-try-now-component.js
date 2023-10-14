import { useTrackEvent } from "../../helper/event-tracker";
import AuthService from "../../helper/AuthService";
import styles from "./bottom-try-now-component.module.scss";

export default function BottomTryNowComponent() {
	const { trackEvent } = useTrackEvent();
	function onCreateChatbot() {
		const isAuthenticated = AuthService.isAuthenticated();

		trackEvent("create_try_now_clicked", {
			user_authenticated: isAuthenticated ? "true" : "false",
		});

		if (isAuthenticated) {
			window.location.href = `/my-chatbots`;
		} else {
			window.location.href = `/signin`;
		}
	}
	return (
		<div className={styles.bottomTryNowComponent}>
			<h2 className={styles.bottomTryNowComponentHeader}>
				Join the future of AI Chatbots Today
			</h2>
			<button
				onClick={onCreateChatbot}
				className={styles.bottomTryNowComponentButton}
			>
				Try Now →
			</button>
		</div>
	);
}

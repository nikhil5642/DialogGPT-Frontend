import styles from "./about.module.scss";
import { useTrackEvent } from "../../helper/event-tracker";

export default function About() {
	const trackEvent = useTrackEvent();

	return (
		<div className={styles.aboutContainer}>
			<p className={styles.linksP}>
				<a
					href="/support"
					className={styles.termsLink}
					onClick={() => trackEvent("contact_us_link_click")}
				>
					Contact Us
				</a>{" "}
				|
				<a
					href="/terms"
					className={styles.termsLink}
					onClick={() => trackEvent("terms_of_service_link_click")}
				>
					Terms of Service
				</a>{" "}
				|
				<a
					href="/privacy"
					className={styles.termsLink}
					onClick={() => trackEvent("privacy_policy_link_click")}
				>
					Privacy Policy
				</a>
			</p>
			<p className={styles.aboutP}>support@dialoggpt.io</p>
		</div>
	);
}

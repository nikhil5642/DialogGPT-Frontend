import styles from "./about.module.scss";
import { useTrackEvent } from "../../helper/event-tracker";
import Image from "next/image";

export default function About() {
	const { trackEvent } = useTrackEvent();

	return (
		<div className={styles.aboutContainer}>
			<a
				className={styles.headerLogoContainer}
				href="/home"
				onClick={() =>
					trackEvent("home_logo_click", {
						source: menuVisible ? "desktop" : "mobile",
					})
				}
			>
				<Image
					className={styles.headerLogo}
					src="/assets/dialog_gpt_logo_icon_with_text.png"
					alt={"DialogGPT"}
					title={"DialogGPT"}
					loading="eager"
					priority={true}
					height={50}
					width={250}
				></Image>
			</a>

			<p className={styles.linksP}>
				<a
					href="/support"
					className={styles.termsLink}
					onClick={() => trackEvent("contact_us_link_click")}
				>
					Contact Us
				</a>
				<span>|</span>
				<a
					href="/terms"
					className={styles.termsLink}
					onClick={() => trackEvent("terms_of_service_link_click")}
				>
					Terms of Service
				</a>
				<span>|</span>
				<a
					href="/privacy"
					className={styles.termsLink}
					onClick={() => trackEvent("privacy_policy_link_click")}
				>
					Privacy Policy
				</a>
			</p>
			<p className={styles.aboutP}>support@dialogGPT.io</p>
		</div>
	);
}

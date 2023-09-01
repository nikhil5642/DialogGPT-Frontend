import styles from "./about.module.scss";

export default function About() {
	return (
		<div className={styles.aboutContainer}>
			<p className={styles.linksP}>
				<a href="/support" className={styles.termsLink}>
					Contact Us
				</a>{" "}
				|
				<a href="/terms" className={styles.termsLink}>
					Terms of Service
				</a>{" "}
				|
				<a href="/privacy" className={styles.termsLink}>
					Privacy Policy
				</a>
			</p>
			<p className={styles.aboutP}>support@dialoggpt.io</p>
		</div>
	);
}

import styles from "./about.module.scss";

export default function About() {
	return (
		<div className={styles.aboutContainer}>
			<p className={styles.linksP}>
				<a href="/eula" className={styles.termsLink}>
					Terms of Service
				</a>{" "}
				|
				<a href="/privacy-policy" className={styles.termsLink}>
					Privacy Policy
				</a>
			</p>
			<p className={styles.aboutP}>support@dialogGPT.io</p>
		</div>
	);
}

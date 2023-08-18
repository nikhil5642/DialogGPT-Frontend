import styles from "./about.module.scss";
export default function About() {
	return (
		<div className={styles.aboutContainer}>
			<p className={styles.aboutP}>
				<b className={styles.aboutContact}>Contact us: </b>
				nikhil@websitegpt.com
			</p>
			<br></br>
			<p className={styles.aboutCopyright}>© 2023 WebsiteGPT.com</p>
		</div>
	);
}

import styles from "./about.module.scss";
export default function About() {
	return (
		<div className={styles.aboutContainer}>
			<p className={styles.aboutP}>
				<b className={styles.aboutContact}>Contact us: </b>
				nikhil@dialogGPT.io
			</p>
			<br></br>
			<p className={styles.aboutCopyright}>© 2023 DialogGPT</p>
		</div>
	);
}

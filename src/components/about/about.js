import styles from "./about.module.scss";
export default function About() {
	return (
		<div className={styles.aboutContainer}>
			<p className={styles.aboutP}>
				<b className={styles.aboutContact}>Contact us: </b>
				contact@chessmeito.com
			</p>
			<br></br>
			<p className={styles.aboutCopyright}>© 2022 ChessMeito.com</p>
		</div>
	);
}

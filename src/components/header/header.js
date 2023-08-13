import styles from "./header.module.scss";
import Image from "next/image";
export default function Header() {
	return (
		<div bg="light" expand="lg" className={styles.headerContainer}>
			<a className={styles.headerLogoContainer} href="/home">
				<Image
					className={styles.headerLogo}
					src="/assets/chessmeito_logo_icon_with_text.png"
					alt={"ChessMeito"}
					title={"ChessMeito"}
					loading="eager"
					height={120}
					width={580}
				></Image>
			</a>
		</div>
	);
}

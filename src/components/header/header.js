import styles from "./header.module.scss";
import Image from "next/image";
export default function Header() {
	return (
		<div bg="light" expand="lg" className={styles.headerContainer}>
			<a className={styles.headerLogoContainer} href="/my-chatbots">
				<Image
					className={styles.headerLogo}
					src="/assets/websitegpt_logo.png"
					alt={"ChessMeito"}
					title={"ChessMeito"}
					loading="eager"
					height={160}
					width={580}
				></Image>
			</a>
		</div>
	);
}

import styles from "./header.module.scss";
import Image from "next/image";

import { useRouter } from "next/router";

export default function Header() {
	const router = useRouter();

	return (
		<div bg="light" expand="lg" className={styles.headerContainer}>
			<div style={{ display: "flex", alignItems: "center" }}>
				<a className={styles.headerLogoContainer} href="/home">
					<Image
						className={styles.headerLogo}
						src="/assets/dialog_gpt_logo_with_text.png"
						alt={"ChessMeito"}
						title={"ChessMeito"}
						loading="eager"
						height={80}
						width={300}
					></Image>
				</a>

				<div className={styles.linksContainer}>
					<a className={styles.selectionItem} href="/home">
						Demo
					</a>
					<a className={styles.selectionItem} href="/pricing">
						Pricing
					</a>
					<a className={styles.selectionItem} href="/my-chatbots">
						My ChatBot's
					</a>
				</div>
				<a className={styles.profileLogoContainer} href="/home">
					<Image
						className={styles.profileLogo}
						src="/assets/profile_user.png"
						alt={"ChessMeito"}
						title={"ChessMeito"}
						loading="eager"
						height={40}
						width={40}
					></Image>
				</a>
				<a className={styles.hamburgerContainer}>
					<Image
						className={styles.hamburgerLogo}
						src="/assets/hamburger.png"
						alt={"ChessMeito"}
						title={"ChessMeito"}
						loading="eager"
						height={40}
						width={40}
					></Image>
				</a>
			</div>
		</div>
	);
}

import styles from "./header.module.scss";
import Image from "next/image";

import { useRouter } from "next/router";

export default function Header() {
	const router = useRouter();

	return (
		<div bg="light" expand="lg" className={styles.headerContainer}>
			<div style={{ display: "flex", alignItems: "center" }}>
				<a className={styles.headerLogoContainer} href="/my-chatbots">
					<Image
						className={styles.headerLogo}
						src="/assets/dialog_gpt_logo_with_text.png"
						alt={"ChessMeito"}
						title={"ChessMeito"}
						loading="eager"
						height={120}
						width={400}
					></Image>
				</a>
			</div>
		</div>
	);
}

import styles from "./header.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthService from "src/helper/AuthService";

export default function Header() {
	const [menuVisible, setMenuVisible] = useState(false);
	const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

	useEffect(() => {
		setIsUserAuthenticated(AuthService.isAuthenticated());
	}, []);

	return (
		<div bg="light" expand="lg" className={styles.headerContainer}>
			<a className={styles.headerLogoContainer} href="/home">
				<Image
					className={styles.headerLogo}
					src="/assets/dialog_gpt_logo_with_text.png"
					alt={"DialogGPT"}
					title={"DialogGPT"}
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
					My ChatBots
				</a>
			</div>
			<div className={styles.profileActionContainer}>
				{isUserAuthenticated ? (
					<a href="/account">{"Account ->"}</a>
				) : (
					<a href="/signin">{"Log In ->"}</a>
				)}
			</div>
			<a
				className={styles.hamburgerContainer}
				onClick={() => setMenuVisible(true)}
			>
				<Image
					className={styles.hamburgerLogo}
					src="/assets/hamburger.png"
					alt={"DialogGPT"}
					title={"DialogGPT"}
					loading="eager"
					height={40}
					width={40}
				></Image>
			</a>
			{menuVisible && (
				<div className={styles.menu}>
					<button
						className={styles.closeButton}
						onClick={() => setMenuVisible(false)}
					>
						X
					</button>
					<ul>
						<li>
							<a href="/home">Demo</a>
						</li>
						<li>
							<a href="/pricing">Pricing</a>
						</li>
						<li>
							<a href="/my-chatbots">My ChatBot's</a>
						</li>
						<li>
							{isUserAuthenticated ? (
								<a href="/account">Account</a>
							) : (
								<a href="/signin">Log In</a>
							)}
						</li>
					</ul>
				</div>
			)}
		</div>
	);
}

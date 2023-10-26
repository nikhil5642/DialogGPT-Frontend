import styles from "./header.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import AuthService from "src/helper/AuthService";
import { useTrackEvent } from "src/helper/event-tracker";

export default function Header() {
	const [menuVisible, setMenuVisible] = useState(false);
	const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
	const { trackEvent } = useTrackEvent();

	useEffect(() => {
		setIsUserAuthenticated(AuthService.isAuthenticated());
	}, []);

	return (
		<div bg="light" expand="lg" className={styles.headerContainer}>
			<a
				className={styles.headerLogoContainer}
				href="/home"
				onClick={() =>
					trackEvent("home_logo_click", {
						source: menuVisible ? "desktop" : "mobile",
					})
				}
			>
				<Image
					className={styles.headerLogo}
					src="/assets/dialog_gpt_logo_icon_with_text.png"
					alt={"DialogGPT"}
					title={"DialogGPT"}
					loading="eager"
					priority={true}
					height={40}
					width={200}
				></Image>
			</a>

			<div className={styles.linksContainer}>
				<a
					className={styles.selectionItem}
					href="/home#Demo"
					onClick={() => trackEvent("demo_link_click", { source: "header" })}
				>
					Demo
				</a>
				<a
					className={styles.selectionItem}
					href="/pricing"
					onClick={() => trackEvent("pricing_link_click", { source: "header" })}
				>
					Pricing
				</a>
				<a
					className={styles.selectionItem}
					href="/docs"
					onClick={() => trackEvent("guide_link_click", { source: "header" })}
				>
					Docs
				</a>
				<a
					className={styles.selectionItem}
					href="/my-chatbots"
					onClick={() =>
						trackEvent("my_chatbots_link_click", { source: "header" })
					}
				>
					My ChatBots
				</a>
			</div>
			<div className={styles.profileActionContainer}>
				{isUserAuthenticated ? (
					<a
						href="/account"
						onClick={() =>
							trackEvent("account_link_click", { source: "hander" })
						}
					>
						{"Account"}
					</a>
				) : (
					<a
						href="/signin"
						onClick={() => trackEvent("login_link_click", { source: "header" })}
					>
						{"Sign Up"}
					</a>
				)}
			</div>
			<div
				className={styles.hamburgerContainer}
				onClick={() => {
					trackEvent("hamburger_click");
					setMenuVisible(true);
				}}
			>
				<Image
					className={styles.hamburgerLogo}
					src="/assets/hamburger.png"
					alt={"DialogGPT"}
					title={"DialogGPT"}
					loading="lazy"
					height={40}
					width={40}
				></Image>
			</div>
			{menuVisible && (
				<div className={styles.menu}>
					<button
						className={styles.closeButton}
						onClick={() => setMenuVisible(false)}
					>
						<Image
							className={styles.closeImg}
							src="/assets/close_grey.png"
							alt={"DialogGPT"}
							title={"DialogGPT"}
							loading="lazy"
							height={24}
							width={24}
						></Image>
					</button>
					<ul>
						<li>
							<a
								href="/home#Demo"
								onClick={() => {
									setMenuVisible(false);
									trackEvent("demo_link_click", { source: "hamburger" });
								}}
							>
								Demo
							</a>
						</li>
						<li>
							<a
								href="/pricing"
								onClick={() => {
									setMenuVisible(false);
									trackEvent("pricing_link_click", { source: "hamburger" });
								}}
							>
								Pricing
							</a>
						</li>
						<li>
							<a
								href="/docs"
								onClick={() => {
									setMenuVisible(false);
									trackEvent("guide_link_click", { source: "hamburger" });
								}}
							>
								Docs
							</a>
						</li>
						<li>
							<a
								href="/my-chatbots"
								onClick={() => {
									setMenuVisible(false);
									trackEvent("my_chatbots_link_click", { source: "hamburger" });
								}}
							>
								My ChatBot's
							</a>
						</li>
						<li>
							{isUserAuthenticated ? (
								<a
									href="/account"
									onClick={() => {
										setMenuVisible(false);
										trackEvent("account_link_click", { source: "hamburger" });
									}}
								>
									Account
								</a>
							) : (
								<a
									href="/signin"
									onClick={() => {
										setMenuVisible(false);
										trackEvent("login_link_click", { source: "hamburger" });
									}}
								>
									Sign Up
								</a>
							)}
						</li>
					</ul>
				</div>
			)}
		</div>
	);
}

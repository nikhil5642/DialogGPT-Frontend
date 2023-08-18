import styles from "./header.module.scss";
import Image from "next/image";
import AuthService from "../../helper/AuthService";
import { useRouter } from "next/router";
import { getAuth, signOut } from "firebase/auth";

export default function Header() {
	const router = useRouter();
	const onLogout = () => {
		AuthService.logout().then(() => {
			signOut(getAuth())
				.then(() => {
					router.push("/signin");
				})
				.catch((error) => {
					console.log("Error", error);
				});
		});
	};
	return (
		<div bg="light" expand="lg" className={styles.headerContainer}>
			<div style={{ display: "flex", alignItems: "center" }}>
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

				<button
					onClick={onLogout}
					style={{
						padding: "8px",
						borderRadius: "4px",
						backgroundColor: "#ff0000",
						color: "#fff",
						border: "none",
						cursor: "pointer",
						marginLeft: "10px", // Add some spacing between the image and button
					}}
				>
					Logout
				</button>
			</div>
		</div>
	);
}

import styles from "./styles/account.module.scss";
import { useEffect, useState } from "react";
// import ReactGA from "react-ga4";
import Head from "next/head";
import { useRouter } from "next/router";
import AuthService from "../src/helper/AuthService";
import { getAuth, signOut } from "firebase/auth";
import { getRequest } from "../src/helper/http-helper";

export default function AccountScreen() {
	const router = useRouter();
	const [accountInfo, setAccountInfo] = useState({});
	useEffect(() => {
		getRequest("/account_info", {})
			.then((res) => setAccountInfo(res.result))
			.catch(() => {});
	}, []);

	const onLogout = () => {
		AuthService.logout().then(() => {
			signOut(getAuth())
				.then(() => {
					router.push("/signin");
				})
				.catch(() => {});
		});
	};
	return (
		<>
			<Head>
				<title>Account</title>
				<meta name="description" content="Your Account" />
				<link rel="canonical" href="https://chessmeito.com/home" />
			</Head>
			<div className={styles.accountScreenContainer}>
				<h1 className={styles.accountHeader}>Account</h1>
				<div className={styles.emailContainer}>
					<h3>Usage</h3>
					<p>{"Messages Consumed"}</p>
				</div>
				<div className={styles.emailContainer}>
					<h3>Your Email</h3>
					<p>{accountInfo.email}</p>
				</div>

				<button onClick={onLogout} className={styles.logoutButton}>
					Sign Out
				</button>
			</div>
		</>
	);
}

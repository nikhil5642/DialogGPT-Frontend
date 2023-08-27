import styles from "./styles/account.module.scss";
import { useEffect, useState, useContext } from "react";
// import ReactGA from "react-ga4";
import Head from "next/head";
import { useRouter } from "next/router";
import AuthService from "../src/helper/AuthService";
import { getAuth, signOut } from "firebase/auth";
import { getRequest } from "../src/helper/http-helper";
import LoaderContext from "../src/components/loader/loader-context";
import LoadingButton from "src/components/loading-button/loading-button";

export default function AccountScreen() {
	const router = useRouter();
	const [accountInfo, setAccountInfo] = useState({});
	const { showLoader, hideLoader } = useContext(LoaderContext);

	useEffect(() => {
		showLoader("Loading Info...");
		getRequest("/account_info", {})
			.then((res) => {
				hideLoader();
				setAccountInfo(res.result);
			})
			.catch(() => {
				hideLoader();
			});
	}, []);

	const onLogout = () => {
		showLoader("Logging Out...");
		AuthService.logout()
			.then(() => {
				signOut(getAuth())
					.then(() => {
						router.push("/signin");
						hideLoader();
					})
					.catch(() => {
						hideLoader();
					});
			})
			.catch(() => {
				hideLoader();
			});
	};
	return (
		<>
			<Head>
				<title>Account</title>
				<meta name="description" content="Your Account" />
				<link rel="canonical" href="https://dialoggpt.io/home" />
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

				<div className={styles.logoutButton}>
					<LoadingButton title={"Sign Out"} onClick={onLogout}></LoadingButton>
				</div>
			</div>
		</>
	);
}

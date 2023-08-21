import styles from "./styles/pricing.module.scss";
import { useEffect, useState } from "react";
// import ReactGA from "react-ga4";
import Head from "next/head";
import { useRouter } from "next/router";
import AuthService from "../src/helper/AuthService";
import { getAuth, signOut } from "firebase/auth";
import { getRequest } from "../src/helper/http-helper";

export default function AccountScreen() {
	const router = useRouter();

	return (
		<>
			<Head>
				<title>Account</title>
				<meta name="description" content="Your Account" />
				<link rel="canonical" href="https://chessmeito.com/home" />
			</Head>
			<div className={styles.pricingScreenContainer}>
				<h1 className={styles.pricingHeader}>Pricing Plans</h1>
			</div>
		</>
	);
}

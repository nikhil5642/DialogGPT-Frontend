import styles from "./styles/pricing.module.scss";
import Head from "next/head";
import { useRouter } from "next/router";

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

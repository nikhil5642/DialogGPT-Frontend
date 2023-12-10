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
import { useTrackEvent } from "../src/helper/event-tracker";

function AccountScreen() {
	const { trackEvent, trackScreenView } = useTrackEvent(); // Extract analytics instance from context
	const router = useRouter();
	const [accountInfo, setAccountInfo] = useState({});
	const { showLoader, hideLoader } = useContext(LoaderContext);

	useEffect(() => {
		showLoader("Loading Info...");
		trackScreenView("AccountScreen", "AccountScreen");
		getRequest("/account_info", {})
			.then((res) => {
				hideLoader();
				setAccountInfo(res.result);
				trackEvent("account-info-loaded", { email: res.result.email });
			})
			.catch(() => {
				hideLoader();
				trackEvent("account-info-load-failed", {});
			});
	}, []);

	const onLogout = () => {
		showLoader("Logging Out...");
		trackEvent("logout-clicked");
		AuthService.logout()
			.then(() => {
				signOut(getAuth())
					.then(() => {
						router.push("/signin");
						hideLoader();
						trackEvent("logout-success");
					})
					.catch(() => {
						hideLoader();
						trackEvent("logout-failure");
					});
			})
			.catch(() => {
				hideLoader();
				trackEvent("logout-failure");
			});
	};
	const manageSubscription = () => {
		if (accountInfo.subscription_plan === "free") {
			window.location.href = "/pricing";
			return;
		}
		getRequest("/manage_subscription")
			.then((res) => {
				window.location.href = res.result;
			})
			.catch((err) => {});
	};
	return (
		<>
			<Head>
				<title>DialogGPT Account</title>
				<link rel="canonical" href="https://dialogpt.io/account" />
				<meta name="description" content="DialogGPT Account Page" />
				<script type="application/ld+json">
					{JSON.stringify({
						"@context": "http://schema.org",
						"@type": "WebSite",
						name: "DialogGPT.io",
						url: "https://dialogpt.io/account",
						description: "DialogGPT Account Page",
					})}
				</script>
			</Head>

			<div className={styles.accountScreenContainer}>
				<h1 className={styles.accountHeader}>Account</h1>
				<div className={styles.itemContainer}>
					<h5>Usage</h5>
					<p>
						{"Messages Consumed: "}
						<strong>
							{accountInfo.message_used}
							{"/"}
							{accountInfo.message_limit}
						</strong>
					</p>
				</div>
				<div className={styles.itemContainer}>
					<h5>Your Email</h5>
					<p>{accountInfo.email}</p>
				</div>
				<div className={styles.subscriptionItemContainer}>
					<div>
						<h5>Current Plan</h5>
						<p>{accountInfo.subscription_plan?.toUpperCase()}</p>
					</div>

					<button
						className={styles.manageSubscriptionButton}
						onClick={manageSubscription}
					>
						{accountInfo.subscription_plan === "free" ? "Upgrade" : "Manage"}
					</button>
				</div>
				<div className={styles.logoutButton}>
					<LoadingButton title={"Sign Out"} onClick={onLogout}></LoadingButton>
				</div>
			</div>
		</>
	);
}

AccountScreen.showHeaderFooter = true;
export default AccountScreen;

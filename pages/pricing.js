import styles from "./styles/pricing.module.scss";
import Head from "next/head";
import PricingFAQs from "src/components/pricing-faqs/pricing-faqs";
import PricingPlan from "src/components/pricing-plan/pricing-plan";
import { PricingPlans } from "src/components/pricing-plan/pricing-plans.utils";
import { useEffect, useState } from "react";
import { getRequest } from "src/helper/http-helper";
import AuthService from "../src/helper/AuthService";
import { useTrackEvent } from "../src/helper/event-tracker";
import BottomTryNowComponent from "../src/components/bottom-try-now-component/bottom-try-now-component";
import ConfettiExplosion from "react-confetti-explosion";
function PricingScreen() {
	const { trackEvent, trackScreenView } = useTrackEvent(); // Extract analytics instance from context
	const [currentPlan, setCurrentPlan] = useState(null);

	useEffect(() => {
		trackScreenView("PricingScreen", "PricingScreen");
		if (AuthService.isAuthenticated()) {
			getRequest("/current_subscription_plan")
				.then((res) => {
					setCurrentPlan(res?.result);
					trackEvent("current_subscription_plan_loaded", { plan: res?.result });
				})
				.catch(() => {
					trackEvent("current_subscription_plan_load_failed", {});
				});
		}
	}, []);

	return (
		<>
			<Head>
				<title>Pricing Plans</title>
				<meta name="description" content="Pricing Plans for DialogGPT.io" />
				<link rel="canonical" href="https://dialoggpt.io/pricing" />
				<script type="application/ld+json">
					{JSON.stringify({
						"@context": "http://schema.org",
						"@type": "WebSite",
						name: "DialogGPT.io",
						url: "https://dialoggpt.io/privacy",
						description: "Pricing Plans for DialogGPT.io",
					})}
				</script>
			</Head>
			<div className={styles.pricingScreenContainer}>
				<h1 className={styles.pricingHeader}>Pricing Plans</h1>
				<div className={styles.pricingPlansContainer}>
					<PricingPlan plan={PricingPlans.FREE} currentPlan={currentPlan} />
					<PricingPlan
						plan={PricingPlans.ESSENTIAL}
						currentPlan={currentPlan}
					/>
					<ConfettiExplosion
						force={1.5}
						duration={5000}
						particleCount={250}
						width={3000}
					/>
					<PricingPlan plan={PricingPlans.PRO} currentPlan={currentPlan} />
				</div>

				<PricingFAQs />
				<BottomTryNowComponent />
			</div>
		</>
	);
}

PricingScreen.showHeaderFooter = true;
export default PricingScreen;

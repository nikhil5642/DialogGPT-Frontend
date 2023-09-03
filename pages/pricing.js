import styles from "./styles/pricing.module.scss";
import Head from "next/head";
import PricingFAQs from "src/components/pricing-faqs/pricing-faqs";
import PricingPlan from "src/components/pricing-plan/pricing-plan";
import { PricingPlans } from "src/components/pricing-plan/pricing-plans.utils";
import { useState } from "react";
import { getRequest } from "src/helper/http-helper";

export default function PricingScreen() {
	const [currentPlan, setCurrentPlan] = useState(null);
	getRequest("/current_subscription_plan").then((res) => {
		setCurrentPlan(res?.result);
	});
	return (
		<>
			<Head>
				<title>Account</title>
				<meta name="description" content="Your Account" />
				<link rel="canonical" href="https://dialoggpt.io/home" />
			</Head>
			<div className={styles.pricingScreenContainer}>
				<h1 className={styles.pricingHeader}>Pricing Plans</h1>
				<div className={styles.pricingPlansContainer}>
					<PricingPlan plan={PricingPlans.FREE} currentPlan={currentPlan} />
					<PricingPlan
						plan={PricingPlans.ESSENTIAL}
						currentPlan={currentPlan}
					/>
					<PricingPlan plan={PricingPlans.PRO} currentPlan={currentPlan} />
				</div>
				<PricingFAQs />
			</div>
		</>
	);
}

import styles from "./styles/pricing.module.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import PricingFAQs from "src/components/pricing-faqs/pricing-faqs";
import PricingPlan from "src/components/pricing-plan/pricing-plan";
import { PricingPlans } from "src/components/pricing-plan/pricing-plans.utils";

export default function PricingScreen() {
	const router = useRouter();

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
					<PricingPlan plan={PricingPlans.FREE} />
					<PricingPlan plan={PricingPlans.ESSENTIAL} />
					<PricingPlan plan={PricingPlans.PRO} />
				</div>
				<PricingFAQs />
			</div>
		</>
	);
}

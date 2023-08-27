import styles from "./pricing-plan.module.scss";
import { PricingPlans } from "./pricing-plans.utils";
import { useRouter } from "next/router";
import AuthService from "src/helper/AuthService";

function PricingPlan({ plan }) {
	const router = useRouter();
	const onButtonPress = () => {
		if (plan == PricingPlans.PRO) {
		} else if (plan == PricingPlans.ESSENTIAL) {
		} else {
			if (AuthService.isAuthenticated()) {
				router.push("/my-chatbots");
			} else {
				router.push("/signin");
			}
		}
	};
	return (
		<div className={styles.planCard}>
			<h3>{plan.name} Plan</h3>
			<ul className={styles.features}>
				{plan.features.map((feature, index) => (
					<li key={index} className={styles.tickWrapper}>
						<span className={styles.tick}>✓</span>
						<span className={styles.text}>{feature}</span>
					</li>
				))}
			</ul>
			<div className={styles.price}>{plan.price}</div>

			<button className={styles.subscribeBtn} onClick={onButtonPress}>
				{plan.buttonText}
			</button>
		</div>
	);
}

export default PricingPlan;

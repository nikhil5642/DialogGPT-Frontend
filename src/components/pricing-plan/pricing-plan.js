import styles from "./pricing-plan.module.scss";
import { useRouter } from "next/router";
import AuthService from "src/helper/AuthService";
import { postRequest } from "src/helper/http-helper";
import { loadStripe } from "@stripe/stripe-js";
import { PrivateKeys } from "../../helper/private-keys";
import { showErrorToast, showSuccessToast } from "src/helper/toast-helper";
const stripePromise = loadStripe(
	PrivateKeys.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);
function PricingPlan({ plan, currentPlan }) {
	const router = useRouter();
	const alreadySubscribed =
		currentPlan != PricingPlan.FREE && currentPlan == plan.id;
	const redirectToCheckout = async (sessionId) => {
		const stripe = await stripePromise;

		const result = await stripe.redirectToCheckout({
			sessionId: sessionId,
		});

		if (result.error) {
			showErrorToast(result.error.message);
		}
	};
	const onButtonPress = () => {
		if (alreadySubscribed) {
			showSuccessToast("You are already Subscribed to this Plan!");
		} else if (plan == PricingPlan.FREE) {
			if (AuthService.isAuthenticated()) {
				router.push("/my-chatbots");
			} else {
				router.push("/signin");
			}
		} else {
			postRequest("/create_checkout_session", {
				planId: plan.id,
			}).then((res) => {
				redirectToCheckout(res.result);
			});
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

			<button
				className={`${styles.subscribeBtn} ${
					alreadySubscribed ? styles.alreadySubscribed : ""
				}`}
				onClick={onButtonPress}
				disabled={alreadySubscribed}
			>
				{alreadySubscribed ? "Subscribed" : plan.buttonText}
			</button>
		</div>
	);
}

export default PricingPlan;

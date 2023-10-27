import styles from "./pricing-plan.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import AuthService from "src/helper/AuthService";
import { getRequest, postRequest } from "src/helper/http-helper";
import { loadStripe } from "@stripe/stripe-js";
import { PrivateKeys } from "../../helper/private-keys";
import { showErrorToast, showSuccessToast } from "src/helper/toast-helper";
import { useTrackEvent } from "../../helper/event-tracker";
import LoadingButton from "../loading-button/loading-button";
import { PricingTimeFrame } from "../pricing-widget/pricing-widget.utils";
const stripePromise = loadStripe(
	PrivateKeys.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);
function PricingPlan({ plan, currentPlan, timeFrame }) {
	const { trackEvent } = useTrackEvent();
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const alreadySubscribed =
		currentPlan != PricingPlan.FREE && currentPlan == plan.id;
	const redirectToCheckout = async (sessionId) => {
		trackEvent("stripe-checkout-initiated", { sessionId: sessionId });
		const stripe = await stripePromise;
		const result = await stripe.redirectToCheckout({
			sessionId: sessionId,
		});
		if (result.error) {
			showErrorToast(result.error.message);
			trackEvent("stripe-checkout-failure", {
				error: result.error,
				sessionId: sessionId,
				plan: plan.id,
				time: timeFrame,
			});
		} else {
			trackEvent("stripe-checkout-success", {
				sessionId: sessionId,
				plan: plan.id,
				time: timeFrame,
			});
		}
	};
	const onButtonPress = () => {
		trackEvent("pricing-subscribe-click", { plan: plan.id });
		if (alreadySubscribed) {
			setLoading(true);
			getRequest("/manage_subscription")
				.then((res) => {
					setLoading(false);
					window.location.href = res.result;
				})
				.catch((err) => {
					setLoading(false);
				});
			trackEvent("pricing-already-subscribed", {
				plan: plan.id,
				time: timeFrame,
			});
		} else if (!AuthService.isAuthenticated()) {
			router.push("/signin");
			trackEvent("pricing-not-authenticated", {
				plan: plan.id,
				time: timeFrame,
			});
		} else {
			setLoading(true);
			postRequest("/create_checkout_session", {
				planId: plan.id,
			})
				.then((res) => {
					setLoading(false);
					redirectToCheckout(res.result);
				})
				.catch((err) => {
					setLoading(false);
				});
			trackEvent("pricing-subscribe", { plan: plan.id });
		}
	};
	return (
		<div className={styles.planCard}>
			<h3>{plan.name} Plan</h3>
			{plan.id == "essential" && (
				<div className={styles.popularTag}>Most Popular</div>
			)}
			{/* {plan.id == "basic" && (
				<div className={styles.popularTag}>Free Trial</div>
			)} */}
			<ul className={styles.features}>
				{plan.features.map((feature, index) => (
					<li key={index} className={styles.tickWrapper}>
						<span className={styles.tick}>✓</span>
						<span className={styles.text}>{feature}</span>
					</li>
				))}
			</ul>

			<div className={styles.price}>
				{timeFrame == PricingTimeFrame.MONTLY
					? plan.monthlyPrice
					: plan.yearlyPrice}
			</div>

			<LoadingButton
				backgroundColour={plan.id == "basic" ? "#4169E1" : "#101828"}
				onClick={onButtonPress}
				isLoading={loading}
				title={alreadySubscribed ? "Manage Subscription" : plan.buttonText}
			/>
		</div>
	);
}

export default PricingPlan;

import React, { useState, useEffect, useContext } from "react";
import styles from "./pricing-widget.module.scss";
import PricingPlan from "../pricing-plan//pricing-plan";
import { PricingPlans } from "../pricing-plan/pricing-plans.utils";
import { getRequest } from "../../helper/http-helper";
import AuthService from "../../helper/AuthService";
import { useTrackEvent } from "../../helper/event-tracker";
import LoaderContext from "../loader/loader-context";
import { PricingTimeFrame } from "./pricing-widget.utils";

function PricingWidget() {
	const [currentPlan, setCurrentPlan] = useState(null);
	const { trackEvent, trackScreenView } = useTrackEvent();
	const { showLoader, hideLoader } = useContext(LoaderContext);
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
	const [timeFrame, setTimeFrame] = useState(PricingTimeFrame.MONTLY);
	return (
		<div className={styles.pricingWidgetContainer}>
			<div className={styles.timeFrameContainer}>
				<div
					onClick={() => setTimeFrame(PricingTimeFrame.MONTLY)}
					className={
						timeFrame == PricingTimeFrame.MONTLY ? styles.selected : styles
					}
				>
					Montly Billing
				</div>
				<div
					onClick={() => setTimeFrame(PricingTimeFrame.YEARLY)}
					className={
						timeFrame == PricingTimeFrame.YEARLY ? styles.selected : null
					}
				>
					Yearly Billing
				</div>
			</div>
			<div className={styles.pricingPlansContainer}>
				<PricingPlan
					plan={PricingPlans.FREE}
					currentPlan={currentPlan}
					timeFrame={timeFrame}
				/>
				<PricingPlan
					plan={PricingPlans.BASIC}
					currentPlan={currentPlan}
					timeFrame={timeFrame}
				/>
				<PricingPlan
					plan={PricingPlans.ESSENTIAL}
					currentPlan={currentPlan}
					timeFrame={timeFrame}
				/>
				<PricingPlan
					plan={PricingPlans.PRO}
					currentPlan={currentPlan}
					timeFrame={timeFrame}
				/>
			</div>
		</div>
	);
}

export default PricingWidget;

import { logEvent } from "firebase/analytics";
import { useFirebase } from "./firebase-provider";

import "firebase/app";
export const useTrackEvent = () => {
	const { analytics } = useFirebase();

	const trackEvent = (eventName, params = {}) => {
		if (analytics) {
			logEvent(analytics, eventName, params);
		}
	};

	const trackScreenView = (screenName, screenClass = "default") => {
		if (analytics) {
			logEvent(analytics, "screen_view", {
				screen_name: screenName,
				screen_class: screenClass,
			});
		}
	};

	return {
		trackEvent,
		trackScreenView,
	};
};

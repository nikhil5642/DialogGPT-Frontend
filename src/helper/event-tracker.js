import { logEvent, logScreenView } from "firebase/analytics";
import { useFirebase } from "./firebase-provider";

import "firebase/app";
export const useTrackEvent = () => {
	const { analytics } = useFirebase();

	const trackEvent = (eventName, params = {}) => {
		if (analytics && analytics.logEvent) {
			logEvent(analytics, eventName, params);
		}
	};

	const trackScreenView = (screenName, screenClass = "default") => {
		if (analytics && analytics.logScreenView) {
			logScreenView(analytics, screenName, screenClass);
		}
	};

	return {
		trackEvent,
		trackScreenView,
	};
};

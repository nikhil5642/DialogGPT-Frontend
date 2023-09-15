import { logEvent } from "firebase/analytics";
import { useFirebase } from "./firebase-provider";

export const useTrackEvent = () => {
	const { analytics } = useFirebase();

	const trackEvent = (eventName, params = {}) => {
		if (analytics) {
			logEvent(analytics, eventName, params);
		}
	};

	return trackEvent;
};

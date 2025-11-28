import {useCallback} from "react";

interface AnalyticsEvent {
	event: string;
	properties?: Record<string, unknown>;
}

export const useAnalytics = () => {
	const trackEvent = useCallback(
		(eventName: string, properties?: Record<string, unknown>) => {
			const event: AnalyticsEvent = {
				event: eventName,
				properties: {
					...properties,
					timestamp: new Date().toISOString(),
					url: window.location.href,
				},
			};

			// Log to console for development
			console.log("📊 Analytics Event:", event);

			// Send to Google Analytics if available
			if (typeof window !== "undefined" && (window as any).gtag) {
				(window as any).gtag("event", eventName, properties);
			}

			// Send to Mixpanel if available
			if (typeof window !== "undefined" && (window as any).mixpanel) {
				(window as any).mixpanel.track(eventName, properties);
			}
		},
		[]
	);

	const trackPageView = useCallback(
		(pageName: string) => {
			trackEvent("page_view", {page: pageName});
		},
		[trackEvent]
	);

	const trackButtonClick = useCallback(
		(buttonName: string, additionalProps?: Record<string, unknown>) => {
			trackEvent("button_click", {button: buttonName, ...additionalProps});
		},
		[trackEvent]
	);

	return {
		trackEvent,
		trackPageView,
		trackButtonClick,
	};
};

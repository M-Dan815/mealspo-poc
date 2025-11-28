import React, {createContext, useContext, ReactNode, useCallback} from "react";
import {AnalyticsEvent} from "../types";

interface AnalyticsContextType {
	trackEvent: (eventName: string, properties?: Record<string, any>) => void;
	trackPageView: (pageName: string) => void;
	trackButtonClick: (buttonName: string, location?: string) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(
	undefined
);

export const AnalyticsProvider: React.FC<{children: ReactNode}> = ({
	children,
}) => {
	const trackEvent = useCallback(
		(eventName: string, properties?: Record<string, any>) => {
			const event: AnalyticsEvent = {
				eventName,
				properties,
				timestamp: new Date(),
			};

			// Log to console in development
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
		(buttonName: string, location?: string) => {
			trackEvent("button_click", {button: buttonName, location});
		},
		[trackEvent]
	);

	return (
		<AnalyticsContext.Provider
			value={{trackEvent, trackPageView, trackButtonClick}}
		>
			{children}
		</AnalyticsContext.Provider>
	);
};

export const useAnalytics = (): AnalyticsContextType => {
	const context = useContext(AnalyticsContext);
	if (!context) {
		throw new Error("useAnalytics must be used within an AnalyticsProvider");
	}
	return context;
};

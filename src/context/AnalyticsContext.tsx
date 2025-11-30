import React, {createContext, useContext, ReactNode, useCallback} from "react";

interface AnalyticsContextType {
	trackEvent: (eventName: string, properties?: Record<string, any>) => void;
	trackPageView: (pageName: string) => void;
	trackButtonClick: (buttonName: string, location?: string) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(
	undefined
);

// Declare gtag for TypeScript
declare global {
	interface Window {
		gtag: (
			command: string,
			action: string,
			params?: Record<string, any>
		) => void;
		dataLayer: any[];
	}
}

export const AnalyticsProvider: React.FC<{children: ReactNode}> = ({
	children,
}) => {
	const trackEvent = useCallback(
		(eventName: string, properties?: Record<string, any>) => {
			// Console log for development
			console.log("📊 Analytics Event:", eventName, properties);

			// Google Analytics
			if (typeof window !== "undefined" && window.gtag) {
				window.gtag("event", eventName, {
					...properties,
					timestamp: new Date().toISOString(),
				});
			}
		},
		[]
	);

	const trackPageView = useCallback((pageName: string) => {
		console.log("📄 Page View:", pageName);

		if (typeof window !== "undefined" && window.gtag) {
			window.gtag("event", "page_view", {
				page_title: pageName,
				page_location: window.location.href,
			});
		}
	}, []);

	const trackButtonClick = useCallback(
		(buttonName: string, location?: string) => {
			trackEvent("button_click", {
				button_name: buttonName,
				location: location || "unknown",
			});
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
	if (context === undefined) {
		throw new Error("useAnalytics must be used within an AnalyticsProvider");
	}
	return context;
};

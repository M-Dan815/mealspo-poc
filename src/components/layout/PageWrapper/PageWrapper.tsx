import React, {useEffect} from "react";
import {useAnalytics} from "../../../context/AnalyticsContext";
import styles from "./PageWrapper.module.css";

interface PageWrapperProps {
	children: React.ReactNode;
	pageName: string;
	hasHeader?: boolean;
	hasBottomNav?: boolean;
	className?: string;
	scrollable?: boolean;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
	children,
	pageName,
	hasHeader = true,
	hasBottomNav = true,
	className = "",
	scrollable = true,
}) => {
	const {trackPageView} = useAnalytics();

	useEffect(() => {
		trackPageView(pageName);
	}, [pageName, trackPageView]);

	const classNames = [
		styles.pageWrapper,
		hasHeader ? styles.hasHeader : "",
		hasBottomNav ? styles.hasBottomNav : "",
		scrollable ? styles.scrollable : "",
		className,
	]
		.filter(Boolean)
		.join(" ");

	return <main className={classNames}>{children}</main>;
};

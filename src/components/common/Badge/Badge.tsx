import React from "react";
import styles from "./Badge.module.css";

interface BadgeProps {
	children: React.ReactNode;
	variant?: "default" | "primary" | "success" | "warning" | "error";
	size?: "small" | "medium";
	className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
	children,
	variant = "default",
	size = "small",
	className = "",
}) => {
	const classNames = [styles.badge, styles[variant], styles[size], className]
		.filter(Boolean)
		.join(" ");

	return <span className={classNames}>{children}</span>;
};

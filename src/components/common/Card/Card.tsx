import React from "react";
import styles from "./Card.module.css";

interface CardProps {
	children: React.ReactNode;
	onClick?: () => void;
	className?: string;
	padding?: "none" | "small" | "medium" | "large";
	shadow?: "none" | "small" | "medium" | "large";
}

export const Card: React.FC<CardProps> = ({
	children,
	onClick,
	className = "",
	padding = "medium",
	shadow = "small",
}) => {
	const classNames = [
		styles.card,
		styles[`padding-${padding}`],
		styles[`shadow-${shadow}`],
		onClick ? styles.clickable : "",
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<div className={classNames} onClick={onClick}>
			{children}
		</div>
	);
};

import React from "react";
import styles from "./IconButton.module.css";

interface IconButtonProps {
	icon: React.ReactNode;
	onClick?: () => void;
	variant?: "default" | "primary" | "ghost" | "overlay";
	size?: "small" | "medium" | "large";
	disabled?: boolean;
	className?: string;
	ariaLabel: string;
	badge?: number;
}

export const IconButton: React.FC<IconButtonProps> = ({
	icon,
	onClick,
	variant = "default",
	size = "medium",
	disabled = false,
	className = "",
	ariaLabel,
	badge,
}) => {
	const classNames = [
		styles.iconButton,
		styles[variant],
		styles[size],
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<button
			className={classNames}
			onClick={onClick}
			disabled={disabled}
			aria-label={ariaLabel}
		>
			{icon}
			{badge !== undefined && badge > 0 && (
				<span className={styles.badge}>{badge > 99 ? "99+" : badge}</span>
			)}
		</button>
	);
};

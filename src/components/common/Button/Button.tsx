import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
	children: React.ReactNode;
	variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
	size?: "small" | "medium" | "large";
	fullWidth?: boolean;
	disabled?: boolean;
	loading?: boolean;
	icon?: React.ReactNode;
	iconPosition?: "left" | "right";
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
	className?: string;
}

export const Button: React.FC<ButtonProps> = ({
	children,
	variant = "primary",
	size = "medium",
	fullWidth = false,
	disabled = false,
	loading = false,
	icon,
	iconPosition = "left",
	onClick,
	type = "button",
	className = "",
}) => {
	const classNames = [
		styles.button,
		styles[variant],
		styles[size],
		fullWidth ? styles.fullWidth : "",
		loading ? styles.loading : "",
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<button
			type={type}
			className={classNames}
			onClick={onClick}
			disabled={disabled || loading}
		>
			{loading ? (
				<span className={styles.spinner} />
			) : (
				<>
					{icon && iconPosition === "left" && (
						<span className={styles.icon}>{icon}</span>
					)}
					<span className={styles.text}>{children}</span>
					{icon && iconPosition === "right" && (
						<span className={styles.icon}>{icon}</span>
					)}
				</>
			)}
		</button>
	);
};

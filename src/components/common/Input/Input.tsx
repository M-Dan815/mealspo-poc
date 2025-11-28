import React, {forwardRef} from "react";
import styles from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	icon?: React.ReactNode;
	iconPosition?: "left" | "right";
	fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			label,
			error,
			icon,
			iconPosition = "left",
			fullWidth = true,
			className = "",
			...props
		},
		ref
	) => {
		const containerClasses = [
			styles.container,
			fullWidth ? styles.fullWidth : "",
			className,
		]
			.filter(Boolean)
			.join(" ");

		const inputWrapperClasses = [
			styles.inputWrapper,
			error ? styles.hasError : "",
			icon ? styles.hasIcon : "",
			icon && iconPosition === "right" ? styles.iconRight : "",
		]
			.filter(Boolean)
			.join(" ");

		return (
			<div className={containerClasses}>
				{label && <label className={styles.label}>{label}</label>}
				<div className={inputWrapperClasses}>
					{icon && iconPosition === "left" && (
						<span className={styles.icon}>{icon}</span>
					)}
					<input ref={ref} className={styles.input} {...props} />
					{icon && iconPosition === "right" && (
						<span className={styles.icon}>{icon}</span>
					)}
				</div>
				{error && <span className={styles.error}>{error}</span>}
			</div>
		);
	}
);

Input.displayName = "Input";

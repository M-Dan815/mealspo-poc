import React from "react";
import styled, {css} from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "outline" | "ghost";
	size?: "sm" | "md" | "lg";
	fullWidth?: boolean;
	icon?: React.ReactNode;
	loading?: boolean;
}

const sizeStyles = {
	sm: css`
		padding: 8px 16px;
		font-size: 13px;
		border-radius: var(--radius-md);
	`,
	md: css`
		padding: 12px 24px;
		font-size: 15px;
		border-radius: var(--radius-lg);
	`,
	lg: css`
		padding: 16px 32px;
		font-size: 17px;
		border-radius: var(--radius-xl);
	`,
};

const variantStyles = {
	primary: css`
		background: linear-gradient(
			135deg,
			var(--primary) 0%,
			var(--primary-dark) 100%
		);
		color: white;
		border: none;
		box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);

		&:hover:not(:disabled) {
			box-shadow: 0 6px 16px rgba(255, 107, 53, 0.4);
			transform: translateY(-1px);
		}

		&:active:not(:disabled) {
			transform: translateY(0);
		}
	`,
	secondary: css`
		background: var(--text-primary);
		color: white;
		border: none;

		&:hover:not(:disabled) {
			background: #333;
		}
	`,
	outline: css`
		background: transparent;
		color: var(--primary);
		border: 2px solid var(--primary);

		&:hover:not(:disabled) {
			background: rgba(255, 107, 53, 0.1);
		}
	`,
	ghost: css`
		background: transparent;
		color: var(--text-primary);
		border: none;

		&:hover:not(:disabled) {
			background: rgba(0, 0, 0, 0.05);
		}
	`,
};

const StyledButton = styled.button<ButtonProps>`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	font-weight: 600;
	cursor: pointer;
	transition: var(--transition);
	white-space: nowrap;

	${({size = "md"}) => sizeStyles[size]}
	${({variant = "primary"}) => variantStyles[variant]}
  ${({fullWidth}) =>
		fullWidth &&
		css`
			width: 100%;
		`}
  
  &:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

const LoadingSpinner = styled.span`
	width: 16px;
	height: 16px;
	border: 2px solid rgba(255, 255, 255, 0.3);
	border-top-color: white;
	border-radius: 50%;
	animation: spin 0.8s linear infinite;

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
`;

export const Button: React.FC<ButtonProps> = ({
	children,
	icon,
	loading,
	disabled,
	...props
}) => {
	return (
		<StyledButton disabled={disabled || loading} {...props}>
			{loading ? <LoadingSpinner /> : icon}
			{children}
		</StyledButton>
	);
};

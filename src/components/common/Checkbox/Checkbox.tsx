import React from "react";
import {Check} from "lucide-react";
import styles from "./Checkbox.module.css";

interface CheckboxProps {
	checked: boolean;
	onChange: (checked: boolean) => void;
	label?: string;
	disabled?: boolean;
	className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
	checked,
	onChange,
	label,
	disabled = false,
	className = "",
}) => {
	const handleClick = () => {
		if (!disabled) {
			onChange(!checked);
		}
	};

	const containerClasses = [
		styles.container,
		disabled ? styles.disabled : "",
		className,
	]
		.filter(Boolean)
		.join(" ");

	const checkboxClasses = [styles.checkbox, checked ? styles.checked : ""]
		.filter(Boolean)
		.join(" ");

	return (
		<div className={containerClasses} onClick={handleClick}>
			<div className={checkboxClasses}>
				{checked && <Check size={14} strokeWidth={3} />}
			</div>
			{label && <span className={styles.label}>{label}</span>}
		</div>
	);
};

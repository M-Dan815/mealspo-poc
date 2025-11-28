import React from "react";
import styles from "./Toggle.module.css";

interface ToggleProps {
	checked: boolean;
	onChange: (checked: boolean) => void;
	label?: string;
	disabled?: boolean;
	className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
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

	const toggleClasses = [styles.toggle, checked ? styles.checked : ""]
		.filter(Boolean)
		.join(" ");

	return (
		<div className={containerClasses} onClick={handleClick}>
			{label && <span className={styles.label}>{label}</span>}
			<div className={toggleClasses}>
				<div className={styles.thumb} />
			</div>
		</div>
	);
};

import React from "react";
import {ShoppingCart} from "lucide-react";
import {useApp} from "../../../context/AppContext";
import {useAnalytics} from "../../../context/AnalyticsContext";
import styles from "./FloatingButton.module.css";

interface FloatingButtonProps {
	onClick?: () => void;
	icon?: React.ReactNode;
	label?: string;
	showBadge?: boolean;
	badgeCount?: number;
	position?: "bottom-right" | "bottom-center";
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({
	onClick,
	icon = <ShoppingCart size={24} />,
	label,
	showBadge = false,
	badgeCount = 0,
	position = "bottom-right",
}) => {
	const {navigate} = useApp();
	const {trackButtonClick} = useAnalytics();

	const handleClick = () => {
		trackButtonClick("floating_button", "fab");
		if (onClick) {
			onClick();
		} else {
			navigate("basket");
		}
	};

	const buttonClasses = [
		styles.floatingButton,
		styles[position],
		label ? styles.extended : "",
	]
		.filter(Boolean)
		.join(" ");

	return (
		<button className={buttonClasses} onClick={handleClick}>
			<span className={styles.iconWrapper}>
				{icon}
				{showBadge && badgeCount > 0 && (
					<span className={styles.badge}>
						{badgeCount > 99 ? "99+" : badgeCount}
					</span>
				)}
			</span>
			{label && <span className={styles.label}>{label}</span>}
		</button>
	);
};

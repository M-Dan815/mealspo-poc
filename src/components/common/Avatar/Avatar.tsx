import React from "react";
import styles from "./Avatar.module.css";

interface AvatarProps {
	src: string;
	alt: string;
	size?: "xsmall" | "small" | "medium" | "large" | "xlarge";
	onClick?: () => void;
	className?: string;
	showBorder?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
	src,
	alt,
	size = "medium",
	onClick,
	className = "",
	showBorder = false,
}) => {
	const classNames = [
		styles.avatar,
		styles[size],
		showBorder ? styles.bordered : "",
		onClick ? styles.clickable : "",
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<div className={classNames} onClick={onClick}>
			<img src={src} alt={alt} className={styles.image} />
		</div>
	);
};

import React from "react";
import styles from "./Skeleton.module.css";

interface SkeletonProps {
	width?: string | number;
	height?: string | number;
	variant?: "text" | "circular" | "rectangular" | "rounded";
	className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
	width = "100%",
	height = "20px",
	variant = "text",
	className = "",
}) => {
	const style: React.CSSProperties = {
		width: typeof width === "number" ? `${width}px` : width,
		height: typeof height === "number" ? `${height}px` : height,
	};

	const classNames = [styles.skeleton, styles[variant], className]
		.filter(Boolean)
		.join(" ");

	return <div className={classNames} style={style} />;
};

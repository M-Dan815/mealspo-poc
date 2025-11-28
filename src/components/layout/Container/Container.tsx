import React from "react";
import styles from "./Container.module.css";

interface ContainerProps {
	children: React.ReactNode;
	className?: string;
	noPadding?: boolean;
	fullHeight?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
	children,
	className = "",
	noPadding = false,
	fullHeight = false,
}) => {
	const classNames = [
		styles.container,
		noPadding ? styles.noPadding : "",
		fullHeight ? styles.fullHeight : "",
		className,
	]
		.filter(Boolean)
		.join(" ");

	return <div className={classNames}>{children}</div>;
};

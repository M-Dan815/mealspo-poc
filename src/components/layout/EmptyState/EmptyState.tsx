import React from "react";
import {Button} from "../../common/Button";
import styles from "./EmptyState.module.css";

interface EmptyStateProps {
	icon: React.ReactNode;
	title: string;
	description?: string;
	actionLabel?: string;
	onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
	icon,
	title,
	description,
	actionLabel,
	onAction,
}) => {
	return (
		<div className={styles.emptyState}>
			<div className={styles.iconWrapper}>{icon}</div>
			<h3 className={styles.title}>{title}</h3>
			{description && <p className={styles.description}>{description}</p>}
			{actionLabel && onAction && (
				<Button onClick={onAction} variant="primary" size="medium">
					{actionLabel}
				</Button>
			)}
		</div>
	);
};

import React, {useEffect} from "react";
import {X} from "lucide-react";
import {IconButton} from "../IconButton";
import styles from "./Modal.module.css";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	title?: string;
	showCloseButton?: boolean;
	size?: "small" | "medium" | "large" | "fullscreen";
	position?: "center" | "bottom";
}

export const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	children,
	title,
	showCloseButton = true,
	size = "medium",
	position = "center",
}) => {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscape);
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	const modalClasses = [styles.modal, styles[size], styles[position]]
		.filter(Boolean)
		.join(" ");

	return (
		<div className={styles.overlay} onClick={onClose}>
			<div className={modalClasses} onClick={(e) => e.stopPropagation()}>
				{(title || showCloseButton) && (
					<div className={styles.header}>
						{title && <h2 className={styles.title}>{title}</h2>}
						{showCloseButton && (
							<IconButton
								icon={<X size={20} />}
								onClick={onClose}
								variant="ghost"
								size="small"
								ariaLabel="Close modal"
								className={styles.closeButton}
							/>
						)}
					</div>
				)}
				<div className={styles.content}>{children}</div>
			</div>
		</div>
	);
};

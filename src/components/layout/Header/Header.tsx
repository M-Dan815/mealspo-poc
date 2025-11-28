import React from "react";
import {
	ArrowLeft,
	Plus,
	Share2,
	Settings,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import {IconButton} from "../../common/IconButton";
import {useApp} from "../../../context/AppContext";
import {useAnalytics} from "../../../context/AnalyticsContext";
import styles from "./Header.module.css";

interface HeaderProps {
	variant?: "home" | "detail" | "profile" | "planner" | "basket" | "simple";
	title?: string;
	showBack?: boolean;
	showUpload?: boolean;
	showShare?: boolean;
	showSettings?: boolean;
	showWeekNav?: boolean;
	onBack?: () => void;
	onUpload?: () => void;
	onShare?: () => void;
	onSettings?: () => void;
	onPrevWeek?: () => void;
	onNextWeek?: () => void;
	transparent?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
	variant = "home",
	title,
	showBack = false,
	showUpload = false,
	showShare = false,
	showSettings = false,
	showWeekNav = false,
	onBack,
	onUpload,
	onShare,
	onSettings,
	onPrevWeek,
	onNextWeek,
	transparent = false,
}) => {
	const {goBack, triggerPopup} = useApp();
	const {trackButtonClick} = useAnalytics();

	const handleBack = () => {
		trackButtonClick("back_button", variant);
		if (onBack) {
			onBack();
		} else {
			goBack();
		}
	};

	const handleUpload = () => {
		trackButtonClick("upload_button", "header");
		if (onUpload) {
			onUpload();
		} else {
			triggerPopup("upload");
		}
	};

	const handleShare = () => {
		trackButtonClick("share_button", "header");
		if (onShare) {
			onShare();
		}
	};

	const handleSettings = () => {
		trackButtonClick("settings_button", "header");
		if (onSettings) {
			onSettings();
		}
	};

	const headerClasses = [styles.header, transparent ? styles.transparent : ""]
		.filter(Boolean)
		.join(" ");

	const renderLeftSection = () => {
		if (showBack) {
			return (
				<IconButton
					icon={<ArrowLeft size={24} />}
					onClick={handleBack}
					variant={transparent ? "overlay" : "ghost"}
					ariaLabel="Go back"
				/>
			);
		}

		if (variant === "home") {
			return (
				<div className={styles.logo}>
					<span className={styles.logoText}>MealSpo</span>
				</div>
			);
		}

		return <div className={styles.placeholder} />;
	};

	const renderCenterSection = () => {
		if (showWeekNav) {
			return (
				<div className={styles.weekNav}>
					<IconButton
						icon={<ChevronLeft size={20} />}
						onClick={onPrevWeek}
						variant="ghost"
						size="small"
						ariaLabel="Previous week"
					/>
					<span className={styles.title}>{title || "This Week"}</span>
					<IconButton
						icon={<ChevronRight size={20} />}
						onClick={onNextWeek}
						variant="ghost"
						size="small"
						ariaLabel="Next week"
					/>
				</div>
			);
		}

		if (title) {
			return <h1 className={styles.title}>{title}</h1>;
		}

		if (variant === "home") {
			return <span className={styles.centerText}>Home</span>;
		}

		return null;
	};

	const renderRightSection = () => {
		return (
			<div className={styles.rightActions}>
				{showShare && (
					<IconButton
						icon={<Share2 size={22} />}
						onClick={handleShare}
						variant={transparent ? "overlay" : "ghost"}
						ariaLabel="Share"
					/>
				)}
				{showSettings && (
					<IconButton
						icon={<Settings size={22} />}
						onClick={handleSettings}
						variant="ghost"
						ariaLabel="Settings"
					/>
				)}
				{showUpload && (
					<IconButton
						icon={<Plus size={24} />}
						onClick={handleUpload}
						variant="primary"
						ariaLabel="Upload recipe"
					/>
				)}
				{!showShare && !showSettings && !showUpload && (
					<div className={styles.placeholder} />
				)}
			</div>
		);
	};

	return (
		<header className={headerClasses}>
			<div className={styles.container}>
				<div className={styles.left}>{renderLeftSection()}</div>
				<div className={styles.center}>{renderCenterSection()}</div>
				<div className={styles.right}>{renderRightSection()}</div>
			</div>
		</header>
	);
};

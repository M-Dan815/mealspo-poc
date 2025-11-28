import React, {useState, useEffect} from "react";
import {
	Mail,
	Gift,
	X,
	Instagram,
	CheckCircle,
	ExternalLink,
	Search,
	Trash2,
} from "lucide-react";
import {Button} from "../common/Button";
import {Input} from "../common/Input";
import {Recipe, MealSlot} from "../../types";
import {useApp} from "../../context/AppContext";
import {useAnalytics} from "../../context/AnalyticsContext";
import {searchRecipes} from "../../data/mockRecipes";
import {getMealTypeLabel, getDayFullLabel} from "../../data/mockMealPlan";
import styles from "./Popups.module.css";

// ============================================
// EMAIL POPUP
// ============================================
interface EmailPopupProps {
	onSuccess: () => void;
	onClose: () => void;
	variant?: "timer" | "action";
}

export const EmailPopup: React.FC<EmailPopupProps> = ({
	onSuccess,
	onClose,
	variant = "timer",
}) => {
	const {dispatch} = useApp();
	const {trackEvent, trackButtonClick} = useAnalytics();
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const validateEmail = (email: string): boolean => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email.trim()) {
			setError("Please enter your email");
			return;
		}

		if (!validateEmail(email)) {
			setError("Please enter a valid email");
			return;
		}

		setIsLoading(true);
		setError("");

		trackEvent("email_capture", {email, trigger: variant});
		await new Promise((resolve) => setTimeout(resolve, 1000));

		dispatch({type: "SET_EMAIL_CAPTURED"});
		setIsLoading(false);
		onSuccess();
	};

	const handleClose = () => {
		trackButtonClick("popup_close", "email_popup");
		onClose();
	};

	const isTimer = variant === "timer";

	return (
		<div className={styles.overlay} onClick={handleClose}>
			<div className={styles.popup} onClick={(e) => e.stopPropagation()}>
				<button className={styles.closeButton} onClick={handleClose}>
					<X size={24} />
				</button>

				<div className={styles.iconWrapper}>
					{isTimer ? <Gift size={48} /> : <Mail size={48} />}
				</div>

				<h2 className={styles.title}>
					{isTimer ? "Get 6 Months Free! 🎉" : "Join MealSpo"}
				</h2>
				<p className={styles.subtitle}>
					{isTimer
						? "Join early access and be the first to discover amazing recipes from creators worldwide."
						: "Enter your email to unlock this feature and get early access to all premium features."}
				</p>

				<form onSubmit={handleSubmit} className={styles.form}>
					<Input
						type="email"
						placeholder="Enter your email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						error={error}
						icon={<Mail size={20} />}
						fullWidth
					/>
					<Button
						type="submit"
						variant="primary"
						size="large"
						fullWidth
						loading={isLoading}
					>
						{isTimer ? "Claim My Free Access" : "Get Early Access"}
					</Button>
				</form>

				<p className={styles.terms}>
					By signing up, you agree to our{" "}
					<span className={styles.link}>Terms</span> and{" "}
					<span className={styles.link}>Privacy Policy</span>
				</p>

				<div className={styles.features}>
					<div className={styles.feature}>
						<span>🍳</span>
						<span>Unlimited recipes</span>
					</div>
					<div className={styles.feature}>
						<span>📅</span>
						<span>Meal planning</span>
					</div>
					<div className={styles.feature}>
						<span>🛒</span>
						<span>Smart shopping lists</span>
					</div>
				</div>
			</div>
		</div>
	);
};

// ============================================
// INSTAGRAM POPUP
// ============================================
interface InstagramPopupProps {
	onClose: () => void;
}

export const InstagramPopup: React.FC<InstagramPopupProps> = ({onClose}) => {
	const {trackButtonClick, trackEvent} = useAnalytics();

	const handleFollowClick = () => {
		trackButtonClick("follow_instagram", "instagram_popup");
		trackEvent("instagram_follow_click", {});
		window.open("https://instagram.com/mealspo", "_blank");
	};

	const handleSkip = () => {
		trackButtonClick("skip_instagram", "instagram_popup");
		onClose();
	};

	return (
		<div className={styles.overlay}>
			<div className={styles.popup}>
				<div className={styles.successBadge}>
					<CheckCircle size={24} />
					<span>You're In!</span>
				</div>

				<div className={styles.instagramIcon}>
					<Instagram size={48} />
				</div>

				<h2 className={styles.title}>Follow Us on Instagram</h2>
				<p className={styles.subtitle}>
					Join our community for daily recipe inspiration, cooking tips, and
					exclusive content!
				</p>

				<div className={styles.previewGrid}>
					<div className={styles.previewItem}>
						<img
							src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop"
							alt="Recipe"
						/>
					</div>
					<div className={styles.previewItem}>
						<img
							src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=200&h=200&fit=crop"
							alt="Recipe"
						/>
					</div>
					<div className={styles.previewItem}>
						<img
							src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=200&fit=crop"
							alt="Recipe"
						/>
					</div>
				</div>

				<div className={styles.igStats}>
					<div className={styles.igStatItem}>
						<span className={styles.igStatValue}>50K+</span>
						<span className={styles.igStatLabel}>Followers</span>
					</div>
					<div className={styles.igStatDivider} />
					<div className={styles.igStatItem}>
						<span className={styles.igStatValue}>1K+</span>
						<span className={styles.igStatLabel}>Recipes</span>
					</div>
					<div className={styles.igStatDivider} />
					<div className={styles.igStatItem}>
						<span className={styles.igStatValue}>Daily</span>
						<span className={styles.igStatLabel}>Posts</span>
					</div>
				</div>

				<div className={styles.actions}>
					<Button
						variant="primary"
						size="large"
						fullWidth
						icon={<ExternalLink size={18} />}
						iconPosition="right"
						onClick={handleFollowClick}
					>
						Follow @mealspo
					</Button>
					<button className={styles.skipButton} onClick={handleSkip}>
						Maybe later
					</button>
				</div>
			</div>
		</div>
	);
};

// ============================================
// SUCCESS TOAST
// ============================================
interface SuccessToastProps {
	message: string;
	onClose: () => void;
	autoCloseDelay?: number;
}

export const SuccessToast: React.FC<SuccessToastProps> = ({
	message,
	onClose,
	autoCloseDelay = 2500,
}) => {
	useEffect(() => {
		const timer = setTimeout(onClose, autoCloseDelay);
		return () => clearTimeout(timer);
	}, [autoCloseDelay, onClose]);

	return (
		<div className={styles.toastContainer}>
			<div className={styles.toast}>
				<CheckCircle size={20} />
				<span>{message}</span>
				<button className={styles.toastClose} onClick={onClose}>
					<X size={16} />
				</button>
			</div>
		</div>
	);
};

// ============================================
// POPUP MANAGER
// ============================================
type PopupState = "email" | "instagram" | "success" | null;

export const PopupManager: React.FC = () => {
	const {state, dispatch} = useApp();
	const [currentPopup, setCurrentPopup] = useState<PopupState>(null);
	const [successMessage, setSuccessMessage] = useState("");

	useEffect(() => {
		if (state.showPopup && !state.emailCaptured) {
			setCurrentPopup("email");
		}
	}, [state.showPopup, state.emailCaptured]);

	const handleEmailSuccess = () => {
		setCurrentPopup("instagram");
	};

	const handleEmailClose = () => {
		setCurrentPopup(null);
		dispatch({type: "HIDE_POPUP"});
	};

	const handleInstagramClose = () => {
		setSuccessMessage("Welcome to MealSpo! 🎉");
		setCurrentPopup("success");
		dispatch({type: "HIDE_POPUP"});
	};

	const handleSuccessClose = () => {
		setCurrentPopup(null);
		setSuccessMessage("");
	};

	if (!currentPopup) return null;

	return (
		<>
			{currentPopup === "email" && (
				<EmailPopup
					onSuccess={handleEmailSuccess}
					onClose={handleEmailClose}
					variant={state.popupTrigger === "timer" ? "timer" : "action"}
				/>
			)}
			{currentPopup === "instagram" && (
				<InstagramPopup onClose={handleInstagramClose} />
			)}
			{currentPopup === "success" && successMessage && (
				<SuccessToast message={successMessage} onClose={handleSuccessClose} />
			)}
		</>
	);
};

// ============================================
// BOTTOM SHEET
// ============================================
interface BottomSheetProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
	height?: "auto" | "half" | "full";
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
	isOpen,
	onClose,
	title,
	children,
	height = "auto",
}) => {
	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div className={styles.sheetOverlay} onClick={onClose}>
			<div
				className={`${styles.sheet} ${styles[`sheet-${height}`]}`}
				onClick={(e) => e.stopPropagation()}
			>
				<div className={styles.sheetHandle} />
				{title && (
					<div className={styles.sheetHeader}>
						<h3 className={styles.sheetTitle}>{title}</h3>
						<button className={styles.sheetClose} onClick={onClose}>
							<X size={20} />
						</button>
					</div>
				)}
				<div className={styles.sheetContent}>{children}</div>
			</div>
		</div>
	);
};

// ============================================
// ACTION SHEET
// ============================================
interface ActionSheetOption {
	id: string;
	label: string;
	icon?: React.ReactNode;
	variant?: "default" | "danger";
	onClick: () => void;
}

interface ActionSheetProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	options: ActionSheetOption[];
}

export const ActionSheet: React.FC<ActionSheetProps> = ({
	isOpen,
	onClose,
	title,
	options,
}) => {
	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div className={styles.sheetOverlay} onClick={onClose}>
			<div className={styles.actionSheet} onClick={(e) => e.stopPropagation()}>
				<div className={styles.sheetHandle} />

				{title && (
					<div className={styles.sheetHeader}>
						<h3 className={styles.sheetTitle}>{title}</h3>
						<button className={styles.sheetClose} onClick={onClose}>
							<X size={20} />
						</button>
					</div>
				)}

				<div className={styles.actionOptions}>
					{options.map((option) => (
						<button
							key={option.id}
							className={`${styles.actionOption} ${
								option.variant === "danger" ? styles.danger : ""
							}`}
							onClick={() => {
								option.onClick();
								onClose();
							}}
						>
							{option.icon && (
								<span className={styles.actionIcon}>{option.icon}</span>
							)}
							<span>{option.label}</span>
						</button>
					))}
				</div>

				<button className={styles.cancelButton} onClick={onClose}>
					Cancel
				</button>
			</div>
		</div>
	);
};

// ============================================
// RECIPE SELECTOR SHEET
// ============================================
interface RecipeSelectorSheetProps {
	isOpen: boolean;
	onClose: () => void;
	mealSlot: MealSlot | null;
}

export const RecipeSelectorSheet: React.FC<RecipeSelectorSheetProps> = ({
	isOpen,
	onClose,
	mealSlot,
}) => {
	const {state, dispatch, triggerPopup} = useApp();
	const [searchQuery, setSearchQuery] = useState("");

	const filteredRecipes = searchQuery
		? searchRecipes(searchQuery)
		: state.recipes;

	const handleSelectRecipe = (recipe: Recipe) => {
		if (mealSlot) {
			triggerPopup("add_to_planner");
			dispatch({type: "SET_MEAL_SLOT", slot: mealSlot, recipe});
			onClose();
		}
	};

	const title = mealSlot
		? `${getDayFullLabel(mealSlot.day)} - ${getMealTypeLabel(
				mealSlot.mealType
		  )}`
		: "Select Recipe";

	return (
		<BottomSheet isOpen={isOpen} onClose={onClose} title={title} height="full">
			<div className={styles.selectorContainer}>
				<div className={styles.selectorSearch}>
					<Input
						placeholder="Search recipes..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						icon={<Search size={20} />}
					/>
				</div>

				<div className={styles.selectorList}>
					{filteredRecipes.map((recipe) => (
						<div
							key={recipe.id}
							className={styles.selectorItem}
							onClick={() => handleSelectRecipe(recipe)}
						>
							<img
								src={recipe.imageUrl}
								alt={recipe.title}
								className={styles.selectorImage}
							/>
							<div className={styles.selectorInfo}>
								<span className={styles.selectorTitle}>{recipe.title}</span>
								<span className={styles.selectorMeta}>
									{recipe.prepTime + recipe.cookTime} min • {recipe.calories}{" "}
									cal
								</span>
							</div>
						</div>
					))}

					{filteredRecipes.length === 0 && (
						<div className={styles.selectorEmpty}>No recipes found</div>
					)}
				</div>
			</div>
		</BottomSheet>
	);
};

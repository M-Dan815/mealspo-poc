import React, {useState, useEffect} from "react";
import {
	Mail,
	Gift,
	X,
	Instagram,
	CheckCircle,
	ExternalLink,
	Search,
	Loader,
} from "lucide-react";
import {Button} from "../common/Button";
import {Input} from "../common/Input";
import {Recipe, MealSlot} from "../../types";
import {useApp} from "../../context/AppContext";
import {useAnalytics} from "../../context/AnalyticsContext";
import {searchRecipes} from "../../data/mockRecipes";
import {getMealTypeLabel, getDayFullLabel} from "../../data/mockMealPlan";
import "./Popups.css";

// ==============================================
// EMAIL SERVICE CONFIG
// ==============================================

// Option 1: Formspree (recommended for POC)
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xldqdljo";

// Option 2: Custom webhook (Zapier, Make, etc.)
// const WEBHOOK_ENDPOINT = 'https://hooks.zapier.com/hooks/catch/YOUR_ID/';

// Option 3: Netlify function
// const API_ENDPOINT = '/.netlify/functions/subscribe';

const submitEmail = async (email: string, source: string): Promise<boolean> => {
	try {
		const response = await fetch(FORMSPREE_ENDPOINT, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				source: source,
				_subject: `New MealSpo Signup: ${email}`,
			}),
		});

		const data = await response.json();
		console.log("Formspree response:", data);

		return response.ok;
	} catch (error) {
		console.error("Email submission error:", error);

		// Fallback: Try form-encoded submission
		try {
			const formData = new FormData();
			formData.append("email", email);
			formData.append("source", source);

			await fetch(FORMSPREE_ENDPOINT, {
				method: "POST",
				body: formData,
				headers: {
					Accept: "application/json",
				},
			});
			return true;
		} catch (fallbackError) {
			console.error("Fallback also failed:", fallbackError);
			return false;
		}
	}
};

// ==============================================
// EMAIL POPUP
// ==============================================
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
	const {state, dispatch} = useApp();
	const {trackEvent, trackButtonClick} = useAnalytics();
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const validateEmail = (emailValue: string): boolean => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (!email.trim()) {
			setError("Please enter your email");
			return;
		}

		if (!validateEmail(email)) {
			setError("Please enter a valid email");
			return;
		}

		setIsLoading(true);

		// Track the attempt
		trackEvent("email_submit_attempt", {
			email_domain: email.split("@")[1],
			trigger: state.popupTrigger || variant,
		});

		// Submit to backend
		const success = await submitEmail(email, state.popupTrigger || variant);

		if (success) {
			trackEvent("email_capture_success", {
				trigger: state.popupTrigger || variant,
			});
			dispatch({type: "SET_EMAIL_CAPTURED"});
			setIsLoading(false);
			onSuccess();
		} else {
			// Even if backend fails, we can still proceed for POC
			// In production, you might want to retry or show error
			trackEvent("email_capture_fallback", {
				trigger: state.popupTrigger || variant,
			});
			dispatch({type: "SET_EMAIL_CAPTURED"});
			setIsLoading(false);
			onSuccess();
		}
	};

	const handleClose = () => {
		trackButtonClick("popup_close", "email_popup");
		onClose();
	};

	const isTimer = variant === "timer";

	return (
		<div className="popup-overlay" onClick={handleClose}>
			<div className="popup-container" onClick={(e) => e.stopPropagation()}>
				<button className="popup-close" onClick={handleClose}>
					<X size={24} />
				</button>

				<div className="popup-icon">
					{isTimer ? <Gift size={48} /> : <Mail size={48} />}
				</div>

				<h2 className="popup-title">
					{isTimer ? "Get 6 Months Free! 🎉" : "Join MealSpo"}
				</h2>
				<p className="popup-subtitle">
					{isTimer
						? "Join early access and be the first to discover amazing recipes from creators worldwide."
						: "Enter your email to unlock this feature and get early access to all premium features."}
				</p>

				<form onSubmit={handleSubmit} className="popup-form">
					<div className="input-wrapper">
						<Mail size={20} className="input-icon" />
						<input
							type="email"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
								setError("");
							}}
							className={`popup-input ${error ? "has-error" : ""}`}
							disabled={isLoading}
							autoComplete="email"
							autoFocus
						/>
					</div>
					{error && <span className="input-error">{error}</span>}

					<button type="submit" className="popup-submit" disabled={isLoading}>
						{isLoading ? (
							<>
								<Loader size={20} className="spinning" />
								<span>Joining...</span>
							</>
						) : (
							<span>
								{isTimer ? "Claim My Free Access" : "Get Early Access"}
							</span>
						)}
					</button>
				</form>

				<p className="popup-terms">
					By signing up, you agree to our <span>Terms</span> and{" "}
					<span>Privacy Policy</span>
				</p>

				<div className="popup-features">
					<div className="feature-item">
						<span>🍳</span>
						<span>Unlimited recipes</span>
					</div>
					<div className="feature-item">
						<span>📅</span>
						<span>Meal planning</span>
					</div>
					<div className="feature-item">
						<span>🛒</span>
						<span>Smart shopping</span>
					</div>
				</div>
			</div>
		</div>
	);
};

// ==============================================
// INSTAGRAM POPUP
// ==============================================
interface InstagramPopupProps {
	onClose: () => void;
}

export const InstagramPopup: React.FC<InstagramPopupProps> = ({onClose}) => {
	const {trackButtonClick, trackEvent} = useAnalytics();

	const handleFollowClick = () => {
		trackButtonClick("follow_instagram", "instagram_popup");
		trackEvent("instagram_follow_click", {});
		window.open("https://instagram.com/mealspo", "_blank");

		// Close after a short delay
		setTimeout(onClose, 500);
	};

	const handleSkip = () => {
		trackButtonClick("skip_instagram", "instagram_popup");
		onClose();
	};

	return (
		<div className="popup-overlay">
			<div className="popup-container">
				<div className="success-badge">
					<CheckCircle size={20} />
					<span>You're In!</span>
				</div>

				<div className="popup-icon instagram">
					<Instagram size={48} />
				</div>

				<h2 className="popup-title">Follow Us on Instagram</h2>
				<p className="popup-subtitle">
					Join our community for daily recipe inspiration, cooking tips, and
					exclusive content!
				</p>

				<div className="instagram-preview">
					<img
						src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop"
						alt="Food"
					/>
					<img
						src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=100&h=100&fit=crop"
						alt="Food"
					/>
					<img
						src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=100&h=100&fit=crop"
						alt="Food"
					/>
				</div>

				<div className="instagram-stats">
					<div className="ig-stat">
						<span className="ig-stat-value">50K+</span>
						<span className="ig-stat-label">Followers</span>
					</div>
					<div className="ig-stat-divider" />
					<div className="ig-stat">
						<span className="ig-stat-value">1K+</span>
						<span className="ig-stat-label">Recipes</span>
					</div>
					<div className="ig-stat-divider" />
					<div className="ig-stat">
						<span className="ig-stat-value">Daily</span>
						<span className="ig-stat-label">Posts</span>
					</div>
				</div>

				<button className="popup-submit" onClick={handleFollowClick}>
					<span>Follow @mealspo</span>
					<ExternalLink size={18} />
				</button>

				<button className="popup-skip" onClick={handleSkip}>
					Maybe later
				</button>
			</div>
		</div>
	);
};

// ==============================================
// SUCCESS TOAST
// ==============================================
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
		<div className="toast-container">
			<div className="toast">
				<CheckCircle size={20} />
				<span>{message}</span>
				<button onClick={onClose}>
					<X size={16} />
				</button>
			</div>
		</div>
	);
};

// ==============================================
// POPUP MANAGER
// ==============================================
type PopupStateType = "email" | "instagram" | "success" | null;

export const PopupManager: React.FC = () => {
	const {state, dispatch, navigate} = useApp();
	const [currentPopup, setCurrentPopup] = useState<PopupStateType>(null);
	const [successMessage, setSuccessMessage] = useState("");
	const [pendingAction, setPendingAction] = useState<string | null>(null);

	useEffect(() => {
		if (state.showPopup && !state.emailCaptured) {
			setCurrentPopup("email");
			if (state.popupTrigger === "upload") {
				setPendingAction("upload");
			} else if (state.popupTrigger === "buy_now") {
				setPendingAction("buy");
			}
		}
	}, [state.showPopup, state.emailCaptured, state.popupTrigger]);

	const handleEmailSuccess = () => {
		setCurrentPopup("instagram");
	};

	const handleEmailClose = () => {
		setCurrentPopup(null);
		setPendingAction(null);
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

		if (pendingAction === "upload") {
			navigate("upload");
		}
		setPendingAction(null);
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

// ==============================================
// RECIPE SELECTOR SHEET
// ==============================================
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

	if (!isOpen) return null;

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
		<div className="sheet-overlay" onClick={onClose}>
			<div className="sheet-container" onClick={(e) => e.stopPropagation()}>
				<div className="sheet-handle" />

				<div className="sheet-header">
					<h3>{title}</h3>
					<button className="sheet-close" onClick={onClose}>
						<X size={20} />
					</button>
				</div>

				<div className="sheet-search">
					<Search size={20} />
					<input
						type="text"
						placeholder="Search recipes..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>

				<div className="sheet-content">
					{filteredRecipes.map((recipe) => (
						<div
							key={recipe.id}
							className="recipe-select-item"
							onClick={() => handleSelectRecipe(recipe)}
						>
							<img src={recipe.imageUrl} alt={recipe.title} />
							<div className="recipe-select-info">
								<span className="recipe-select-title">{recipe.title}</span>
								<span className="recipe-select-meta">
									{recipe.prepTime + recipe.cookTime} min • {recipe.calories}{" "}
									cal
								</span>
							</div>
						</div>
					))}

					{filteredRecipes.length === 0 && (
						<div className="sheet-empty">No recipes found</div>
					)}
				</div>
			</div>
		</div>
	);
};

// ==============================================
// ACTION SHEET
// ==============================================
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
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div className="sheet-overlay" onClick={onClose}>
			<div className="action-sheet" onClick={(e) => e.stopPropagation()}>
				<div className="sheet-handle" />

				{title && <h3 className="action-sheet-title">{title}</h3>}

				<div className="action-options">
					{options.map((option) => (
						<button
							key={option.id}
							className={`action-option ${
								option.variant === "danger" ? "danger" : ""
							}`}
							onClick={() => {
								option.onClick();
								onClose();
							}}
						>
							{option.icon}
							<span>{option.label}</span>
						</button>
					))}
				</div>

				<button className="action-cancel" onClick={onClose}>
					Cancel
				</button>
			</div>
		</div>
	);
};

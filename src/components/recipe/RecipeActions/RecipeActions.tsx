import React, {useState} from "react";
import {Plus, Minus, ShoppingCart, Calendar, Share2} from "lucide-react";
import {Recipe} from "../../../types";
import {Button} from "../../common/Button";
import {useApp} from "../../../context/AppContext";
import {useAnalytics} from "../../../context/AnalyticsContext";
import styles from "./RecipeActions.module.css";

interface RecipeActionsProps {
	recipe: Recipe;
	onAddToCart?: () => void;
	onAddToPlanner?: () => void;
}

export const RecipeActions: React.FC<RecipeActionsProps> = ({
	recipe,
	onAddToCart,
	onAddToPlanner,
}) => {
	const {dispatch, triggerPopup} = useApp();
	const {trackButtonClick} = useAnalytics();
	const [servings, setServings] = useState(recipe.servings);
	const [showSuccess, setShowSuccess] = useState<"cart" | "planner" | null>(
		null
	);

	const handleServingsChange = (delta: number) => {
		const newServings = Math.max(1, Math.min(20, servings + delta));
		setServings(newServings);
		trackButtonClick(
			"servings_change",
			`${delta > 0 ? "increase" : "decrease"}`
		);
	};

	const handleAddToCart = () => {
		trackButtonClick("add_to_cart", "recipe_actions");
		triggerPopup("add_to_cart");

		dispatch({
			type: "ADD_TO_SHOPPING_LIST",
			recipe,
			servings,
		});

		setShowSuccess("cart");
		setTimeout(() => setShowSuccess(null), 2000);

		if (onAddToCart) {
			onAddToCart();
		}
	};

	const handleAddToPlanner = () => {
		trackButtonClick("add_to_planner", "recipe_actions");
		triggerPopup("add_to_planner");

		setShowSuccess("planner");
		setTimeout(() => setShowSuccess(null), 2000);

		if (onAddToPlanner) {
			onAddToPlanner();
		}
	};

	const handleShare = () => {
		trackButtonClick("share", "recipe_actions");
		triggerPopup("share");
	};

	return (
		<div className={styles.actionsContainer}>
			<div className={styles.servingsControl}>
				<span className={styles.servingsLabel}>Servings</span>
				<div className={styles.servingsButtons}>
					<button
						className={styles.servingsButton}
						onClick={() => handleServingsChange(-1)}
						disabled={servings <= 1}
						aria-label="Decrease servings"
					>
						<Minus size={18} />
					</button>
					<span className={styles.servingsValue}>{servings}</span>
					<button
						className={styles.servingsButton}
						onClick={() => handleServingsChange(1)}
						disabled={servings >= 20}
						aria-label="Increase servings"
					>
						<Plus size={18} />
					</button>
				</div>
			</div>

			<div className={styles.mainActions}>
				<Button
					variant="primary"
					size="large"
					fullWidth
					icon={<ShoppingCart size={20} />}
					onClick={handleAddToCart}
					className={showSuccess === "cart" ? styles.successButton : ""}
				>
					{showSuccess === "cart" ? "Added!" : "Add to Cart"}
				</Button>

				<Button
					variant="outline"
					size="large"
					fullWidth
					icon={<Calendar size={20} />}
					onClick={handleAddToPlanner}
					className={
						showSuccess === "planner" ? styles.successOutlineButton : ""
					}
				>
					{showSuccess === "planner" ? "Added!" : "Add to Planner"}
				</Button>
			</div>

			<button className={styles.shareButton} onClick={handleShare}>
				<Share2 size={18} />
				<span>Share Recipe</span>
			</button>
		</div>
	);
};

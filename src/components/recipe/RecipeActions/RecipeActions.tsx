import React, {useState} from "react";
import {ShoppingCart, Calendar, Check} from "lucide-react";
import {Recipe} from "../../../types";
import {useApp} from "../../../context/AppContext";
import {useAnalytics} from "../../../context/AnalyticsContext";
import "./RecipeActions.css";

interface RecipeActionsProps {
	recipe: Recipe;
	servings: number;
}

export const RecipeActions: React.FC<RecipeActionsProps> = ({
	recipe,
	servings,
}) => {
	const {dispatch, navigate, triggerPopup, state} = useApp();
	const {trackButtonClick} = useAnalytics();
	const [showAdded, setShowAdded] = useState(false);

	const handleAddToCart = () => {
		trackButtonClick("add_to_cart", "recipe_detail");

		// Check if email captured first
		if (!state.emailCaptured) {
			triggerPopup("add_to_cart");
			return;
		}

		dispatch({type: "ADD_TO_SHOPPING_LIST", recipe, servings});
		setShowAdded(true);

		setTimeout(() => {
			setShowAdded(false);
		}, 3000);
	};

	const handleViewCart = () => {
		trackButtonClick("view_cart", "recipe_detail");
		navigate("basket");
	};

	const handleAddToPlanner = () => {
		trackButtonClick("add_to_planner", "recipe_detail");

		if (!state.emailCaptured) {
			triggerPopup("add_to_planner");
			return;
		}

		// Show planner selector
		navigate("planner");
	};

	const cartItemCount = state.shoppingList.filter((i) => !i.isOwned).length;

	return (
		<div className="recipe-actions">
			{showAdded ? (
				<div className="added-confirmation">
					<div className="added-message">
						<Check size={20} />
						<span>Added to cart!</span>
					</div>
					<button className="view-cart-btn" onClick={handleViewCart}>
						View Cart ({cartItemCount})
					</button>
				</div>
			) : (
				<>
					<button className="action-btn primary" onClick={handleAddToCart}>
						<ShoppingCart size={20} />
						<span>Add Ingredients to Cart</span>
					</button>
					<button className="action-btn secondary" onClick={handleAddToPlanner}>
						<Calendar size={20} />
						<span>Add to Meal Plan</span>
					</button>
				</>
			)}
		</div>
	);
};

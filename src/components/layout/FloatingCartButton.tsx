import React from "react";
import {ShoppingCart} from "lucide-react";
import {useApp} from "../../context/AppContext";
import {useAnalytics} from "../../context/AnalyticsContext";
import "./FloatingCartButton.css";

export const FloatingCartButton: React.FC = () => {
	const {state, navigate} = useApp();
	const {trackButtonClick} = useAnalytics();

	const itemCount = state.shoppingList.filter((item) => !item.isOwned).length;

	if (itemCount === 0 || state.currentScreen === "basket") {
		return null;
	}

	const handleClick = () => {
		trackButtonClick("floating_cart", "global");
		navigate("basket");
	};

	return (
		<button className="floating-cart-btn" onClick={handleClick}>
			<ShoppingCart size={24} />
			<span className="cart-badge">{itemCount}</span>
		</button>
	);
};

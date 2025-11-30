import React, {useState} from "react";
import {
	ShoppingCart,
	Trash2,
	Check,
	Package,
	ExternalLink,
	Store,
} from "lucide-react";
import {useApp} from "../../context/AppContext";
import {useAnalytics} from "../../context/AnalyticsContext";
import {ShoppingItem, IngredientCategory} from "../../types";
import "./BasketScreen.css";

const categoryOrder: IngredientCategory[] = [
	"produce",
	"meat",
	"dairy",
	"bakery",
	"pantry",
	"spices",
	"frozen",
	"beverages",
];

const categoryLabels: Record<IngredientCategory, string> = {
	produce: "🥬 Produce",
	meat: "🥩 Meat & Seafood",
	dairy: "🥛 Dairy & Eggs",
	bakery: "🍞 Bakery",
	pantry: "🥫 Pantry",
	spices: "🌶️ Spices & Herbs",
	frozen: "🧊 Frozen",
	beverages: "🥤 Beverages",
};

export const BasketScreen: React.FC = () => {
	const {state, dispatch, triggerPopup} = useApp();
	const {trackButtonClick, trackEvent} = useAnalytics();
	const [showClearConfirm, setShowClearConfirm] = useState(false);
	const [showStoreSelector, setShowStoreSelector] = useState(false);

	const {shoppingList} = state;

	// Group items by category
	const groupedItems = categoryOrder.reduce((acc, category) => {
		const items = shoppingList.filter((item) => item.category === category);
		if (items.length > 0) {
			acc[category] = items;
		}
		return acc;
	}, {} as Record<IngredientCategory, ShoppingItem[]>);

	const handleToggleOwned = (itemId: string) => {
		trackButtonClick("toggle_owned", "basket");
		dispatch({type: "TOGGLE_ITEM_OWNED", itemId});
	};

	const handleRemoveItem = (itemId: string) => {
		trackButtonClick("remove_item", "basket");
		dispatch({type: "REMOVE_FROM_SHOPPING_LIST", itemId});
	};

	const handleClearList = () => {
		trackButtonClick("clear_list", "basket");
		setShowClearConfirm(true);
	};

	const confirmClearList = () => {
		trackEvent("shopping_list_cleared", {itemCount: shoppingList.length});
		dispatch({type: "CLEAR_SHOPPING_LIST"});
		setShowClearConfirm(false);
	};

	const handleBuyNow = () => {
		trackButtonClick("buy_now", "basket");
		setShowStoreSelector(true);
	};

	const handleSelectStore = (store: "coles" | "woolworths") => {
		trackEvent("store_selected", {
			store,
			itemCount: neededItems.length,
			items: neededItems.map((i) => i.name),
		});

		// Trigger the email popup for buy now action
		triggerPopup("buy_now");
		setShowStoreSelector(false);
	};

	const neededItems = shoppingList.filter((item) => !item.isOwned);
	const ownedItems = shoppingList.filter((item) => item.isOwned);

	// Calculate estimated total (simulated pricing)
	const estimatedTotal = neededItems.reduce((sum, item) => {
		// Simulated prices based on category
		const basePrices: Record<IngredientCategory, number> = {
			produce: 3.5,
			meat: 12.0,
			dairy: 5.0,
			bakery: 4.5,
			pantry: 4.0,
			spices: 3.0,
			frozen: 6.0,
			beverages: 4.0,
		};
		return sum + (basePrices[item.category] || 5.0);
	}, 0);

	if (shoppingList.length === 0) {
		return (
			<div className="basket-screen">
				<div className="basket-header">
					<h1>Shopping List</h1>
				</div>
				<div className="basket-empty">
					<div className="empty-icon">
						<ShoppingCart size={64} />
					</div>
					<h2>Your cart is empty</h2>
					<p>
						Add ingredients from recipes to start building your shopping list.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="basket-screen">
			<div className="basket-header">
				<h1>Shopping List</h1>
				<button className="clear-btn" onClick={handleClearList}>
					<Trash2 size={20} />
				</button>
			</div>

			{/* Summary Bar */}
			<div className="basket-summary">
				<div className="summary-stats">
					<div className="summary-stat">
						<span className="stat-value">{neededItems.length}</span>
						<span className="stat-label">to buy</span>
					</div>
					<div className="summary-divider" />
					<div className="summary-stat">
						<span className="stat-value">{ownedItems.length}</span>
						<span className="stat-label">already have</span>
					</div>
				</div>
				<div className="summary-total">
					<span className="total-label">Est. Total</span>
					<span className="total-value">${estimatedTotal.toFixed(2)}</span>
				</div>
			</div>

			{/* Items List */}
			<div className="basket-items">
				{Object.entries(groupedItems).map(([category, items]) => (
					<div key={category} className="category-section">
						<h3 className="category-title">
							{categoryLabels[category as IngredientCategory]}
						</h3>

						{items.map((item) => (
							<div
								key={item.id}
								className={`basket-item ${item.isOwned ? "owned" : ""}`}
							>
								<img
									src={item.imageUrl}
									alt={item.name}
									className="item-image"
									onError={(e) => {
										(e.target as HTMLImageElement).src =
											"https://via.placeholder.com/60x60/f5f5f5/999?text=🛒";
									}}
								/>

								<div className="item-info">
									<span className="item-name">{item.name}</span>
									<span className="item-qty">
										{item.combinedQuantity % 1 === 0
											? item.combinedQuantity
											: item.combinedQuantity.toFixed(1)}{" "}
										{item.unit}
									</span>
								</div>

								<button
									className={`check-btn ${item.isOwned ? "checked" : ""}`}
									onClick={() => handleToggleOwned(item.id)}
								>
									<Check size={18} />
								</button>
							</div>
						))}
					</div>
				))}
			</div>

			{/* Buy Now Section */}
			<div className="basket-actions">
				<button className="buy-now-btn" onClick={handleBuyNow}>
					<Package size={22} />
					<span>Buy Ingredients Now</span>
					<span className="item-count">{neededItems.length} items</span>
				</button>

				<p className="buy-hint">Order from Coles or Woolworths for delivery</p>
			</div>

			{/* Clear Confirmation Modal */}
			{showClearConfirm && (
				<div
					className="modal-overlay"
					onClick={() => setShowClearConfirm(false)}
				>
					<div className="modal-content" onClick={(e) => e.stopPropagation()}>
						<h3>Clear shopping list?</h3>
						<p>
							This will remove all {shoppingList.length} items from your list.
						</p>
						<div className="modal-actions">
							<button
								className="modal-btn cancel"
								onClick={() => setShowClearConfirm(false)}
							>
								Cancel
							</button>
							<button className="modal-btn danger" onClick={confirmClearList}>
								Clear All
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Store Selector Modal */}
			{showStoreSelector && (
				<div
					className="modal-overlay"
					onClick={() => setShowStoreSelector(false)}
				>
					<div className="store-selector" onClick={(e) => e.stopPropagation()}>
						<h3>Choose your store</h3>
						<p>Select where you'd like to order your ingredients</p>

						<button
							className="store-option coles"
							onClick={() => handleSelectStore("coles")}
						>
							<div className="store-logo coles-logo">
								<Store size={32} />
							</div>
							<div className="store-info">
								<span className="store-name">Coles</span>
								<span className="store-delivery">Delivery from $3</span>
							</div>
							<ExternalLink size={20} />
						</button>

						<button
							className="store-option woolworths"
							onClick={() => handleSelectStore("woolworths")}
						>
							<div className="store-logo woolworths-logo">
								<Store size={32} />
							</div>
							<div className="store-info">
								<span className="store-name">Woolworths</span>
								<span className="store-delivery">Delivery from $5</span>
							</div>
							<ExternalLink size={20} />
						</button>

						<button
							className="cancel-store"
							onClick={() => setShowStoreSelector(false)}
						>
							Cancel
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

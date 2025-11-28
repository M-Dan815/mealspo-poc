import React, {useState} from "react";
import {ShoppingCart, Trash2, Check, Package} from "lucide-react";
import {Header} from "../layout/Header";
import {PageWrapper} from "../layout/PageWrapper";
import {Container} from "../layout/Container";
import {Button} from "../common/Button";
import {Toggle} from "../common/Toggle";
import {EmptyState} from "../layout/EmptyState";
import {ActionSheet} from "../popup";
import {useApp} from "../../context/AppContext";
import {useAnalytics} from "../../context/AnalyticsContext";
import {ShoppingItem, IngredientCategory} from "../../types";
import styles from "./BasketScreen.module.css";

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
	spices: "🌶️ Spices",
	frozen: "🧊 Frozen",
	beverages: "🥤 Beverages",
};

export const BasketScreen: React.FC = () => {
	const {state, dispatch, triggerPopup} = useApp();
	const {trackButtonClick} = useAnalytics();
	const [showClearConfirm, setShowClearConfirm] = useState(false);

	const {shoppingList} = state;

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
		dispatch({type: "CLEAR_SHOPPING_LIST"});
		setShowClearConfirm(false);
	};

	const handleBuyNow = () => {
		trackButtonClick("buy_now", "basket");
		triggerPopup("buy_now");
	};

	const neededItems = shoppingList.filter((item) => !item.isOwned);
	const ownedItems = shoppingList.filter((item) => item.isOwned);

	if (shoppingList.length === 0) {
		return (
			<>
				<Header variant="basket" title="Shopping List" />
				<PageWrapper pageName="basket">
					<EmptyState
						icon={<ShoppingCart size={48} />}
						title="Your list is empty"
						description="Add ingredients from recipes to start building your shopping list."
					/>
				</PageWrapper>
			</>
		);
	}

	return (
		<>
			<Header variant="basket" title="Shopping List" />
			<PageWrapper pageName="basket">
				<div className={styles.container}>
					{/* Summary Bar */}
					<div className={styles.summaryBar}>
						<div className={styles.summaryItem}>
							<span className={styles.summaryValue}>{neededItems.length}</span>
							<span className={styles.summaryLabel}>to buy</span>
						</div>
						<div className={styles.summaryDivider} />
						<div className={styles.summaryItem}>
							<span className={styles.summaryValue}>{ownedItems.length}</span>
							<span className={styles.summaryLabel}>have</span>
						</div>
						<button className={styles.clearBtn} onClick={handleClearList}>
							<Trash2 size={18} />
						</button>
					</div>

					{/* Items List */}
					<div className={styles.itemsList}>
						{Object.entries(groupedItems).map(([category, items]) => (
							<div key={category} className={styles.categorySection}>
								<h3 className={styles.categoryTitle}>
									{categoryLabels[category as IngredientCategory]}
								</h3>

								{items.map((item) => (
									<div
										key={item.id}
										className={`${styles.itemCard} ${
											item.isOwned ? styles.owned : ""
										}`}
									>
										<img
											src={item.imageUrl}
											alt={item.name}
											className={styles.itemImage}
											onError={(e) => {
												(e.target as HTMLImageElement).src =
													"https://via.placeholder.com/60?text=🛒";
											}}
										/>

										<div className={styles.itemInfo}>
											<span className={styles.itemName}>{item.name}</span>
											<span className={styles.itemQty}>
												{item.combinedQuantity % 1 === 0
													? item.combinedQuantity
													: item.combinedQuantity.toFixed(1)}{" "}
												{item.unit}
											</span>
										</div>

										<div className={styles.itemActions}>
											<button
												className={`${styles.checkBtn} ${
													item.isOwned ? styles.checked : ""
												}`}
												onClick={() => handleToggleOwned(item.id)}
											>
												<Check size={18} />
											</button>
										</div>
									</div>
								))}
							</div>
						))}
					</div>

					{/* Bottom Actions */}
					<div className={styles.bottomActions}>
						<Button
							variant="primary"
							size="large"
							fullWidth
							icon={<Package size={20} />}
							onClick={handleBuyNow}
							disabled={neededItems.length === 0}
						>
							Order Now ({neededItems.length} items)
						</Button>
					</div>
				</div>
			</PageWrapper>

			<ActionSheet
				isOpen={showClearConfirm}
				onClose={() => setShowClearConfirm(false)}
				title="Clear shopping list?"
				options={[
					{
						id: "clear",
						label: "Clear all items",
						variant: "danger",
						icon: <Trash2 size={20} />,
						onClick: confirmClearList,
					},
				]}
			/>
		</>
	);
};

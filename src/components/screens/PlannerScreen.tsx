import React, {useState} from "react";
import {Plus, X, ShoppingCart, ChevronLeft, ChevronRight} from "lucide-react";
import {Header} from "../layout/Header";
import {PageWrapper} from "../layout/PageWrapper";
import {Container} from "../layout/Container";
import {Button} from "../common/Button";
import {RecipeSelectorSheet} from "../popup";
import {useApp} from "../../context/AppContext";
import {useAnalytics} from "../../context/AnalyticsContext";
import {DayOfWeek, MealType, MealSlot} from "../../types";
import {getDayLabel, getMealTypeLabel} from "../../data/mockMealPlan";
import styles from "./PlannerScreen.module.css";

const days: DayOfWeek[] = [
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday",
	"saturday",
	"sunday",
];
const mealTypes: MealType[] = ["breakfast", "lunch", "dinner"];

export const PlannerScreen: React.FC = () => {
	const {state, dispatch, navigate, triggerPopup} = useApp();
	const {trackButtonClick} = useAnalytics();
	const [selectedSlot, setSelectedSlot] = useState<MealSlot | null>(null);
	const [showSelector, setShowSelector] = useState(false);

	const getWeekDateRange = () => {
		const start = new Date(state.weekPlan.weekStartDate);
		const end = new Date(start);
		end.setDate(start.getDate() + 6);

		const formatDate = (date: Date) => {
			return date.toLocaleDateString("en-AU", {month: "short", day: "numeric"});
		};

		return `${formatDate(start)} - ${formatDate(end)}`;
	};

	const handlePrevWeek = () => {
		trackButtonClick("prev_week", "planner");
		dispatch({type: "CHANGE_WEEK", direction: "prev"});
	};

	const handleNextWeek = () => {
		trackButtonClick("next_week", "planner");
		dispatch({type: "CHANGE_WEEK", direction: "next"});
	};

	const handleSlotClick = (slot: MealSlot) => {
		trackButtonClick("meal_slot", `${slot.day}_${slot.mealType}`);
		if (slot.recipe) {
			navigate("recipe", slot.recipe.id);
		} else {
			setSelectedSlot(slot);
			setShowSelector(true);
		}
	};

	const handleRemoveMeal = (e: React.MouseEvent, slotId: string) => {
		e.stopPropagation();
		trackButtonClick("remove_meal", "planner");
		dispatch({type: "REMOVE_MEAL_SLOT", slotId});
	};

	const handleAddAllToBasket = () => {
		trackButtonClick("add_all_to_basket", "planner");
		const mealsWithRecipes = state.weekPlan.meals.filter(
			(m) => m.recipe !== null
		);

		if (mealsWithRecipes.length === 0) {
			return;
		}

		triggerPopup("add_to_cart");
		dispatch({type: "ADD_WEEK_TO_SHOPPING"});
		navigate("basket");
	};

	const getMealForSlot = (day: DayOfWeek, mealType: MealType) => {
		return state.weekPlan.meals.find(
			(m) => m.day === day && m.mealType === mealType
		);
	};

	const totalMeals = state.weekPlan.meals.filter(
		(m) => m.recipe !== null
	).length;

	return (
		<>
			<Header
				variant="planner"
				title={getWeekDateRange()}
				showWeekNav
				onPrevWeek={handlePrevWeek}
				onNextWeek={handleNextWeek}
			/>
			<PageWrapper pageName="planner">
				<div className={styles.container}>
					{/* Days Header */}
					<div className={styles.daysHeader}>
						<div className={styles.mealTypeColumn} />
						{days.map((day) => (
							<div key={day} className={styles.dayColumn}>
								<span className={styles.dayLabel}>{getDayLabel(day)}</span>
							</div>
						))}
					</div>

					{/* Meal Grid */}
					<div className={styles.mealGrid}>
						{mealTypes.map((mealType) => (
							<div key={mealType} className={styles.mealRow}>
								<div className={styles.mealTypeLabel}>
									{getMealTypeLabel(mealType)}
								</div>
								{days.map((day) => {
									const slot = getMealForSlot(day, mealType);
									const hasRecipe = slot?.recipe !== null;

									return (
										<div
											key={`${day}-${mealType}`}
											className={`${styles.mealSlot} ${
												hasRecipe ? styles.filled : ""
											}`}
											onClick={() => slot && handleSlotClick(slot)}
										>
											{hasRecipe && slot?.recipe ? (
												<>
													<img
														src={slot.recipe.imageUrl}
														alt={slot.recipe.title}
														className={styles.mealImage}
													/>
													<button
														className={styles.removeBtn}
														onClick={(e) => handleRemoveMeal(e, slot.id)}
													>
														<X size={12} />
													</button>
												</>
											) : (
												<Plus size={16} className={styles.addIcon} />
											)}
										</div>
									);
								})}
							</div>
						))}
					</div>

					{/* Summary */}
					<div className={styles.summary}>
						<div className={styles.summaryInfo}>
							<span className={styles.summaryLabel}>Meals planned</span>
							<span className={styles.summaryValue}>{totalMeals} / 21</span>
						</div>

						<Button
							variant="primary"
							size="large"
							fullWidth
							icon={<ShoppingCart size={20} />}
							onClick={handleAddAllToBasket}
							disabled={totalMeals === 0}
						>
							Add All to Shopping List
						</Button>
					</div>
				</div>
			</PageWrapper>

			<RecipeSelectorSheet
				isOpen={showSelector}
				onClose={() => {
					setShowSelector(false);
					setSelectedSlot(null);
				}}
				mealSlot={selectedSlot}
			/>
		</>
	);
};

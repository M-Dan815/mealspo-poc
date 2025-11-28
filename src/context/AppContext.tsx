import React, {
	createContext,
	useContext,
	useReducer,
	ReactNode,
	useEffect,
} from "react";
import {
	Recipe,
	ShoppingItem,
	WeekPlan,
	MealSlot,
	PopupTrigger,
	NavigationTab,
} from "../types";
import {Screen} from "../types";
import {generateEmptyWeekPlan} from "../data/mockMealPlan";
import {mockRecipes} from "../data/mockRecipes";

interface AppState {
	// Navigation
	currentScreen: Screen;
	previousScreen: Screen | null;
	selectedRecipeId: string | null;
	activeTab: NavigationTab;

	// Data
	recipes: Recipe[];
	weekPlan: WeekPlan;
	shoppingList: ShoppingItem[];

	// Popup
	showPopup: boolean;
	popupTrigger: PopupTrigger | null;
	hasShownTimerPopup: boolean;
	emailCaptured: boolean;

	// UI State
	isLoading: boolean;
	selectedMealSlot: MealSlot | null;
	showRecipeSelector: boolean;
}

type AppAction =
	| {type: "NAVIGATE"; screen: Screen; recipeId?: string}
	| {type: "SET_ACTIVE_TAB"; tab: NavigationTab}
	| {type: "TOGGLE_LIKE"; recipeId: string}
	| {type: "TOGGLE_SAVE"; recipeId: string}
	| {type: "ADD_TO_SHOPPING_LIST"; recipe: Recipe; servings: number}
	| {type: "REMOVE_FROM_SHOPPING_LIST"; itemId: string}
	| {type: "TOGGLE_ITEM_OWNED"; itemId: string}
	| {type: "CLEAR_SHOPPING_LIST"}
	| {type: "SET_MEAL_SLOT"; slot: MealSlot; recipe: Recipe}
	| {type: "REMOVE_MEAL_SLOT"; slotId: string}
	| {type: "ADD_WEEK_TO_SHOPPING"}
	| {type: "SHOW_POPUP"; trigger: PopupTrigger}
	| {type: "HIDE_POPUP"}
	| {type: "SET_EMAIL_CAPTURED"}
	| {type: "SET_TIMER_POPUP_SHOWN"}
	| {type: "SELECT_MEAL_SLOT"; slot: MealSlot | null}
	| {type: "SHOW_RECIPE_SELECTOR"; show: boolean}
	| {type: "CHANGE_WEEK"; direction: "prev" | "next"};

const initialState: AppState = {
	currentScreen: "feed",
	previousScreen: null,
	selectedRecipeId: null,
	activeTab: "feed",
	recipes: mockRecipes,
	weekPlan: generateEmptyWeekPlan(),
	shoppingList: [],
	showPopup: false,
	popupTrigger: null,
	hasShownTimerPopup: false,
	emailCaptured: false,
	isLoading: false,
	selectedMealSlot: null,
	showRecipeSelector: false,
};

function appReducer(state: AppState, action: AppAction): AppState {
	switch (action.type) {
		case "NAVIGATE":
			return {
				...state,
				previousScreen: state.currentScreen,
				currentScreen: action.screen,
				selectedRecipeId: action.recipeId || state.selectedRecipeId,
			};

		case "SET_ACTIVE_TAB":
			const screenMap: Record<NavigationTab, Screen> = {
				feed: "feed",
				explore: "explore",
				upload: "upload",
				planner: "planner",
				profile: "profile",
			};
			return {
				...state,
				activeTab: action.tab,
				previousScreen: state.currentScreen,
				currentScreen: screenMap[action.tab],
			};

		case "TOGGLE_LIKE":
			return {
				...state,
				recipes: state.recipes.map((recipe) =>
					recipe.id === action.recipeId
						? {
								...recipe,
								isLiked: !recipe.isLiked,
								likes: recipe.isLiked ? recipe.likes - 1 : recipe.likes + 1,
						  }
						: recipe
				),
			};

		case "TOGGLE_SAVE":
			return {
				...state,
				recipes: state.recipes.map((recipe) =>
					recipe.id === action.recipeId
						? {...recipe, isSaved: !recipe.isSaved}
						: recipe
				),
			};

		case "ADD_TO_SHOPPING_LIST": {
			const newItems: ShoppingItem[] = [];

			action.recipe.ingredients.forEach((ingredient) => {
				const scaledQuantity =
					(ingredient.quantity / action.recipe.servings) * action.servings;
				const existingItem = state.shoppingList.find(
					(item) =>
						item.name.toLowerCase() === ingredient.name.toLowerCase() &&
						item.unit === ingredient.unit
				);

				if (existingItem) {
					const existingIndex = state.shoppingList.findIndex(
						(item) => item.id === existingItem.id
					);
					if (existingIndex !== -1) {
						newItems.push({
							...existingItem,
							combinedQuantity: existingItem.combinedQuantity + scaledQuantity,
							recipeIds: [...existingItem.recipeIds, action.recipe.id],
						});
					}
				} else {
					newItems.push({
						...ingredient,
						recipeIds: [action.recipe.id],
						isOwned: false,
						combinedQuantity: scaledQuantity,
					});
				}
			});

			const updatedList = state.shoppingList.filter(
				(item) => !newItems.some((newItem) => newItem.id === item.id)
			);

			return {
				...state,
				shoppingList: [...updatedList, ...newItems],
			};
		}

		case "REMOVE_FROM_SHOPPING_LIST":
			return {
				...state,
				shoppingList: state.shoppingList.filter(
					(item) => item.id !== action.itemId
				),
			};

		case "TOGGLE_ITEM_OWNED":
			return {
				...state,
				shoppingList: state.shoppingList.map((item) =>
					item.id === action.itemId ? {...item, isOwned: !item.isOwned} : item
				),
			};

		case "CLEAR_SHOPPING_LIST":
			return {
				...state,
				shoppingList: [],
			};

		case "SET_MEAL_SLOT":
			return {
				...state,
				weekPlan: {
					...state.weekPlan,
					meals: state.weekPlan.meals.map((meal) =>
						meal.id === action.slot.id ? {...meal, recipe: action.recipe} : meal
					),
				},
				showRecipeSelector: false,
				selectedMealSlot: null,
			};

		case "REMOVE_MEAL_SLOT":
			return {
				...state,
				weekPlan: {
					...state.weekPlan,
					meals: state.weekPlan.meals.map((meal) =>
						meal.id === action.slotId ? {...meal, recipe: null} : meal
					),
				},
			};

		case "ADD_WEEK_TO_SHOPPING": {
			const recipesInPlan = state.weekPlan.meals
				.filter((meal) => meal.recipe !== null)
				.map((meal) => meal.recipe!);

			let newShoppingList = [...state.shoppingList];

			recipesInPlan.forEach((recipe) => {
				recipe.ingredients.forEach((ingredient) => {
					const existingItem = newShoppingList.find(
						(item) =>
							item.name.toLowerCase() === ingredient.name.toLowerCase() &&
							item.unit === ingredient.unit
					);

					if (existingItem) {
						existingItem.combinedQuantity += ingredient.quantity;
						if (!existingItem.recipeIds.includes(recipe.id)) {
							existingItem.recipeIds.push(recipe.id);
						}
					} else {
						newShoppingList.push({
							...ingredient,
							recipeIds: [recipe.id],
							isOwned: false,
							combinedQuantity: ingredient.quantity,
						});
					}
				});
			});

			return {
				...state,
				shoppingList: newShoppingList,
			};
		}

		case "SHOW_POPUP":
			return {
				...state,
				showPopup: true,
				popupTrigger: action.trigger,
			};

		case "HIDE_POPUP":
			return {
				...state,
				showPopup: false,
				popupTrigger: null,
			};

		case "SET_EMAIL_CAPTURED":
			return {
				...state,
				emailCaptured: true,
			};

		case "SET_TIMER_POPUP_SHOWN":
			return {
				...state,
				hasShownTimerPopup: true,
			};

		case "SELECT_MEAL_SLOT":
			return {
				...state,
				selectedMealSlot: action.slot,
			};

		case "SHOW_RECIPE_SELECTOR":
			return {
				...state,
				showRecipeSelector: action.show,
			};

		case "CHANGE_WEEK": {
			const currentDate = new Date(state.weekPlan.weekStartDate);
			const newDate = new Date(currentDate);
			newDate.setDate(
				currentDate.getDate() + (action.direction === "next" ? 7 : -7)
			);
			return {
				...state,
				weekPlan: generateEmptyWeekPlan(newDate),
			};
		}

		default:
			return state;
	}
}

interface AppContextType {
	state: AppState;
	dispatch: React.Dispatch<AppAction>;
	navigate: (screen: Screen, recipeId?: string) => void;
	goBack: () => void;
	triggerPopup: (trigger: PopupTrigger) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{children: ReactNode}> = ({children}) => {
	const [state, dispatch] = useReducer(appReducer, initialState);

	const navigate = (screen: Screen, recipeId?: string) => {
		dispatch({type: "NAVIGATE", screen, recipeId});
	};

	const goBack = () => {
		if (state.previousScreen) {
			dispatch({type: "NAVIGATE", screen: state.previousScreen});
		}
	};

	const triggerPopup = (trigger: PopupTrigger) => {
		if (!state.emailCaptured) {
			dispatch({type: "SHOW_POPUP", trigger});
		}
	};

	// Timer popup after 20 seconds
	useEffect(() => {
		if (!state.hasShownTimerPopup && !state.emailCaptured) {
			const timer = setTimeout(() => {
				dispatch({type: "SET_TIMER_POPUP_SHOWN"});
				triggerPopup("timer");
			}, 20000);

			return () => clearTimeout(timer);
		}
	}, [state.hasShownTimerPopup, state.emailCaptured]);

	return (
		<AppContext.Provider
			value={{state, dispatch, navigate, goBack, triggerPopup}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useApp = (): AppContextType => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error("useApp must be used within an AppProvider");
	}
	return context;
};

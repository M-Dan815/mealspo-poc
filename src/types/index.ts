// ============================================
// INGREDIENT & RECIPE TYPES
// ============================================

export type IngredientCategory =
	| "produce"
	| "meat"
	| "dairy"
	| "pantry"
	| "frozen"
	| "bakery"
	| "beverages"
	| "spices";

export interface Ingredient {
	id: string;
	name: string;
	quantity: number;
	unit: string;
	imageUrl: string;
	category: IngredientCategory;
}

export interface Recipe {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	videoUrl?: string;
	creatorId: string;
	creatorName: string;
	creatorAvatar: string;
	prepTime: number;
	cookTime: number;
	servings: number;
	calories: number;
	protein: number;
	carbs: number;
	fat: number;
	ingredients: Ingredient[];
	steps: string[];
	likes: number;
	shares: number;
	views: number;
	isLiked: boolean;
	isSaved: boolean;
	createdAt: Date;
	tags: string[];
}

// ============================================
// SHOPPING TYPES
// ============================================

export interface ShoppingItem extends Ingredient {
	recipeIds: string[];
	isOwned: boolean;
	combinedQuantity: number;
}

// ============================================
// MEAL PLANNER TYPES
// ============================================

export type DayOfWeek =
	| "monday"
	| "tuesday"
	| "wednesday"
	| "thursday"
	| "friday"
	| "saturday"
	| "sunday";

// UPDATED: Added "dessert" and "snack" to the MealType union.
export type MealType = "breakfast" | "lunch" | "dinner" | "dessert" | "snack";

export interface MealSlot {
	id: string;
	day: DayOfWeek;
	mealType: MealType;
	recipe: Recipe | null;
}

export interface WeekPlan {
	weekStartDate: Date;
	meals: MealSlot[];
}

// ============================================
// USER TYPES
// ============================================

export interface User {
	id: string;
	username: string;
	displayName: string;
	avatar: string;
	bio: string;
	followers: number;
	following: number;
	recipesCount: number;
	recipes: Recipe[];
}

// ============================================
// POPUP TYPES
// ============================================

export type PopupTrigger =
	| "timer"
	| "upload"
	| "add_to_cart"
	| "create_profile"
	| "buy_now"
	| "add_to_planner"
	| "like"
	| "share";

export interface PopupType {
	id: string;
	type: "email" | "instagram" | "success";
	trigger: PopupTrigger;
	title: string;
	subtitle: string;
	ctaText: string;
}

// ============================================
// NAVIGATION TYPES
// ============================================

export type NavigationTab =
	| "feed"
	| "explore"
	| "upload"
	| "planner"
	| "profile";

export type Screen =
	| "feed"
	| "explore"
	| "recipe"
	| "planner"
	| "basket"
	| "profile"
	| "upload";

export interface NavigationState {
	currentScreen: Screen;
	previousScreen: Screen | null;
	params?: Record<string, any>;
}

// ============================================
// ANALYTICS TYPES
// ============================================

export interface AnalyticsEvent {
	eventName: string;
	properties?: Record<string, any>;
	timestamp: Date;
}

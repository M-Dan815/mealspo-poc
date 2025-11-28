import React, {useState, useEffect} from "react";
import {
	Heart,
	Bookmark,
	Share2,
	ArrowLeft,
	Plus,
	Minus,
	ShoppingCart,
	Calendar,
	Clock,
	Users,
	Flame,
	Check,
} from "lucide-react";
import {useApp} from "../../context/AppContext";
import {useAnalytics} from "../../context/AnalyticsContext";
import {getRecipeById} from "../../data/mockRecipes";
import {Recipe, Ingredient} from "../../types";
import {Avatar} from "../common/Avatar";
import {Badge} from "../common/Badge";
import {Button} from "../common/Button";
import {IconButton} from "../common/IconButton";
import styles from "./RecipeDetailScreen.module.css";

export const RecipeDetailScreen: React.FC = () => {
	const {state, dispatch, goBack, triggerPopup} = useApp();
	const {trackButtonClick, trackPageView} = useAnalytics();
	const [recipe, setRecipe] = useState<Recipe | null>(null);
	const [servings, setServings] = useState(4);
	const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
	const [isLikeAnimating, setIsLikeAnimating] = useState(false);
	const [showAddedToCart, setShowAddedToCart] = useState(false);

	useEffect(() => {
		if (state.selectedRecipeId) {
			const foundRecipe = getRecipeById(state.selectedRecipeId);
			if (foundRecipe) {
				setRecipe(foundRecipe);
				setServings(foundRecipe.servings);
				trackPageView(`recipe_${foundRecipe.id}`);
			}
		}
	}, [state.selectedRecipeId, trackPageView]);

	if (!recipe) {
		return (
			<div className={styles.loading}>
				<div className={styles.spinner} />
			</div>
		);
	}

	const currentRecipe = state.recipes.find((r) => r.id === recipe.id) || recipe;
	const totalTime = recipe.prepTime + recipe.cookTime;

	const handleBack = () => {
		trackButtonClick("back", "recipe_detail");
		goBack();
	};

	const handleLike = () => {
		trackButtonClick("like", "recipe_detail");
		if (!currentRecipe.isLiked) {
			triggerPopup("like");
		}
		setIsLikeAnimating(true);
		dispatch({type: "TOGGLE_LIKE", recipeId: recipe.id});
		setTimeout(() => setIsLikeAnimating(false), 800);
	};

	const handleSave = () => {
		trackButtonClick("save", "recipe_detail");
		dispatch({type: "TOGGLE_SAVE", recipeId: recipe.id});
	};

	const handleShare = () => {
		trackButtonClick("share", "recipe_detail");
		triggerPopup("share");
	};

	const handleServingsChange = (delta: number) => {
		const newServings = Math.max(1, Math.min(20, servings + delta));
		setServings(newServings);
	};

	const handleAddToCart = () => {
		trackButtonClick("add_to_cart", "recipe_detail");
		triggerPopup("add_to_cart");
		dispatch({type: "ADD_TO_SHOPPING_LIST", recipe, servings});
		setShowAddedToCart(true);
		setTimeout(() => setShowAddedToCart(false), 2000);
	};

	const handleAddToPlanner = () => {
		trackButtonClick("add_to_planner", "recipe_detail");
		triggerPopup("add_to_planner");
	};

	const toggleStep = (index: number) => {
		setCompletedSteps((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(index)) {
				newSet.delete(index);
			} else {
				newSet.add(index);
			}
			return newSet;
		});
	};

	const scaleQuantity = (quantity: number): string => {
		const scaled = (quantity / recipe.servings) * servings;
		if (scaled === Math.floor(scaled)) return scaled.toString();

		const decimal = scaled - Math.floor(scaled);
		const wholeNumber = Math.floor(scaled);

		let fraction = "";
		if (decimal >= 0.2 && decimal <= 0.3) fraction = "¼";
		else if (decimal >= 0.3 && decimal <= 0.4) fraction = "⅓";
		else if (decimal >= 0.45 && decimal <= 0.55) fraction = "½";
		else if (decimal >= 0.6 && decimal <= 0.7) fraction = "⅔";
		else if (decimal >= 0.7 && decimal <= 0.8) fraction = "¾";
		else return scaled.toFixed(1);

		return wholeNumber > 0 ? `${wholeNumber} ${fraction}` : fraction;
	};

	const formatNumber = (num: number): string => {
		if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
		return num.toString();
	};

	return (
		<div className={styles.screen}>
			{/* Header Image */}
			<div className={styles.heroSection}>
				<img
					src={recipe.imageUrl}
					alt={recipe.title}
					className={styles.heroImage}
				/>
				<div className={styles.heroOverlay} />

				{/* Floating Header */}
				<div className={styles.floatingHeader}>
					<IconButton
						icon={<ArrowLeft size={24} />}
						onClick={handleBack}
						variant="overlay"
						ariaLabel="Go back"
					/>
					<div className={styles.headerActions}>
						<IconButton
							icon={<Share2 size={22} />}
							onClick={handleShare}
							variant="overlay"
							ariaLabel="Share"
						/>
					</div>
				</div>
			</div>

			{/* Content */}
			<div className={styles.content}>
				{/* Title Section */}
				<div className={styles.titleSection}>
					<div className={styles.tags}>
						{recipe.tags.slice(0, 3).map((tag) => (
							<Badge key={tag} variant="primary" size="small">
								#{tag}
							</Badge>
						))}
					</div>

					<h1 className={styles.title}>{recipe.title}</h1>
					<p className={styles.description}>{recipe.description}</p>

					{/* Actions Row */}
					<div className={styles.actionsRow}>
						<button
							className={`${styles.actionBtn} ${
								currentRecipe.isLiked ? styles.liked : ""
							} ${isLikeAnimating ? styles.animating : ""}`}
							onClick={handleLike}
						>
							<Heart
								size={24}
								fill={currentRecipe.isLiked ? "currentColor" : "none"}
							/>
							<span>{formatNumber(currentRecipe.likes)}</span>
						</button>
						<button
							className={`${styles.actionBtn} ${
								currentRecipe.isSaved ? styles.saved : ""
							}`}
							onClick={handleSave}
						>
							<Bookmark
								size={24}
								fill={currentRecipe.isSaved ? "currentColor" : "none"}
							/>
							<span>Save</span>
						</button>
						<button className={styles.actionBtn} onClick={handleShare}>
							<Share2 size={24} />
							<span>Share</span>
						</button>
					</div>

					{/* Meta Info */}
					<div className={styles.metaRow}>
						<div className={styles.metaItem}>
							<Clock size={18} />
							<span>{totalTime} min</span>
						</div>
						<div className={styles.metaDivider} />
						<div className={styles.metaItem}>
							<Users size={18} />
							<span>{recipe.servings} servings</span>
						</div>
						<div className={styles.metaDivider} />
						<div className={styles.metaItem}>
							<Flame size={18} />
							<span>{recipe.calories} cal</span>
						</div>
					</div>

					{/* Creator */}
					<div className={styles.creatorCard}>
						<Avatar
							src={recipe.creatorAvatar}
							alt={recipe.creatorName}
							size="medium"
						/>
						<div className={styles.creatorInfo}>
							<span className={styles.creatorLabel}>Recipe by</span>
							<span className={styles.creatorName}>{recipe.creatorName}</span>
						</div>
					</div>
				</div>

				{/* Time Breakdown */}
				<div className={styles.timeBreakdown}>
					<div className={styles.timeItem}>
						<span className={styles.timeLabel}>Prep</span>
						<span className={styles.timeValue}>{recipe.prepTime} min</span>
					</div>
					<div className={styles.timeItem}>
						<span className={styles.timeLabel}>Cook</span>
						<span className={styles.timeValue}>{recipe.cookTime} min</span>
					</div>
					<div className={styles.timeItem}>
						<span className={styles.timeLabel}>Total</span>
						<span className={styles.timeValue}>{totalTime} min</span>
					</div>
				</div>

				{/* Nutrition */}
				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>Nutrition per serving</h2>
					<div className={styles.nutritionGrid}>
						{[
							{
								label: "Calories",
								value: recipe.calories,
								unit: "kcal",
								color: "#FF6B35",
							},
							{
								label: "Protein",
								value: recipe.protein,
								unit: "g",
								color: "#E53935",
							},
							{
								label: "Carbs",
								value: recipe.carbs,
								unit: "g",
								color: "#FB8C00",
							},
							{label: "Fat", value: recipe.fat, unit: "g", color: "#7CB342"},
						].map((item) => (
							<div key={item.label} className={styles.nutritionItem}>
								<span
									className={styles.nutritionValue}
									style={{color: item.color}}
								>
									{Math.round((item.value / recipe.servings) * servings)}
									<small>{item.unit}</small>
								</span>
								<span className={styles.nutritionLabel}>{item.label}</span>
							</div>
						))}
					</div>
				</div>

				{/* Ingredients */}
				<div className={styles.section}>
					<div className={styles.sectionHeader}>
						<h2 className={styles.sectionTitle}>Ingredients</h2>
						<div className={styles.servingsControl}>
							<button
								className={styles.servingsBtn}
								onClick={() => handleServingsChange(-1)}
								disabled={servings <= 1}
							>
								<Minus size={16} />
							</button>
							<span className={styles.servingsValue}>{servings}</span>
							<button
								className={styles.servingsBtn}
								onClick={() => handleServingsChange(1)}
								disabled={servings >= 20}
							>
								<Plus size={16} />
							</button>
						</div>
					</div>

					<ul className={styles.ingredientsList}>
						{recipe.ingredients.map((ingredient) => (
							<li key={ingredient.id} className={styles.ingredientItem}>
								<img
									src={ingredient.imageUrl}
									alt={ingredient.name}
									className={styles.ingredientImage}
									onError={(e) => {
										(e.target as HTMLImageElement).src =
											"https://via.placeholder.com/60?text=🥗";
									}}
								/>
								<div className={styles.ingredientInfo}>
									<span className={styles.ingredientName}>
										{ingredient.name}
									</span>
									<span className={styles.ingredientQty}>
										{scaleQuantity(ingredient.quantity)} {ingredient.unit}
									</span>
								</div>
							</li>
						))}
					</ul>
				</div>

				{/* Method */}
				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>Method</h2>
					<ol className={styles.stepsList}>
						{recipe.steps.map((step, index) => {
							const isCompleted = completedSteps.has(index);
							return (
								<li
									key={index}
									className={`${styles.stepItem} ${
										isCompleted ? styles.completed : ""
									}`}
									onClick={() => toggleStep(index)}
								>
									<div className={styles.stepNumber}>
										{isCompleted ? (
											<Check size={16} strokeWidth={3} />
										) : (
											index + 1
										)}
									</div>
									<p className={styles.stepText}>{step}</p>
								</li>
							);
						})}
					</ol>
				</div>
			</div>

			{/* Fixed Bottom Actions */}
			<div className={styles.bottomActions}>
				<Button
					variant="primary"
					size="large"
					fullWidth
					icon={<ShoppingCart size={20} />}
					onClick={handleAddToCart}
					className={showAddedToCart ? styles.successBtn : ""}
				>
					{showAddedToCart ? "Added to Cart!" : "Add to Cart"}
				</Button>
				<Button
					variant="outline"
					size="large"
					fullWidth
					icon={<Calendar size={20} />}
					onClick={handleAddToPlanner}
				>
					Add to Planner
				</Button>
			</div>
		</div>
	);
};

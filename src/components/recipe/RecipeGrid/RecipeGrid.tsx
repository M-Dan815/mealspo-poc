import React from "react";
import {Recipe} from "../../../types";
import {RecipeCard} from "../RecipeCard";
import styles from "./RecipeGrid.module.css";

interface RecipeGridProps {
	recipes: Recipe[];
	columns?: 2 | 3;
	gap?: "small" | "medium";
	onRecipeClick?: (recipe: Recipe) => void;
}

export const RecipeGrid: React.FC<RecipeGridProps> = ({
	recipes,
	columns = 3,
	gap = "small",
	onRecipeClick,
}) => {
	const gridClasses = [
		styles.grid,
		styles[`columns${columns}`],
		styles[`gap${gap}`],
	]
		.filter(Boolean)
		.join(" ");

	return (
		<div className={gridClasses}>
			{recipes.map((recipe, index) => (
				<div
					key={recipe.id}
					className={styles.gridItem}
					style={{animationDelay: `${index * 50}ms`}}
				>
					<RecipeCard
						recipe={recipe}
						variant="grid"
						onClick={() => onRecipeClick?.(recipe)}
					/>
				</div>
			))}
		</div>
	);
};

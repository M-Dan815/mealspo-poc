import React from "react";
import {Ingredient} from "../../../types";
import styles from "./IngredientList.module.css";

interface IngredientListProps {
	ingredients: Ingredient[];
	servings: number;
	originalServings: number;
	showImages?: boolean;
}

export const IngredientList: React.FC<IngredientListProps> = ({
	ingredients,
	servings,
	originalServings,
	showImages = true,
}) => {
	const scaleQuantity = (quantity: number): string => {
		const scaled = (quantity / originalServings) * servings;

		// Format the number nicely
		if (scaled === Math.floor(scaled)) {
			return scaled.toString();
		}

		// Handle common fractions
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

	return (
		<div className={styles.ingredientList}>
			<h3 className={styles.title}>Ingredients</h3>
			<p className={styles.servingsNote}>For {servings} servings</p>

			<ul className={styles.list}>
				{ingredients.map((ingredient) => (
					<li key={ingredient.id} className={styles.item}>
						{showImages && (
							<div className={styles.imageWrapper}>
								<img
									src={ingredient.imageUrl}
									alt={ingredient.name}
									className={styles.image}
									loading="lazy"
									onError={(e) => {
										(e.target as HTMLImageElement).src =
											"https://via.placeholder.com/60?text=🥗";
									}}
								/>
							</div>
						)}
						<div className={styles.details}>
							<span className={styles.name}>{ingredient.name}</span>
							<span className={styles.quantity}>
								{scaleQuantity(ingredient.quantity)} {ingredient.unit}
							</span>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

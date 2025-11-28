import React from "react";
import {Flame, Beef, Wheat, Droplet} from "lucide-react";
import styles from "./NutritionInfo.module.css";

interface NutritionInfoProps {
	calories: number;
	protein: number;
	carbs: number;
	fat: number;
	servings: number;
	originalServings: number;
}

export const NutritionInfo: React.FC<NutritionInfoProps> = ({
	calories,
	protein,
	carbs,
	fat,
	servings,
	originalServings,
}) => {
	const scale = servings / originalServings;

	const nutritionItems = [
		{
			icon: <Flame size={18} />,
			label: "Calories",
			value: Math.round(calories * scale),
			unit: "kcal",
			color: "#FF6B35",
		},
		{
			icon: <Beef size={18} />,
			label: "Protein",
			value: Math.round(protein * scale),
			unit: "g",
			color: "#E53935",
		},
		{
			icon: <Wheat size={18} />,
			label: "Carbs",
			value: Math.round(carbs * scale),
			unit: "g",
			color: "#FB8C00",
		},
		{
			icon: <Droplet size={18} />,
			label: "Fat",
			value: Math.round(fat * scale),
			unit: "g",
			color: "#7CB342",
		},
	];

	return (
		<div className={styles.nutritionContainer}>
			<h3 className={styles.title}>Nutrition per serving</h3>

			<div className={styles.nutritionGrid}>
				{nutritionItems.map((item) => (
					<div
						key={item.label}
						className={styles.nutritionItem}
						style={{"--item-color": item.color} as React.CSSProperties}
					>
						<div className={styles.iconWrapper}>{item.icon}</div>
						<div className={styles.details}>
							<span className={styles.value}>
								{item.value}
								<span className={styles.unit}>{item.unit}</span>
							</span>
							<span className={styles.label}>{item.label}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

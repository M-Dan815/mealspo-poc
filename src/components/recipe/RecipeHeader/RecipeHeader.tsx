import React from "react";
import {Clock, Users} from "lucide-react";
import {Recipe} from "../../../types";
import {Avatar} from "../../common/Avatar";
import {Badge} from "../../common/Badge";
import styles from "./RecipeHeader.module.css";

interface RecipeHeaderProps {
	recipe: Recipe;
}

export const RecipeHeader: React.FC<RecipeHeaderProps> = ({recipe}) => {
	const totalTime = recipe.prepTime + recipe.cookTime;

	return (
		<div className={styles.headerContainer}>
			<div className={styles.imageWrapper}>
				<img
					src={recipe.imageUrl}
					alt={recipe.title}
					className={styles.image}
				/>
				<div className={styles.overlay} />
			</div>

			<div className={styles.content}>
				<div className={styles.tags}>
					{recipe.tags.slice(0, 3).map((tag) => (
						<Badge key={tag} variant="primary" size="small">
							{tag}
						</Badge>
					))}
				</div>

				<h1 className={styles.title}>{recipe.title}</h1>
				<p className={styles.description}>{recipe.description}</p>

				<div className={styles.meta}>
					<div className={styles.metaItem}>
						<Clock size={16} />
						<span>{totalTime} min</span>
					</div>
					<div className={styles.metaDivider} />
					<div className={styles.metaItem}>
						<Users size={16} />
						<span>{recipe.servings} servings</span>
					</div>
				</div>

				<div className={styles.creator}>
					<Avatar
						src={recipe.creatorAvatar}
						alt={recipe.creatorName}
						size="small"
					/>
					<div className={styles.creatorInfo}>
						<span className={styles.creatorLabel}>Recipe by</span>
						<span className={styles.creatorName}>{recipe.creatorName}</span>
					</div>
				</div>

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
			</div>
		</div>
	);
};

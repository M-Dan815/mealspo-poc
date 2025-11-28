import React, {useState} from "react";
import {Heart, MessageCircle, Bookmark, Play} from "lucide-react";
import {Recipe} from "../../../types";
import {Avatar} from "../../common/Avatar";
import {useApp} from "../../../context/AppContext";
import {useAnalytics} from "../../../context/AnalyticsContext";
import styles from "./RecipeCard.module.css";

interface RecipeCardProps {
	recipe: Recipe;
	variant?: "feed" | "grid" | "compact";
	showCreator?: boolean;
	onClick?: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
	recipe,
	variant = "feed",
	showCreator = true,
	onClick,
}) => {
	const {navigate, dispatch, triggerPopup, state} = useApp();
	const {trackButtonClick} = useAnalytics();
	const [isLikeAnimating, setIsLikeAnimating] = useState(false);

	const currentRecipe = state.recipes.find((r) => r.id === recipe.id) || recipe;

	const handleCardClick = () => {
		trackButtonClick("recipe_card", variant);
		if (onClick) {
			onClick();
		} else {
			navigate("recipe", recipe.id);
		}
	};

	const handleLike = (e: React.MouseEvent) => {
		e.stopPropagation();
		trackButtonClick("like_button", "recipe_card");

		if (!currentRecipe.isLiked) {
			triggerPopup("like");
		}

		setIsLikeAnimating(true);
		dispatch({type: "TOGGLE_LIKE", recipeId: recipe.id});

		setTimeout(() => setIsLikeAnimating(false), 800);
	};

	const handleSave = (e: React.MouseEvent) => {
		e.stopPropagation();
		trackButtonClick("save_button", "recipe_card");
		dispatch({type: "TOGGLE_SAVE", recipeId: recipe.id});
	};

	const formatNumber = (num: number): string => {
		if (num >= 1000000) {
			return `${(num / 1000000).toFixed(1)}M`;
		}
		if (num >= 1000) {
			return `${(num / 1000).toFixed(1)}K`;
		}
		return num.toString();
	};

	if (variant === "grid") {
		return (
			<div className={styles.gridCard} onClick={handleCardClick}>
				<div className={styles.gridImageWrapper}>
					<img
						src={recipe.imageUrl}
						alt={recipe.title}
						className={styles.gridImage}
						loading="lazy"
					/>
					<div className={styles.gridOverlay}>
						<div className={styles.gridStats}>
							<span className={styles.gridStat}>
								<Heart size={14} fill="white" />
								{formatNumber(currentRecipe.likes)}
							</span>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (variant === "compact") {
		return (
			<div className={styles.compactCard} onClick={handleCardClick}>
				<div className={styles.compactImageWrapper}>
					<img
						src={recipe.imageUrl}
						alt={recipe.title}
						className={styles.compactImage}
						loading="lazy"
					/>
				</div>
				<div className={styles.compactContent}>
					<h4 className={styles.compactTitle}>{recipe.title}</h4>
					<p className={styles.compactMeta}>
						{recipe.prepTime + recipe.cookTime} min • {recipe.calories} cal
					</p>
				</div>
			</div>
		);
	}

	return (
		<article className={styles.feedCard}>
			{showCreator && (
				<div className={styles.header}>
					<Avatar
						src={recipe.creatorAvatar}
						alt={recipe.creatorName}
						size="small"
					/>
					<div className={styles.creatorInfo}>
						<span className={styles.creatorName}>{recipe.creatorName}</span>
					</div>
				</div>
			)}

			<div className={styles.imageWrapper} onClick={handleCardClick}>
				<img
					src={recipe.imageUrl}
					alt={recipe.title}
					className={styles.image}
					loading="lazy"
				/>
				{recipe.videoUrl && (
					<div className={styles.playButton}>
						<Play size={32} fill="white" />
					</div>
				)}
				<div className={styles.timeOverlay}>
					<span>{recipe.prepTime + recipe.cookTime} min</span>
				</div>
			</div>

			<div className={styles.content}>
				<div className={styles.actions}>
					<div className={styles.leftActions}>
						<button
							className={`${styles.actionButton} ${
								currentRecipe.isLiked ? styles.liked : ""
							} ${isLikeAnimating ? styles.animating : ""}`}
							onClick={handleLike}
							aria-label={currentRecipe.isLiked ? "Unlike" : "Like"}
						>
							<Heart
								size={26}
								fill={currentRecipe.isLiked ? "currentColor" : "none"}
							/>
						</button>
						<button
							className={styles.actionButton}
							onClick={(e) => {
								e.stopPropagation();
								trackButtonClick("comment_button", "recipe_card");
							}}
							aria-label="Comment"
						>
							<MessageCircle size={26} />
						</button>
					</div>
					<button
						className={`${styles.actionButton} ${
							currentRecipe.isSaved ? styles.saved : ""
						}`}
						onClick={handleSave}
						aria-label={currentRecipe.isSaved ? "Unsave" : "Save"}
					>
						<Bookmark
							size={26}
							fill={currentRecipe.isSaved ? "currentColor" : "none"}
						/>
					</button>
				</div>

				<div className={styles.stats}>
					<span className={styles.likes}>
						{formatNumber(currentRecipe.likes)} likes
					</span>
				</div>

				<div className={styles.titleSection} onClick={handleCardClick}>
					<h3 className={styles.title}>{recipe.title}</h3>
					<p className={styles.description}>{recipe.description}</p>
				</div>

				<div className={styles.tags}>
					{recipe.tags.slice(0, 3).map((tag) => (
						<span key={tag} className={styles.tag}>
							#{tag}
						</span>
					))}
				</div>
			</div>
		</article>
	);
};

import React, {useRef, useCallback, useEffect, useState} from "react";
import {Recipe} from "../../../types";
import {RecipeCard} from "../RecipeCard";
import {Skeleton} from "../../common/Skeleton";
import styles from "./RecipeFeed.module.css";

interface RecipeFeedProps {
	recipes: Recipe[];
	onLoadMore?: () => void;
	hasMore?: boolean;
	isLoading?: boolean;
}

export const RecipeFeed: React.FC<RecipeFeedProps> = ({
	recipes,
	onLoadMore,
	hasMore = true,
	isLoading = false,
}) => {
	const [displayedRecipes, setDisplayedRecipes] = useState<Recipe[]>([]);
	const observerRef = useRef<IntersectionObserver | null>(null);
	const loadMoreRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Simulate infinite scroll by gradually showing more recipes
		setDisplayedRecipes(recipes);
	}, [recipes]);

	const handleObserver = useCallback(
		(entries: IntersectionObserverEntry[]) => {
			const target = entries[0];
			if (target.isIntersecting && hasMore && !isLoading && onLoadMore) {
				onLoadMore();
			}
		},
		[hasMore, isLoading, onLoadMore]
	);

	useEffect(() => {
		observerRef.current = new IntersectionObserver(handleObserver, {
			root: null,
			rootMargin: "100px",
			threshold: 0.1,
		});

		if (loadMoreRef.current) {
			observerRef.current.observe(loadMoreRef.current);
		}

		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
		};
	}, [handleObserver]);

	const renderSkeleton = () => (
		<div className={styles.skeletonCard}>
			<div className={styles.skeletonHeader}>
				<Skeleton variant="circular" width={32} height={32} />
				<Skeleton width={120} height={16} />
			</div>
			<Skeleton variant="rectangular" width="100%" height={400} />
			<div className={styles.skeletonContent}>
				<Skeleton width="60%" height={20} />
				<Skeleton width="100%" height={14} />
				<Skeleton width="80%" height={14} />
			</div>
		</div>
	);

	return (
		<div className={styles.feed}>
			{displayedRecipes.map((recipe, index) => (
				<div
					key={recipe.id}
					className={styles.feedItem}
					style={{animationDelay: `${index * 100}ms`}}
				>
					<RecipeCard recipe={recipe} variant="feed" />
				</div>
			))}

			{isLoading && (
				<>
					{renderSkeleton()}
					{renderSkeleton()}
				</>
			)}

			<div ref={loadMoreRef} className={styles.loadMoreTrigger} />

			{!hasMore && displayedRecipes.length > 0 && (
				<div className={styles.endMessage}>
					<p>You've seen all the recipes! 🍳</p>
				</div>
			)}
		</div>
	);
};

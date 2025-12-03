import React, {useRef, useCallback, useEffect, useState} from "react";
import {Recipe} from "../../../types";
import {RecipeCard} from "../RecipeCard";
import {Skeleton} from "../../common/Skeleton";
import {ShoppingCart} from "lucide-react";
import styles from "./RecipeFeed.module.css";

interface RecipeFeedProps {
	recipes: Recipe[];
	onLoadMore?: () => void;
	hasMore?: boolean;
	isLoading?: boolean;
}

// Simulated live order counts (in a real app, this would come from your backend)
const getInitialOrderCount = (recipeId: string): number => {
	// Generate a consistent "random" number based on recipe ID
	const hash = recipeId
		.split("")
		.reduce((acc, char) => acc + char.charCodeAt(0), 0);
	return 150 + (hash % 850); // Between 150-1000 orders
};

export const RecipeFeed: React.FC<RecipeFeedProps> = ({
	recipes,
	onLoadMore,
	hasMore = true,
	isLoading = false,
}) => {
	const [displayedRecipes, setDisplayedRecipes] = useState<Recipe[]>([]);
	const [orderCounts, setOrderCounts] = useState<Record<string, number>>({});
	const observerRef = useRef<IntersectionObserver | null>(null);
	const loadMoreRef = useRef<HTMLDivElement>(null);

	// Initialize order counts
	useEffect(() => {
		const initialCounts: Record<string, number> = {};
		recipes.forEach((recipe) => {
			if (!orderCounts[recipe.id]) {
				initialCounts[recipe.id] = getInitialOrderCount(recipe.id);
			}
		});
		setOrderCounts((prev) => ({...prev, ...initialCounts}));
	}, [recipes]);

	// Simulate live order updates
	useEffect(() => {
		const interval = setInterval(() => {
			setOrderCounts((prev) => {
				const updated = {...prev};
				// Randomly update 1-3 recipes
				const recipesToUpdate = recipes
					.sort(() => Math.random() - 0.5)
					.slice(0, Math.floor(Math.random() * 3) + 1);

				recipesToUpdate.forEach((recipe) => {
					// Randomly increase by 1-3
					if (Math.random() > 0.3) {
						// 70% chance to increase
						updated[recipe.id] =
							(updated[recipe.id] || 0) + Math.floor(Math.random() * 3) + 1;
					}
				});

				return updated;
			});
		}, 5000); // Update every 5 seconds

		return () => clearInterval(interval);
	}, [recipes]);

	useEffect(() => {
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

					{/* Live Order Counter Badge */}
					<div className={styles.orderCountBadge}>
						<ShoppingCart size={14} />
						<span className={styles.orderCount}>
							{orderCounts[recipe.id]?.toLocaleString() || "0"}
						</span>
						<span className={styles.orderLabel}>ordered</span>
					</div>
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

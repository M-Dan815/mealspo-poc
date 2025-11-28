import React, {useState, useCallback} from "react";
import {Header} from "../layout/Header";
import {PageWrapper} from "../layout/PageWrapper";
import {RecipeFeed} from "../recipe/RecipeFeed";
import {useApp} from "../../context/AppContext";
import {mockRecipes} from "../../data/mockRecipes";

export const FeedScreen: React.FC = () => {
	const {state} = useApp();
	const [recipes, setRecipes] = useState(state.recipes);
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(1);

	const handleLoadMore = useCallback(() => {
		if (isLoading) return;

		setIsLoading(true);

		// Simulate loading more recipes
		setTimeout(() => {
			const moreRecipes = [...mockRecipes].sort(() => Math.random() - 0.5);
			setRecipes((prev) => [...prev, ...moreRecipes]);
			setPage((prev) => prev + 1);
			setIsLoading(false);
		}, 1000);
	}, [isLoading]);

	return (
		<>
			<Header variant="home" showUpload />
			<PageWrapper pageName="feed">
				<RecipeFeed
					recipes={recipes}
					onLoadMore={handleLoadMore}
					hasMore={page < 5}
					isLoading={isLoading}
				/>
			</PageWrapper>
		</>
	);
};

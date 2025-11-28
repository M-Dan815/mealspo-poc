import React, {useState} from "react";
import {Search, TrendingUp, X} from "lucide-react";
import {Header} from "../layout";
import {PageWrapper} from "../layout";
import {Container} from "../layout";
import {RecipeGrid} from "../recipe/RecipeGrid";
import {useApp} from "../../context/AppContext";
import {useAnalytics} from "../../context/AnalyticsContext";
import {searchRecipes} from "../../data/mockRecipes";
import {Recipe} from "../../types/index";
import styles from "./ExploreScreen.module.css";

const trendingTags = [
	"healthy",
	"quick",
	"vegetarian",
	"keto",
	"asian",
	"italian",
	"dessert",
	"breakfast",
];

export const ExploreScreen: React.FC = () => {
	const {state, navigate} = useApp();
	const {trackButtonClick} = useAnalytics();
	const [searchQuery, setSearchQuery] = useState("");
	const [isSearchFocused, setIsSearchFocused] = useState(false);

	const filteredRecipes = searchQuery
		? searchRecipes(searchQuery)
		: state.recipes;

	const handleRecipeClick = (recipe: Recipe) => {
		trackButtonClick("recipe_card", "explore");
		navigate("recipe", recipe.id);
	};

	const handleTagClick = (tag: string) => {
		trackButtonClick("trending_tag", tag);
		setSearchQuery(tag);
	};

	const clearSearch = () => {
		setSearchQuery("");
	};

	return (
		<>
			<Header variant="simple" title="Explore" />
			<PageWrapper pageName="explore">
				<Container>
					{/* Search Bar */}
					<div className={styles.searchSection}>
						<div className={styles.searchWrapper}>
							<Search size={20} className={styles.searchIcon} />
							<input
								type="text"
								placeholder="Search recipes, ingredients..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								onFocus={() => setIsSearchFocused(true)}
								onBlur={() => setIsSearchFocused(false)}
								className={styles.searchInput}
							/>
							{searchQuery && (
								<button className={styles.clearButton} onClick={clearSearch}>
									<X size={18} />
								</button>
							)}
						</div>
					</div>

					{/* Trending Tags */}
					{!searchQuery && (
						<div className={styles.trendingSection}>
							<div className={styles.sectionHeader}>
								<TrendingUp size={18} />
								<span>Trending</span>
							</div>
							<div className={styles.tagsList}>
								{trendingTags.map((tag) => (
									<button
										key={tag}
										className={styles.tag}
										onClick={() => handleTagClick(tag)}
									>
										#{tag}
									</button>
								))}
							</div>
						</div>
					)}

					{/* Search Results or Grid */}
					<div className={styles.gridSection}>
						{searchQuery && (
							<p className={styles.resultCount}>
								{filteredRecipes.length} recipes found
							</p>
						)}
						<RecipeGrid
							recipes={filteredRecipes}
							columns={3}
							gap="small"
							onRecipeClick={handleRecipeClick}
						/>
					</div>
				</Container>
			</PageWrapper>
		</>
	);
};

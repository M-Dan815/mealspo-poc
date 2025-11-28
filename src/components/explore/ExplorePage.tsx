import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {useApp} from "../../context/AppContext";
import {useAnalytics} from "../../hooks/useAnalytics";
import {SearchIcon, HeartIcon, PlayIcon} from "../ui/Icons";
import {Recipe} from "../../types";

const ExploreContainer = styled.div`
	padding: 16px;
`;

const SearchBar = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
	background: var(--surface);
	padding: 12px 16px;
	border-radius: var(--radius-full);
	margin-bottom: 16px;
	box-shadow: var(--shadow-sm);
`;

const SearchInput = styled.input`
	flex: 1;
	border: none;
	outline: none;
	font-size: 15px;
	background: transparent;
	color: var(--text-primary);

	&::placeholder {
		color: var(--text-tertiary);
	}
`;

const Categories = styled.div`
	display: flex;
	gap: 8px;
	margin-bottom: 16px;
	overflow-x: auto;
	padding-bottom: 8px;

	&::-webkit-scrollbar {
		display: none;
	}
`;

const CategoryChip = styled.button<{$active: boolean}>`
	padding: 8px 16px;
	border-radius: var(--radius-full);
	border: none;
	font-size: 13px;
	font-weight: 500;
	white-space: nowrap;
	cursor: pointer;
	transition: var(--transition);

	${({$active}) =>
		$active
			? `
    background: var(--primary);
    color: white;
  `
			: `
    background: var(--surface);
    color: var(--text-secondary);
  `}

	&:active {
		transform: scale(0.95);
	}
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 4px;
`;

const GridItem = styled.div<{$span?: boolean}>`
	position: relative;
	aspect-ratio: ${({$span}) => ($span ? "1" : "0.8")};
	border-radius: var(--radius-sm);
	overflow: hidden;
	cursor: pointer;
	grid-row: ${({$span}) => ($span ? "span 2" : "span 1")};

	&:nth-child(3n + 1) {
		grid-row: span 2;
		aspect-ratio: 0.8;
	}
`;

const GridImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	transition: transform 0.3s ease;

	${GridItem}:hover & {
		transform: scale(1.05);
	}
`;

const GridOverlay = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 8px;
	background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
	display: flex;
	align-items: center;
	gap: 4px;
	color: white;
	font-size: 12px;
	font-weight: 500;
`;

const VideoIndicator = styled.div`
	position: absolute;
	top: 8px;
	right: 8px;
	background: rgba(0, 0, 0, 0.5);
	padding: 4px;
	border-radius: var(--radius-sm);
`;

const categories = [
	"All",
	"Quick Meals",
	"Healthy",
	"Desserts",
	"Vegetarian",
	"Asian",
	"Italian",
	"Breakfast",
];

export const ExplorePage: React.FC = () => {
	const {recipes, setCurrentScreen, setSelectedRecipe} = useApp();
	const {trackPageView, trackButtonClick} = useAnalytics();
	const [activeCategory, setActiveCategory] = useState("All");
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		trackPageView("explore");
	}, [trackPageView]);

	const handleRecipeClick = (recipe: Recipe) => {
		trackButtonClick("explore_item", {recipeId: recipe.id});
		setSelectedRecipe(recipe);
		setCurrentScreen("recipe");
	};

	const formatNumber = (num: number): string => {
		if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
		return num.toString();
	};

	return (
		<ExploreContainer>
			<SearchBar>
				<SearchIcon size={20} color="var(--text-tertiary)" />
				<SearchInput
					placeholder="Search recipes..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</SearchBar>

			<Categories>
				{categories.map((category) => (
					<CategoryChip
						key={category}
						$active={activeCategory === category}
						onClick={() => setActiveCategory(category)}
					>
						{category}
					</CategoryChip>
				))}
			</Categories>

			<Grid>
				{recipes.map((recipe, index) => (
					<GridItem
						key={recipe.id}
						$span={index % 5 === 0}
						onClick={() => handleRecipeClick(recipe)}
					>
						<GridImage src={recipe.image} alt={recipe.title} loading="lazy" />
						{recipe.video && (
							<VideoIndicator>
								<PlayIcon size={12} color="white" />
							</VideoIndicator>
						)}
						<GridOverlay>
							<HeartIcon size={12} color="white" filled />
							{formatNumber(recipe.likes)}
						</GridOverlay>
					</GridItem>
				))}
			</Grid>
		</ExploreContainer>
	);
};

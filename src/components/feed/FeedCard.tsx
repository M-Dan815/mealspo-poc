import React, {useState} from "react";
import styled from "styled-components";
import {Recipe} from "../../types";
import {useApp} from "../../context/AppContext";
import {useAnalytics} from "../../hooks/useAnalytics";
import {HeartIcon, ShareIcon, BookmarkIcon, EyeIcon} from "../ui/Icons";

const CardContainer = styled.article`
	background: var(--surface);
	margin-bottom: 8px;
	animation: slideUp 0.3s ease forwards;
`;

const CardHeader = styled.div`
	display: flex;
	align-items: center;
	padding: 12px 16px;
	gap: 12px;
`;

const Avatar = styled.img`
	width: 36px;
	height: 36px;
	border-radius: var(--radius-full);
	object-fit: cover;
`;

const CreatorInfo = styled.div`
	flex: 1;
`;

const Username = styled.span`
	font-size: 14px;
	font-weight: 600;
	color: var(--text-primary);
`;

const ImageContainer = styled.div`
	position: relative;
	width: 100%;
	aspect-ratio: 1;
	cursor: pointer;
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

const HeartAnimation = styled.div<{$show: boolean}>`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	opacity: ${({$show}) => ($show ? 1 : 0)};
	transition: opacity 0.3s ease;

	svg {
		width: 80px;
		height: 80px;
		fill: white;
		filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));
		animation: ${({$show}) => ($show ? "heartBeat 0.6s ease" : "none")};
	}
`;

const Actions = styled.div`
	display: flex;
	align-items: center;
	padding: 12px 16px;
	gap: 16px;
`;

const ActionButton = styled.button<{$active?: boolean}>`
	display: flex;
	align-items: center;
	gap: 6px;
	background: transparent;
	border: none;
	cursor: pointer;
	color: ${({$active}) => ($active ? "var(--error)" : "var(--text-primary)")};
	transition: var(--transition);

	&:active {
		transform: scale(0.9);
	}

	span {
		font-size: 14px;
		font-weight: 500;
	}
`;

const Spacer = styled.div`
	flex: 1;
`;

const CardContent = styled.div`
	padding: 0 16px 16px;
`;

const Title = styled.h3`
	font-size: 15px;
	font-weight: 600;
	color: var(--text-primary);
	margin-bottom: 4px;
`;

const Stats = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
	font-size: 13px;
	color: var(--text-tertiary);
`;

const StatItem = styled.span`
	display: flex;
	align-items: center;
	gap: 4px;
`;

interface FeedCardProps {
	recipe: Recipe;
}

export const FeedCard: React.FC<FeedCardProps> = ({recipe}) => {
	const {setCurrentScreen, setSelectedRecipe, toggleLike} = useApp();
	const {trackButtonClick} = useAnalytics();
	const [showHeart, setShowHeart] = useState(false);
	const [lastTap, setLastTap] = useState(0);

	const handleDoubleTap = () => {
		const now = Date.now();
		if (now - lastTap < 300) {
			if (!recipe.isLiked) {
				toggleLike(recipe.id);
				setShowHeart(true);
				setTimeout(() => setShowHeart(false), 600);
				trackButtonClick("double_tap_like", {recipeId: recipe.id});
			}
		}
		setLastTap(now);
	};

	const handleTap = () => {
		trackButtonClick("view_recipe", {recipeId: recipe.id});
		setSelectedRecipe(recipe);
		setCurrentScreen("recipe");
	};

	const handleLike = () => {
		toggleLike(recipe.id);
		if (!recipe.isLiked) {
			setShowHeart(true);
			setTimeout(() => setShowHeart(false), 600);
		}
		trackButtonClick("like_button", {
			recipeId: recipe.id,
			liked: !recipe.isLiked,
		});
	};

	const formatNumber = (num: number): string => {
		if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
		if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
		return num.toString();
	};

	return (
		<CardContainer>
			<CardHeader>
				<Avatar src={recipe.creator.avatar} alt={recipe.creator.displayName} />
				<CreatorInfo>
					<Username>{recipe.creator.username}</Username>
				</CreatorInfo>
			</CardHeader>

			<ImageContainer onClick={handleTap} onDoubleClick={handleDoubleTap}>
				<Image src={recipe.image} alt={recipe.title} loading="lazy" />
				<HeartAnimation $show={showHeart}>
					<HeartIcon filled color="white" />
				</HeartAnimation>
			</ImageContainer>

			<Actions>
				<ActionButton $active={recipe.isLiked} onClick={handleLike}>
					<HeartIcon size={24} filled={recipe.isLiked} />
					<span>{formatNumber(recipe.likes)}</span>
				</ActionButton>
				<ActionButton>
					<ShareIcon size={24} />
					<span>{formatNumber(recipe.shares)}</span>
				</ActionButton>
				<Spacer />
				<ActionButton>
					<BookmarkIcon size={24} />
				</ActionButton>
			</Actions>

			<CardContent>
				<Title>{recipe.title}</Title>
				<Stats>
					<StatItem>
						<EyeIcon size={14} />
						{formatNumber(recipe.views)} views
					</StatItem>
					<StatItem>•</StatItem>
					<StatItem>{recipe.prepTime + recipe.cookTime} min</StatItem>
				</Stats>
			</CardContent>
		</CardContainer>
	);
};

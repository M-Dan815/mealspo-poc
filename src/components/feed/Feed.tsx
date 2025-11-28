import React, {useEffect} from "react";
import styled from "styled-components";
import {FeedCard} from "./FeedCard";
import {useApp} from "../../context/AppContext";
import {useAnalytics} from "../../hooks/useAnalytics";

const FeedContainer = styled.div`
	min-height: 100%;
`;

const LoadingIndicator = styled.div`
	display: flex;
	justify-content: center;
	padding: 24px;
	color: var(--text-tertiary);
	font-size: 14px;
`;

export const Feed: React.FC = () => {
	const {recipes} = useApp();
	const {trackPageView} = useAnalytics();

	useEffect(() => {
		trackPageView("feed");
	}, [trackPageView]);

	return (
		<FeedContainer>
			{recipes.map((recipe, index) => (
				<FeedCard key={recipe.id} recipe={recipe} />
			))}
			<LoadingIndicator>Loading more recipes...</LoadingIndicator>
		</FeedContainer>
	);
};

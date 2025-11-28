import React from "react";
import {useApp} from "./context/AppContext";
import {
	FeedScreen,
	ExploreScreen,
	RecipeDetailScreen,
	PlannerScreen,
	BasketScreen,
	ProfileScreen,
} from "./components/screens";
import styles from "./AppRouter.module.css";

export const AppRouter: React.FC = () => {
	const {state} = useApp();
	const {currentScreen} = state;

	const renderScreen = () => {
		switch (currentScreen) {
			case "feed":
				return <FeedScreen />;
			case "explore":
				return <ExploreScreen />;
			case "recipe":
				return <RecipeDetailScreen />;
			case "planner":
				return <PlannerScreen />;
			case "basket":
				return <BasketScreen />;
			case "profile":
				return <ProfileScreen />;
			default:
				return <FeedScreen />;
		}
	};

	return <div className={styles.router}>{renderScreen()}</div>;
};

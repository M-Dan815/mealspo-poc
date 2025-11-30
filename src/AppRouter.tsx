import React from "react";
import {useApp} from "./context/AppContext";
import {FeedScreen} from "./components/screens/FeedScreen";
import {ExploreScreen} from "./components/screens/ExploreScreen";
import {RecipeDetailScreen} from "./components/screens/RecipeDetailScreen";
import {PlannerScreen} from "./components/screens/PlannerScreen";
import {BasketScreen} from "./components/screens/BasketScreen";
import {ProfileScreen} from "./components/screens/ProfileScreen";
import {UploadScreen} from "./components/screens/UploadScreen";

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
			case "upload":
				return <UploadScreen />;
			default:
				return <FeedScreen />;
		}
	};

	return <>{renderScreen()}</>;
};

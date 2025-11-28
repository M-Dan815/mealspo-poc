import {User} from "../types";
import {mockRecipes} from "./mockRecipes";

export const mockUsers: User[] = [
	{
		id: "user1",
		username: "chefmaria",
		displayName: "Chef Maria",
		avatar:
			"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
		bio: "🍳 Professional Chef | Food Lover | Creating delicious recipes daily",
		followers: 12500,
		following: 234,
		recipesCount: 48,
		recipes: mockRecipes.filter((r) => r.creatorId === "user1"),
	},
	{
		id: "user2",
		username: "healthyhannah",
		displayName: "Healthy Hannah",
		avatar:
			"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
		bio: "🥗 Nutritionist | Plant-based recipes | Wellness advocate",
		followers: 8900,
		following: 156,
		recipesCount: 32,
		recipes: mockRecipes.filter((r) => r.creatorId === "user2"),
	},
	{
		id: "user3",
		username: "kfoodking",
		displayName: "K-Food King",
		avatar:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
		bio: "🇰🇷 Korean cuisine expert | Authentic recipes | Food blogger",
		followers: 25600,
		following: 89,
		recipesCount: 67,
		recipes: mockRecipes.filter((r) => r.creatorId === "user3"),
	},
	{
		id: "currentUser",
		username: "mealspolover",
		displayName: "MealSpo Lover",
		avatar:
			"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
		bio: "🍽️ Home cook | Food enthusiast | Sharing my kitchen adventures",
		followers: 1234,
		following: 567,
		recipesCount: 12,
		recipes: mockRecipes.slice(0, 3),
	},
];

export const getCurrentUser = (): User => {
	return mockUsers.find((user) => user.id === "currentUser")!;
};

export const getUserById = (id: string): User | undefined => {
	return mockUsers.find((user) => user.id === id);
};

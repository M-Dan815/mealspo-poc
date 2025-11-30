import {Recipe} from "../types";

// Using placeholder images that look like supermarket product images
const getIngredientImage = (name: string): string => {
	// Map common ingredients to realistic product-style images
	const ingredientImages: Record<string, string> = {
		// Proteins
		salmon:
			"https://cdn0.woolworths.media/content/wowproductimages/large/577149.jpg",
		chicken:
			"https://cdn0.woolworths.media/content/wowproductimages/large/135988.jpg",
		beef: "https://cdn0.woolworths.media/content/wowproductimages/large/165837.jpg",
		eggs: "https://cdn0.woolworths.media/content/wowproductimages/large/052637.jpg",

		// Dairy
		milk: "https://cdn0.woolworths.media/content/wowproductimages/large/093865.jpg",
		cream:
			"https://cdn0.woolworths.media/content/wowproductimages/large/066498.jpg",
		cheese:
			"https://cdn0.woolworths.media/content/wowproductimages/large/040348.jpg",
		butter:
			"https://cdn0.woolworths.media/content/wowproductimages/large/014498.jpg",
		yogurt:
			"https://cdn0.woolworths.media/content/wowproductimages/large/274548.jpg",

		// Produce
		garlic:
			"https://cdn0.woolworths.media/content/wowproductimages/large/141152.jpg",
		onion:
			"https://cdn0.woolworths.media/content/wowproductimages/large/135060.jpg",
		tomato:
			"https://cdn0.woolworths.media/content/wowproductimages/large/134671.jpg",
		spinach:
			"https://cdn0.woolworths.media/content/wowproductimages/large/165262.jpg",
		avocado:
			"https://cdn0.woolworths.media/content/wowproductimages/large/133211.jpg",
		lemon:
			"https://cdn0.woolworths.media/content/wowproductimages/large/131369.jpg",
		mushroom:
			"https://cdn0.woolworths.media/content/wowproductimages/large/135220.jpg",
		cucumber:
			"https://cdn0.woolworths.media/content/wowproductimages/large/135177.jpg",
		berries:
			"https://cdn0.woolworths.media/content/wowproductimages/large/121838.jpg",

		// Pantry
		rice: "https://cdn0.woolworths.media/content/wowproductimages/large/070771.jpg",
		pasta:
			"https://cdn0.woolworths.media/content/wowproductimages/large/014163.jpg",
		oats: "https://cdn0.woolworths.media/content/wowproductimages/large/052910.jpg",
		flour:
			"https://cdn0.woolworths.media/content/wowproductimages/large/014100.jpg",
		sugar:
			"https://cdn0.woolworths.media/content/wowproductimages/large/014017.jpg",
		oil: "https://cdn0.woolworths.media/content/wowproductimages/large/014443.jpg",
		"soy sauce":
			"https://cdn0.woolworths.media/content/wowproductimages/large/014613.jpg",
		honey:
			"https://cdn0.woolworths.media/content/wowproductimages/large/052628.jpg",

		// Default fallback
		default:
			"https://cdn0.woolworths.media/content/wowproductimages/large/014163.jpg",
	};

	// Find matching ingredient
	const lowerName = name.toLowerCase();
	for (const [key, url] of Object.entries(ingredientImages)) {
		if (lowerName.includes(key)) {
			return url;
		}
	}

	// Return placeholder if no match
	return `https://via.placeholder.com/200x200/f5f5f5/999?text=${encodeURIComponent(
		name
	)}`;
};

export const mockRecipes: Recipe[] = [
	{
		id: "1",
		title: "Creamy Garlic Tuscan Salmon",
		description:
			"A delicious pan-seared salmon in a creamy garlic sauce with sun-dried tomatoes and spinach.",
		imageUrl:
			"https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=1000&fit=crop",
		creatorId: "user1",
		creatorName: "Chef Maria",
		creatorAvatar:
			"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
		prepTime: 10,
		cookTime: 20,
		servings: 4,
		calories: 485,
		protein: 42,
		carbs: 8,
		fat: 32,
		ingredients: [
			{
				id: "ing1",
				name: "Salmon Fillets",
				quantity: 4,
				unit: "pieces",
				imageUrl: getIngredientImage("salmon"),
				category: "meat",
			},
			{
				id: "ing2",
				name: "Garlic Cloves",
				quantity: 4,
				unit: "cloves",
				imageUrl: getIngredientImage("garlic"),
				category: "produce",
			},
			{
				id: "ing3",
				name: "Thickened Cream",
				quantity: 1,
				unit: "cup",
				imageUrl: getIngredientImage("cream"),
				category: "dairy",
			},
			{
				id: "ing4",
				name: "Sun-dried Tomatoes",
				quantity: 0.5,
				unit: "cup",
				imageUrl: getIngredientImage("tomato"),
				category: "pantry",
			},
			{
				id: "ing5",
				name: "Baby Spinach",
				quantity: 2,
				unit: "cups",
				imageUrl: getIngredientImage("spinach"),
				category: "produce",
			},
			{
				id: "ing6",
				name: "Parmesan Cheese",
				quantity: 0.5,
				unit: "cup",
				imageUrl: getIngredientImage("cheese"),
				category: "dairy",
			},
			{
				id: "ing7",
				name: "Olive Oil",
				quantity: 2,
				unit: "tbsp",
				imageUrl: getIngredientImage("oil"),
				category: "pantry",
			},
		],
		steps: [
			"Season salmon fillets with salt and pepper on both sides.",
			"Heat olive oil in a large skillet over medium-high heat.",
			"Sear salmon for 4-5 minutes per side until golden. Remove and set aside.",
			"In the same pan, sauté minced garlic for 30 seconds until fragrant.",
			"Add thickened cream and bring to a simmer.",
			"Stir in sun-dried tomatoes and parmesan cheese.",
			"Add spinach and cook until wilted.",
			"Return salmon to the pan and spoon sauce over the top.",
			"Serve immediately with your favorite sides.",
		],
		likes: 2453,
		shares: 342,
		views: 15234,
		isLiked: false,
		isSaved: false,
		createdAt: new Date("2024-01-15"),
		tags: ["salmon", "keto", "high-protein", "dinner"],
	},
	{
		id: "2",
		title: "Overnight Oats with Berries",
		description:
			"Creamy and delicious overnight oats topped with fresh berries and honey.",
		imageUrl:
			"https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=800&h=1000&fit=crop",
		creatorId: "user2",
		creatorName: "Healthy Hannah",
		creatorAvatar:
			"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
		prepTime: 5,
		cookTime: 0,
		servings: 2,
		calories: 320,
		protein: 12,
		carbs: 52,
		fat: 8,
		ingredients: [
			{
				id: "ing8",
				name: "Rolled Oats",
				quantity: 1,
				unit: "cup",
				imageUrl: getIngredientImage("oats"),
				category: "pantry",
			},
			{
				id: "ing9",
				name: "Almond Milk",
				quantity: 1,
				unit: "cup",
				imageUrl: getIngredientImage("milk"),
				category: "dairy",
			},
			{
				id: "ing10",
				name: "Greek Yoghurt",
				quantity: 0.5,
				unit: "cup",
				imageUrl: getIngredientImage("yogurt"),
				category: "dairy",
			},
			{
				id: "ing11",
				name: "Mixed Berries",
				quantity: 1,
				unit: "cup",
				imageUrl: getIngredientImage("berries"),
				category: "produce",
			},
			{
				id: "ing12",
				name: "Honey",
				quantity: 2,
				unit: "tbsp",
				imageUrl: getIngredientImage("honey"),
				category: "pantry",
			},
		],
		steps: [
			"Combine oats, almond milk, and yoghurt in a jar.",
			"Stir well and cover tightly.",
			"Refrigerate overnight or at least 4 hours.",
			"Top with fresh berries and drizzle with honey before serving.",
			"Enjoy cold or heat in microwave for 1-2 minutes.",
		],
		likes: 1876,
		shares: 234,
		views: 12456,
		isLiked: false,
		isSaved: false,
		createdAt: new Date("2024-01-14"),
		tags: ["breakfast", "healthy", "meal-prep", "vegetarian"],
	},
	{
		id: "3",
		title: "Classic Chicken Stir Fry",
		description:
			"Quick and easy chicken stir fry with fresh vegetables and a savory sauce.",
		imageUrl:
			"https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=1000&fit=crop",
		creatorId: "user3",
		creatorName: "Quick Meals Mike",
		creatorAvatar:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
		prepTime: 15,
		cookTime: 10,
		servings: 4,
		calories: 380,
		protein: 35,
		carbs: 28,
		fat: 14,
		ingredients: [
			{
				id: "ing13",
				name: "Chicken Breast",
				quantity: 500,
				unit: "g",
				imageUrl: getIngredientImage("chicken"),
				category: "meat",
			},
			{
				id: "ing14",
				name: "Jasmine Rice",
				quantity: 2,
				unit: "cups",
				imageUrl: getIngredientImage("rice"),
				category: "pantry",
			},
			{
				id: "ing15",
				name: "Soy Sauce",
				quantity: 3,
				unit: "tbsp",
				imageUrl: getIngredientImage("soy sauce"),
				category: "pantry",
			},
			{
				id: "ing16",
				name: "Garlic",
				quantity: 3,
				unit: "cloves",
				imageUrl: getIngredientImage("garlic"),
				category: "produce",
			},
			{
				id: "ing17",
				name: "Brown Onion",
				quantity: 1,
				unit: "whole",
				imageUrl: getIngredientImage("onion"),
				category: "produce",
			},
		],
		steps: [
			"Cook rice according to package instructions.",
			"Slice chicken into thin strips and season.",
			"Heat oil in a wok over high heat.",
			"Stir fry chicken until golden, about 5 minutes.",
			"Add garlic and onion, cook for 2 minutes.",
			"Add soy sauce and toss to combine.",
			"Serve hot over steamed rice.",
		],
		likes: 3421,
		shares: 567,
		views: 23456,
		isLiked: false,
		isSaved: false,
		createdAt: new Date("2024-01-13"),
		tags: ["asian", "quick", "chicken", "dinner"],
	},
	{
		id: "4",
		title: "Avocado Toast Supreme",
		description:
			"Elevated avocado toast with poached eggs and everything bagel seasoning.",
		imageUrl:
			"https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&h=1000&fit=crop",
		creatorId: "user4",
		creatorName: "Brunch Boss",
		creatorAvatar:
			"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
		prepTime: 10,
		cookTime: 5,
		servings: 2,
		calories: 340,
		protein: 14,
		carbs: 28,
		fat: 22,
		ingredients: [
			{
				id: "ing18",
				name: "Sourdough Bread",
				quantity: 2,
				unit: "slices",
				imageUrl: getIngredientImage("default"),
				category: "bakery",
			},
			{
				id: "ing19",
				name: "Avocado",
				quantity: 1,
				unit: "large",
				imageUrl: getIngredientImage("avocado"),
				category: "produce",
			},
			{
				id: "ing20",
				name: "Free Range Eggs",
				quantity: 2,
				unit: "large",
				imageUrl: getIngredientImage("eggs"),
				category: "dairy",
			},
			{
				id: "ing21",
				name: "Cherry Tomatoes",
				quantity: 0.5,
				unit: "cup",
				imageUrl: getIngredientImage("tomato"),
				category: "produce",
			},
			{
				id: "ing22",
				name: "Lemon",
				quantity: 0.5,
				unit: "whole",
				imageUrl: getIngredientImage("lemon"),
				category: "produce",
			},
		],
		steps: [
			"Toast sourdough slices until golden.",
			"Mash avocado with salt, pepper, and lemon juice.",
			"Poach eggs in simmering water for 3-4 minutes.",
			"Spread mashed avocado on toast.",
			"Top with poached eggs and halved tomatoes.",
			"Season and serve immediately.",
		],
		likes: 4532,
		shares: 678,
		views: 34567,
		isLiked: false,
		isSaved: false,
		createdAt: new Date("2024-01-10"),
		tags: ["breakfast", "brunch", "avocado", "healthy"],
	},
	{
		id: "5",
		title: "Creamy Mushroom Risotto",
		description:
			"Rich and creamy Italian risotto loaded with mixed mushrooms and parmesan.",
		imageUrl:
			"https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&h=1000&fit=crop",
		creatorId: "user5",
		creatorName: "Italian Kitchen",
		creatorAvatar:
			"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
		prepTime: 10,
		cookTime: 35,
		servings: 4,
		calories: 450,
		protein: 12,
		carbs: 62,
		fat: 18,
		ingredients: [
			{
				id: "ing23",
				name: "Arborio Rice",
				quantity: 1.5,
				unit: "cups",
				imageUrl: getIngredientImage("rice"),
				category: "pantry",
			},
			{
				id: "ing24",
				name: "Mixed Mushrooms",
				quantity: 300,
				unit: "g",
				imageUrl: getIngredientImage("mushroom"),
				category: "produce",
			},
			{
				id: "ing25",
				name: "Parmesan Cheese",
				quantity: 0.75,
				unit: "cup",
				imageUrl: getIngredientImage("cheese"),
				category: "dairy",
			},
			{
				id: "ing26",
				name: "Butter",
				quantity: 3,
				unit: "tbsp",
				imageUrl: getIngredientImage("butter"),
				category: "dairy",
			},
			{
				id: "ing27",
				name: "Garlic",
				quantity: 2,
				unit: "cloves",
				imageUrl: getIngredientImage("garlic"),
				category: "produce",
			},
			{
				id: "ing28",
				name: "Brown Onion",
				quantity: 1,
				unit: "medium",
				imageUrl: getIngredientImage("onion"),
				category: "produce",
			},
		],
		steps: [
			"Heat stock in a saucepan and keep warm.",
			"Sauté mushrooms in butter until golden, set aside.",
			"Toast rice in butter for 2 minutes.",
			"Add stock one ladle at a time, stirring constantly.",
			"Continue until rice is creamy and al dente (20-25 min).",
			"Stir in mushrooms and parmesan.",
			"Season and serve immediately.",
		],
		likes: 1987,
		shares: 287,
		views: 14532,
		isLiked: false,
		isSaved: false,
		createdAt: new Date("2024-01-09"),
		tags: ["italian", "risotto", "vegetarian", "dinner"],
	},
	{
		id: "6",
		title: "Beef Tacos with Fresh Salsa",
		description:
			"Authentic Mexican-style tacos with seasoned ground beef and homemade salsa.",
		imageUrl:
			"https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&h=1000&fit=crop",
		creatorId: "user6",
		creatorName: "Taco Tuesday",
		creatorAvatar:
			"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
		prepTime: 15,
		cookTime: 15,
		servings: 4,
		calories: 420,
		protein: 28,
		carbs: 35,
		fat: 22,
		ingredients: [
			{
				id: "ing29",
				name: "Beef Mince",
				quantity: 500,
				unit: "g",
				imageUrl: getIngredientImage("beef"),
				category: "meat",
			},
			{
				id: "ing30",
				name: "Taco Shells",
				quantity: 8,
				unit: "pieces",
				imageUrl: getIngredientImage("default"),
				category: "pantry",
			},
			{
				id: "ing31",
				name: "Tomatoes",
				quantity: 2,
				unit: "medium",
				imageUrl: getIngredientImage("tomato"),
				category: "produce",
			},
			{
				id: "ing32",
				name: "Brown Onion",
				quantity: 1,
				unit: "medium",
				imageUrl: getIngredientImage("onion"),
				category: "produce",
			},
			{
				id: "ing33",
				name: "Cheddar Cheese",
				quantity: 1,
				unit: "cup",
				imageUrl: getIngredientImage("cheese"),
				category: "dairy",
			},
			{
				id: "ing34",
				name: "Avocado",
				quantity: 1,
				unit: "large",
				imageUrl: getIngredientImage("avocado"),
				category: "produce",
			},
		],
		steps: [
			"Brown beef mince in a large pan.",
			"Add taco seasoning and water, simmer 5 mins.",
			"Dice tomatoes and onion for fresh salsa.",
			"Warm taco shells according to package.",
			"Fill shells with beef, cheese, salsa.",
			"Top with sliced avocado and serve.",
		],
		likes: 2876,
		shares: 423,
		views: 18765,
		isLiked: false,
		isSaved: false,
		createdAt: new Date("2024-01-08"),
		tags: ["mexican", "tacos", "quick", "dinner"],
	},
];

export const getRecipeById = (id: string): Recipe | undefined => {
	return mockRecipes.find((recipe) => recipe.id === id);
};

export const getRecipesByCreator = (creatorId: string): Recipe[] => {
	return mockRecipes.filter((recipe) => recipe.creatorId === creatorId);
};

export const searchRecipes = (query: string): Recipe[] => {
	const lowerQuery = query.toLowerCase();
	return mockRecipes.filter(
		(recipe) =>
			recipe.title.toLowerCase().includes(lowerQuery) ||
			recipe.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
			recipe.creatorName.toLowerCase().includes(lowerQuery)
	);
};

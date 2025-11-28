import {Recipe} from "../types";

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
				imageUrl:
					"https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=200",
				category: "meat",
			},
			{
				id: "ing2",
				name: "Garlic Cloves",
				quantity: 4,
				unit: "cloves",
				imageUrl:
					"https://images.unsplash.com/photo-1540148426945-6cf22a6b2f3e?w=200",
				category: "produce",
			},
			{
				id: "ing3",
				name: "Heavy Cream",
				quantity: 1,
				unit: "cup",
				imageUrl:
					"https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200",
				category: "dairy",
			},
			{
				id: "ing4",
				name: "Sun-dried Tomatoes",
				quantity: 0.5,
				unit: "cup",
				imageUrl:
					"https://images.unsplash.com/photo-1558818498-28c1e002674f?w=200",
				category: "pantry",
			},
			{
				id: "ing5",
				name: "Fresh Spinach",
				quantity: 2,
				unit: "cups",
				imageUrl:
					"https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200",
				category: "produce",
			},
			{
				id: "ing6",
				name: "Parmesan Cheese",
				quantity: 0.5,
				unit: "cup",
				imageUrl:
					"https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=200",
				category: "dairy",
			},
			{
				id: "ing7",
				name: "Olive Oil",
				quantity: 2,
				unit: "tbsp",
				imageUrl:
					"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200",
				category: "pantry",
			},
		],
		steps: [
			"Season salmon fillets with salt and pepper on both sides.",
			"Heat olive oil in a large skillet over medium-high heat.",
			"Sear salmon for 4-5 minutes per side until golden. Remove and set aside.",
			"In the same pan, sauté minced garlic for 30 seconds until fragrant.",
			"Add heavy cream and bring to a simmer.",
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
				imageUrl:
					"https://images.unsplash.com/photo-1614961233913-a5113a4a34ed?w=200",
				category: "pantry",
			},
			{
				id: "ing9",
				name: "Almond Milk",
				quantity: 1,
				unit: "cup",
				imageUrl:
					"https://images.unsplash.com/photo-1600788886242-5c96aabe3757?w=200",
				category: "dairy",
			},
			{
				id: "ing10",
				name: "Greek Yogurt",
				quantity: 0.5,
				unit: "cup",
				imageUrl:
					"https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200",
				category: "dairy",
			},
			{
				id: "ing11",
				name: "Mixed Berries",
				quantity: 1,
				unit: "cup",
				imageUrl:
					"https://images.unsplash.com/photo-1425934398893-310a009a77f9?w=200",
				category: "produce",
			},
			{
				id: "ing12",
				name: "Honey",
				quantity: 2,
				unit: "tbsp",
				imageUrl:
					"https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200",
				category: "pantry",
			},
			{
				id: "ing13",
				name: "Chia Seeds",
				quantity: 1,
				unit: "tbsp",
				imageUrl:
					"https://images.unsplash.com/photo-1514733670139-4d87a1941d55?w=200",
				category: "pantry",
			},
		],
		steps: [
			"Combine oats, almond milk, yogurt, and chia seeds in a jar.",
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
		title: "Spicy Korean Fried Chicken",
		description:
			"Crispy double-fried chicken coated in a sweet and spicy gochujang glaze.",
		imageUrl:
			"https://images.unsplash.com/photo-1575932444877-5106bee2a599?w=800&h=1000&fit=crop",
		creatorId: "user3",
		creatorName: "K-Food King",
		creatorAvatar:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
		prepTime: 30,
		cookTime: 25,
		servings: 4,
		calories: 520,
		protein: 38,
		carbs: 35,
		fat: 25,
		ingredients: [
			{
				id: "ing14",
				name: "Chicken Wings",
				quantity: 1,
				unit: "kg",
				imageUrl:
					"https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=200",
				category: "meat",
			},
			{
				id: "ing15",
				name: "Cornstarch",
				quantity: 1,
				unit: "cup",
				imageUrl:
					"https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=200",
				category: "pantry",
			},
			{
				id: "ing16",
				name: "Gochujang Paste",
				quantity: 3,
				unit: "tbsp",
				imageUrl:
					"https://images.unsplash.com/photo-1635870723802-e88d76ae3f56?w=200",
				category: "pantry",
			},
			{
				id: "ing17",
				name: "Soy Sauce",
				quantity: 2,
				unit: "tbsp",
				imageUrl:
					"https://images.unsplash.com/photo-1614563637806-1d0e645e0940?w=200",
				category: "pantry",
			},
			{
				id: "ing18",
				name: "Sesame Oil",
				quantity: 1,
				unit: "tbsp",
				imageUrl:
					"https://images.unsplash.com/photo-1612540139150-4327c2c1f8d3?w=200",
				category: "pantry",
			},
			{
				id: "ing19",
				name: "Garlic Cloves",
				quantity: 3,
				unit: "cloves",
				imageUrl:
					"https://images.unsplash.com/photo-1540148426945-6cf22a6b2f3e?w=200",
				category: "produce",
			},
			{
				id: "ing20",
				name: "Brown Sugar",
				quantity: 2,
				unit: "tbsp",
				imageUrl:
					"https://images.unsplash.com/photo-1558964122-5e56b0d06a5c?w=200",
				category: "pantry",
			},
		],
		steps: [
			"Pat chicken wings dry and season with salt and pepper.",
			"Coat wings in cornstarch, shaking off excess.",
			"Heat oil to 350°F (175°C) and fry wings for 10 minutes.",
			"Remove and let rest for 5 minutes.",
			"Fry again at 375°F (190°C) for 8-10 minutes until extra crispy.",
			"Mix gochujang, soy sauce, sesame oil, garlic, and brown sugar.",
			"Toss hot wings in the sauce.",
			"Garnish with sesame seeds and green onions.",
		],
		likes: 3421,
		shares: 567,
		views: 23456,
		isLiked: false,
		isSaved: false,
		createdAt: new Date("2024-01-13"),
		tags: ["korean", "fried-chicken", "spicy", "dinner"],
	},
	{
		id: "4",
		title: "Mediterranean Quinoa Bowl",
		description:
			"A healthy and colorful bowl packed with quinoa, chickpeas, and fresh vegetables.",
		imageUrl:
			"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=1000&fit=crop",
		creatorId: "user4",
		creatorName: "Vegan Vibes",
		creatorAvatar:
			"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop",
		prepTime: 15,
		cookTime: 20,
		servings: 2,
		calories: 420,
		protein: 15,
		carbs: 58,
		fat: 16,
		ingredients: [
			{
				id: "ing21",
				name: "Quinoa",
				quantity: 1,
				unit: "cup",
				imageUrl:
					"https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200",
				category: "pantry",
			},
			{
				id: "ing22",
				name: "Chickpeas",
				quantity: 1,
				unit: "can",
				imageUrl:
					"https://images.unsplash.com/photo-1515543904323-f1a0a8ec018e?w=200",
				category: "pantry",
			},
			{
				id: "ing23",
				name: "Cherry Tomatoes",
				quantity: 1,
				unit: "cup",
				imageUrl:
					"https://images.unsplash.com/photo-1546470427-0d4db154ceb8?w=200",
				category: "produce",
			},
			{
				id: "ing24",
				name: "Cucumber",
				quantity: 1,
				unit: "medium",
				imageUrl:
					"https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=200",
				category: "produce",
			},
			{
				id: "ing25",
				name: "Feta Cheese",
				quantity: 0.5,
				unit: "cup",
				imageUrl:
					"https://images.unsplash.com/photo-1505575967455-40e256f73376?w=200",
				category: "dairy",
			},
			{
				id: "ing26",
				name: "Kalamata Olives",
				quantity: 0.25,
				unit: "cup",
				imageUrl:
					"https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?w=200",
				category: "pantry",
			},
			{
				id: "ing27",
				name: "Lemon",
				quantity: 1,
				unit: "whole",
				imageUrl:
					"https://images.unsplash.com/photo-1582087463261-ddea03f80e5d?w=200",
				category: "produce",
			},
		],
		steps: [
			"Cook quinoa according to package instructions and let cool.",
			"Drain and rinse chickpeas.",
			"Halve cherry tomatoes and dice cucumber.",
			"Make dressing with lemon juice, olive oil, and oregano.",
			"Combine quinoa, chickpeas, vegetables in a bowl.",
			"Top with feta cheese and olives.",
			"Drizzle with dressing and serve.",
		],
		likes: 1654,
		shares: 198,
		views: 9876,
		isLiked: false,
		isSaved: false,
		createdAt: new Date("2024-01-12"),
		tags: ["mediterranean", "vegan-option", "healthy", "lunch"],
	},
	{
		id: "5",
		title: "Classic Beef Tacos",
		description:
			"Authentic Mexican-style tacos with seasoned ground beef and all the toppings.",
		imageUrl:
			"https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&h=1000&fit=crop",
		creatorId: "user5",
		creatorName: "Taco Tuesday",
		creatorAvatar:
			"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
		prepTime: 15,
		cookTime: 15,
		servings: 4,
		calories: 380,
		protein: 24,
		carbs: 28,
		fat: 20,
		ingredients: [
			{
				id: "ing28",
				name: "Ground Beef",
				quantity: 500,
				unit: "g",
				imageUrl:
					"https://images.unsplash.com/photo-1602470521006-aaea8b2dcc31?w=200",
				category: "meat",
			},
			{
				id: "ing29",
				name: "Taco Shells",
				quantity: 8,
				unit: "pieces",
				imageUrl:
					"https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=200",
				category: "bakery",
			},
			{
				id: "ing30",
				name: "Shredded Lettuce",
				quantity: 2,
				unit: "cups",
				imageUrl:
					"https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=200",
				category: "produce",
			},
			{
				id: "ing31",
				name: "Cheddar Cheese",
				quantity: 1,
				unit: "cup",
				imageUrl:
					"https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=200",
				category: "dairy",
			},
			{
				id: "ing32",
				name: "Sour Cream",
				quantity: 0.5,
				unit: "cup",
				imageUrl:
					"https://images.unsplash.com/photo-1626957341926-98752fc2ba90?w=200",
				category: "dairy",
			},
			{
				id: "ing33",
				name: "Salsa",
				quantity: 1,
				unit: "cup",
				imageUrl:
					"https://images.unsplash.com/photo-1560769680-ba2f3767c785?w=200",
				category: "pantry",
			},
			{
				id: "ing34",
				name: "Taco Seasoning",
				quantity: 2,
				unit: "tbsp",
				imageUrl:
					"https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200",
				category: "spices",
			},
		],
		steps: [
			"Brown ground beef in a skillet over medium-high heat.",
			"Drain excess fat and add taco seasoning with water.",
			"Simmer for 5 minutes until sauce thickens.",
			"Warm taco shells according to package directions.",
			"Fill shells with seasoned beef.",
			"Top with lettuce, cheese, sour cream, and salsa.",
			"Serve immediately with lime wedges.",
		],
		likes: 2876,
		shares: 423,
		views: 18765,
		isLiked: false,
		isSaved: false,
		createdAt: new Date("2024-01-11"),
		tags: ["mexican", "tacos", "quick", "dinner"],
	},
	{
		id: "6",
		title: "Avocado Toast Supreme",
		description:
			"Elevated avocado toast with poached eggs and everything bagel seasoning.",
		imageUrl:
			"https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&h=1000&fit=crop",
		creatorId: "user6",
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
				id: "ing35",
				name: "Sourdough Bread",
				quantity: 2,
				unit: "slices",
				imageUrl:
					"https://images.unsplash.com/photo-1585478259715-876acc5be8fc?w=200",
				category: "bakery",
			},
			{
				id: "ing36",
				name: "Avocado",
				quantity: 1,
				unit: "large",
				imageUrl:
					"https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=200",
				category: "produce",
			},
			{
				id: "ing37",
				name: "Eggs",
				quantity: 2,
				unit: "large",
				imageUrl:
					"https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200",
				category: "dairy",
			},
			{
				id: "ing38",
				name: "Cherry Tomatoes",
				quantity: 0.5,
				unit: "cup",
				imageUrl:
					"https://images.unsplash.com/photo-1546470427-0d4db154ceb8?w=200",
				category: "produce",
			},
			{
				id: "ing39",
				name: "Everything Bagel Seasoning",
				quantity: 1,
				unit: "tbsp",
				imageUrl:
					"https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200",
				category: "spices",
			},
			{
				id: "ing40",
				name: "Red Pepper Flakes",
				quantity: 0.5,
				unit: "tsp",
				imageUrl:
					"https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200",
				category: "spices",
			},
		],
		steps: [
			"Toast sourdough slices until golden.",
			"Mash avocado with salt, pepper, and lime juice.",
			"Poach eggs in simmering water for 3-4 minutes.",
			"Spread mashed avocado on toast.",
			"Top with poached eggs and halved tomatoes.",
			"Sprinkle with everything seasoning and red pepper flakes.",
			"Serve immediately.",
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
		id: "7",
		title: "Creamy Mushroom Risotto",
		description:
			"Rich and creamy Italian risotto loaded with mixed mushrooms and parmesan.",
		imageUrl:
			"https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&h=1000&fit=crop",
		creatorId: "user7",
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
				id: "ing41",
				name: "Arborio Rice",
				quantity: 1.5,
				unit: "cups",
				imageUrl:
					"https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200",
				category: "pantry",
			},
			{
				id: "ing42",
				name: "Mixed Mushrooms",
				quantity: 300,
				unit: "g",
				imageUrl:
					"https://images.unsplash.com/photo-1552825896-93d1520f03f2?w=200",
				category: "produce",
			},
			{
				id: "ing43",
				name: "Vegetable Stock",
				quantity: 4,
				unit: "cups",
				imageUrl:
					"https://images.unsplash.com/photo-1547592166-23ac45744acd?w=200",
				category: "pantry",
			},
			{
				id: "ing44",
				name: "White Wine",
				quantity: 0.5,
				unit: "cup",
				imageUrl:
					"https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=200",
				category: "beverages",
			},
			{
				id: "ing45",
				name: "Parmesan Cheese",
				quantity: 0.75,
				unit: "cup",
				imageUrl:
					"https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=200",
				category: "dairy",
			},
			{
				id: "ing46",
				name: "Butter",
				quantity: 3,
				unit: "tbsp",
				imageUrl:
					"https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=200",
				category: "dairy",
			},
			{
				id: "ing47",
				name: "Fresh Thyme",
				quantity: 2,
				unit: "sprigs",
				imageUrl:
					"https://images.unsplash.com/photo-1592865215198-63bf83e0af95?w=200",
				category: "produce",
			},
		],
		steps: [
			"Heat stock in a saucepan and keep warm.",
			"Sauté mushrooms in butter until golden, set aside.",
			"Toast rice in butter for 2 minutes.",
			"Add wine and stir until absorbed.",
			"Add stock one ladle at a time, stirring constantly.",
			"Continue until rice is creamy and al dente (20-25 min).",
			"Stir in mushrooms, parmesan, and fresh thyme.",
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
		id: "8",
		title: "Thai Green Curry",
		description:
			"Authentic Thai green curry with chicken, vegetables, and coconut milk.",
		imageUrl:
			"https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&h=1000&fit=crop",
		creatorId: "user8",
		creatorName: "Thai Taste",
		creatorAvatar:
			"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
		prepTime: 15,
		cookTime: 20,
		servings: 4,
		calories: 420,
		protein: 32,
		carbs: 18,
		fat: 28,
		ingredients: [
			{
				id: "ing48",
				name: "Chicken Breast",
				quantity: 500,
				unit: "g",
				imageUrl:
					"https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200",
				category: "meat",
			},
			{
				id: "ing49",
				name: "Green Curry Paste",
				quantity: 3,
				unit: "tbsp",
				imageUrl:
					"https://images.unsplash.com/photo-1635870723802-e88d76ae3f56?w=200",
				category: "pantry",
			},
			{
				id: "ing50",
				name: "Coconut Milk",
				quantity: 400,
				unit: "ml",
				imageUrl:
					"https://images.unsplash.com/photo-1594134773144-8c4c8a2a6bbf?w=200",
				category: "pantry",
			},
			{
				id: "ing51",
				name: "Thai Basil",
				quantity: 1,
				unit: "cup",
				imageUrl:
					"https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=200",
				category: "produce",
			},
			{
				id: "ing52",
				name: "Bamboo Shoots",
				quantity: 1,
				unit: "cup",
				imageUrl:
					"https://images.unsplash.com/photo-1585515320310-259814833e62?w=200",
				category: "pantry",
			},
			{
				id: "ing53",
				name: "Fish Sauce",
				quantity: 2,
				unit: "tbsp",
				imageUrl:
					"https://images.unsplash.com/photo-1614961233913-a5113a4a34ed?w=200",
				category: "pantry",
			},
			{
				id: "ing54",
				name: "Palm Sugar",
				quantity: 1,
				unit: "tbsp",
				imageUrl:
					"https://images.unsplash.com/photo-1558964122-5e56b0d06a5c?w=200",
				category: "pantry",
			},
		],
		steps: [
			"Slice chicken into bite-sized pieces.",
			"Heat a wok and add thick coconut cream.",
			"Fry curry paste until fragrant.",
			"Add chicken and cook until white.",
			"Pour in remaining coconut milk.",
			"Add bamboo shoots and simmer for 10 minutes.",
			"Season with fish sauce and palm sugar.",
			"Garnish with Thai basil and serve with rice.",
		],
		likes: 2654,
		shares: 398,
		views: 19876,
		isLiked: false,
		isSaved: false,
		createdAt: new Date("2024-01-08"),
		tags: ["thai", "curry", "chicken", "dinner"],
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

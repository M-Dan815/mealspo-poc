import {MealSlot, DayOfWeek, MealType, WeekPlan} from "../types";

const days: DayOfWeek[] = [
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday",
	"saturday",
	"sunday",
];
const mealTypes: MealType[] = ["breakfast", "lunch", "dinner"];

export const generateEmptyWeekPlan = (
	startDate: Date = new Date()
): WeekPlan => {
	const meals: MealSlot[] = [];

	days.forEach((day) => {
		mealTypes.forEach((mealType) => {
			meals.push({
				id: `${day}-${mealType}`,
				day,
				mealType,
				recipe: null,
			});
		});
	});

	return {
		weekStartDate: startDate,
		meals,
	};
};

export const getDayLabel = (day: DayOfWeek): string => {
	const labels: Record<DayOfWeek, string> = {
		monday: "Mon",
		tuesday: "Tue",
		wednesday: "Wed",
		thursday: "Thu",
		friday: "Fri",
		saturday: "Sat",
		sunday: "Sun",
	};
	return labels[day];
};

export const getDayFullLabel = (day: DayOfWeek): string => {
	const labels: Record<DayOfWeek, string> = {
		monday: "Monday",
		tuesday: "Tuesday",
		wednesday: "Wednesday",
		thursday: "Thursday",
		friday: "Friday",
		saturday: "Saturday",
		sunday: "Sunday",
	};
	return labels[day];
};

export const getMealTypeLabel = (type: MealType): string => {
	const labels: Record<MealType, string> = {
		breakfast: "Breakfast",
		lunch: "Lunch",
		dinner: "Dinner",
	};
	return labels[type];
};

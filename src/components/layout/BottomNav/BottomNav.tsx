import React from "react";
import {Home, Search, Plus, Calendar, User, ShoppingCart} from "lucide-react";
import {useApp} from "../../../context/AppContext";
import {useAnalytics} from "../../../context/AnalyticsContext";
import {NavigationTab} from "../../../types";
import styles from "./BottomNav.module.css";

interface NavItem {
	id: NavigationTab;
	icon: React.ReactNode;
	activeIcon: React.ReactNode;
	label: string;
	isSpecial?: boolean;
}

export const BottomNav: React.FC = () => {
	const {state, dispatch, triggerPopup} = useApp();
	const {trackButtonClick} = useAnalytics();
	const {activeTab, shoppingList} = state;

	const navItems: NavItem[] = [
		{
			id: "feed",
			icon: <Home size={24} strokeWidth={1.5} />,
			activeIcon: <Home size={24} strokeWidth={2.5} />,
			label: "Home",
		},
		{
			id: "explore",
			icon: <Search size={24} strokeWidth={1.5} />,
			activeIcon: <Search size={24} strokeWidth={2.5} />,
			label: "Explore",
		},
		{
			id: "upload",
			icon: <Plus size={28} strokeWidth={2} />,
			activeIcon: <Plus size={28} strokeWidth={2} />,
			label: "Create",
			isSpecial: true,
		},
		{
			id: "planner",
			icon: <Calendar size={24} strokeWidth={1.5} />,
			activeIcon: <Calendar size={24} strokeWidth={2.5} />,
			label: "Plan",
		},
		{
			id: "profile",
			icon: <User size={24} strokeWidth={1.5} />,
			activeIcon: <User size={24} strokeWidth={2.5} />,
			label: "Profile",
		},
	];

	const handleNavClick = (item: NavItem) => {
		trackButtonClick(`nav_${item.id}`, "bottom_nav");

		if (item.id === "upload") {
			triggerPopup("upload");
			return;
		}

		dispatch({type: "SET_ACTIVE_TAB", tab: item.id});
	};

	const cartItemsCount = shoppingList.filter((item) => !item.isOwned).length;

	return (
		<nav className={styles.bottomNav}>
			<div className={styles.container}>
				{navItems.map((item) => {
					const isActive = activeTab === item.id;

					if (item.isSpecial) {
						return (
							<button
								key={item.id}
								className={styles.specialButton}
								onClick={() => handleNavClick(item)}
								aria-label={item.label}
							>
								<div className={styles.specialButtonInner}>{item.icon}</div>
							</button>
						);
					}

					return (
						<button
							key={item.id}
							className={`${styles.navItem} ${isActive ? styles.active : ""}`}
							onClick={() => handleNavClick(item)}
							aria-label={item.label}
						>
							<div className={styles.iconWrapper}>
								{isActive ? item.activeIcon : item.icon}
								{item.id === "planner" && cartItemsCount > 0 && (
									<span className={styles.badge}>
										{cartItemsCount > 9 ? "9+" : cartItemsCount}
									</span>
								)}
							</div>
							<span className={styles.label}>{item.label}</span>
						</button>
					);
				})}
			</div>
		</nav>
	);
};

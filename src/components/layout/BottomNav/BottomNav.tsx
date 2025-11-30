import React from "react";
import {Home, Search, Plus, Calendar, ShoppingCart, User} from "lucide-react";
import {useApp} from "../../../context/AppContext";
import {useAnalytics} from "../../../context/AnalyticsContext";
import {NavigationTab} from "../../../types";
import "./BottomNav.css";

interface NavItem {
	id: NavigationTab | "basket";
	icon: React.ReactNode;
	activeIcon: React.ReactNode;
	label: string;
	isSpecial?: boolean;
	screen?: string;
}

export const BottomNav: React.FC = () => {
	const {state, dispatch, navigate} = useApp();
	const {trackButtonClick} = useAnalytics();
	const {activeTab, shoppingList, emailCaptured, currentScreen} = state;

	// Count items not yet owned
	const cartItemCount = shoppingList.filter((item) => !item.isOwned).length;

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
			id: "basket",
			icon: <ShoppingCart size={24} strokeWidth={1.5} />,
			activeIcon: <ShoppingCart size={24} strokeWidth={2.5} />,
			label: "Cart",
			screen: "basket",
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
			if (!emailCaptured) {
				dispatch({type: "SHOW_POPUP", trigger: "upload"});
			} else {
				navigate("upload");
			}
			return;
		}

		if (item.id === "basket") {
			navigate("basket");
			return;
		}

		dispatch({type: "SET_ACTIVE_TAB", tab: item.id as NavigationTab});
	};

	const isActive = (itemId: string) => {
		if (itemId === "basket") return currentScreen === "basket";
		return activeTab === itemId;
	};

	return (
		<nav className="bottom-nav">
			<div className="nav-container">
				{navItems.map((item) => {
					const active = isActive(item.id);

					if (item.isSpecial) {
						return (
							<button
								key={item.id}
								className="nav-special-btn"
								onClick={() => handleNavClick(item)}
								aria-label={item.label}
							>
								<div className="nav-special-inner">{item.icon}</div>
							</button>
						);
					}

					return (
						<button
							key={item.id}
							className={`nav-item ${active ? "active" : ""}`}
							onClick={() => handleNavClick(item)}
							aria-label={item.label}
						>
							<div className="nav-icon-wrapper">
								{active ? item.activeIcon : item.icon}
								{item.id === "basket" && cartItemCount > 0 && (
									<span className="nav-badge">
										{cartItemCount > 9 ? "9+" : cartItemCount}
									</span>
								)}
							</div>
							<span className="nav-label">{item.label}</span>
						</button>
					);
				})}
			</div>
		</nav>
	);
};

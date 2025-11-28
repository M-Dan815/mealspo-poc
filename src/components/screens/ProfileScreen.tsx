import React from "react";
import {Settings, Grid, Bookmark, Heart, Eye} from "lucide-react";
import {Header} from "../layout/Header";
import {PageWrapper} from "../layout/PageWrapper";
import {Avatar} from "../common/Avatar";
import {Button} from "../common/Button";
import {RecipeGrid} from "../recipe/RecipeGrid";
import {useApp} from "../../context/AppContext";
import {useAnalytics} from "../../context/AnalyticsContext";
import {getCurrentUser} from "../../data/mockUsers";
import styles from "./ProfileScreen.module.css";

export const ProfileScreen: React.FC = () => {
	const {navigate, triggerPopup} = useApp();
	const {trackButtonClick} = useAnalytics();
	const user = getCurrentUser();

	const handleEditProfile = () => {
		trackButtonClick("edit_profile", "profile");
		triggerPopup("create_profile");
	};

	const handleRecipeClick = (recipe: any) => {
		navigate("recipe", recipe.id);
	};

	const formatNumber = (num: number): string => {
		if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
		if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
		return num.toString();
	};

	const totalLikes = user.recipes.reduce((sum, r) => sum + r.likes, 0);
	const totalViews = user.recipes.reduce((sum, r) => sum + r.views, 0);

	return (
		<>
			<Header
				variant="profile"
				title={user.username}
				showSettings
				onSettings={() => trackButtonClick("settings", "profile")}
			/>
			<PageWrapper pageName="profile">
				<div className={styles.container}>
					{/* Profile Header */}
					<div className={styles.profileHeader}>
						<Avatar
							src={user.avatar}
							alt={user.displayName}
							size="xlarge"
							showBorder
						/>

						<h1 className={styles.displayName}>{user.displayName}</h1>
						<p className={styles.username}>@{user.username}</p>

						{user.bio && <p className={styles.bio}>{user.bio}</p>}

						{/* Stats */}
						<div className={styles.stats}>
							<div className={styles.statItem}>
								<span className={styles.statValue}>{user.recipesCount}</span>
								<span className={styles.statLabel}>Recipes</span>
							</div>
							<div className={styles.statDivider} />
							<div className={styles.statItem}>
								<span className={styles.statValue}>
									{formatNumber(user.followers)}
								</span>
								<span className={styles.statLabel}>Followers</span>
							</div>
							<div className={styles.statDivider} />
							<div className={styles.statItem}>
								<span className={styles.statValue}>
									{formatNumber(user.following)}
								</span>
								<span className={styles.statLabel}>Following</span>
							</div>
						</div>

						<Button variant="outline" size="medium" onClick={handleEditProfile}>
							Edit Profile
						</Button>
					</div>

					{/* Engagement Summary */}
					<div className={styles.engagementSection}>
						<h3 className={styles.sectionTitle}>Your Engagement</h3>
						<div className={styles.engagementGrid}>
							<div className={styles.engagementCard}>
								<div className={styles.engagementIcon}>
									<Heart size={20} />
								</div>
								<div className={styles.engagementInfo}>
									<span className={styles.engagementValue}>
										{formatNumber(totalLikes)}
									</span>
									<span className={styles.engagementLabel}>Total Likes</span>
								</div>
							</div>
							<div className={styles.engagementCard}>
								<div className={styles.engagementIcon}>
									<Eye size={20} />
								</div>
								<div className={styles.engagementInfo}>
									<span className={styles.engagementValue}>
										{formatNumber(totalViews)}
									</span>
									<span className={styles.engagementLabel}>Total Views</span>
								</div>
							</div>
						</div>
					</div>

					{/* Tabs */}
					<div className={styles.tabs}>
						<button className={`${styles.tab} ${styles.active}`}>
							<Grid size={20} />
							<span>Recipes</span>
						</button>
						<button className={styles.tab}>
							<Bookmark size={20} />
							<span>Saved</span>
						</button>
					</div>

					{/* Recipes Grid */}
					<div className={styles.recipesSection}>
						<RecipeGrid
							recipes={user.recipes}
							columns={3}
							gap="small"
							onRecipeClick={handleRecipeClick}
						/>
					</div>
				</div>
			</PageWrapper>
		</>
	);
};

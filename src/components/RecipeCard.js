// src/components/RecipeCard.js
import React from "react";
import {Link} from "react-router-dom";

const RecipeCard = ({recipe}) => {
	return (
		<Link to={`/recipe/${recipe.id}`} className="recipe-card-link">
			<div className="recipe-card">
				<img src={recipe.imageUrl} alt={recipe.title} />
				<div className="recipe-card-info">
					<h3>{recipe.title}</h3>
					<p>by {recipe.creator}</p>
					<span className="likes">❤️ {recipe.likes}</span>
				</div>
			</div>
		</Link>
	);
};

export default RecipeCard;

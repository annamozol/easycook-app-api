import React from 'react';
import { Link } from 'react-router-dom';
import './Recipe.css';

function Recipe({ recipe }) {
    return (
        <Link className="recipe-card" to={`/recipe/${recipe.id}`}>
            <div className="recipe-card__photo">
                {recipe.image ? (
                    <img src={recipe.image} alt={recipe.title} />
                ) : (
                    <span className="recipe-card__photo-tag">photo · {recipe.title}</span>
                )}
            </div>
            <div className="recipe-card__meta">
                <div className="recipe-card__title">{recipe.title}</div>
                <div className="recipe-card__time">{recipe.time_minutes} min</div>
            </div>
        </Link>
    )
}

export default Recipe;

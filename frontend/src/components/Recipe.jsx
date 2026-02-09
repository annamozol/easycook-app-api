import React from 'react';
import { Link } from 'react-router-dom';
import './recipeimage.css';

function Recipe({ recipe }) {
    return (
        <div className="my-3 p-3">
            <Link to={`/recipe/${recipe.id}`}>
                <img className="recipe-card-image" src={recipe.image} alt={recipe.title} />
            </Link>

            <div className="mt-2">
                <a href={`/recipe/${recipe.id}`}>
                    <strong>{recipe.title}</strong>
                </a>
            </div>
        </div>
    )
}

export default Recipe;

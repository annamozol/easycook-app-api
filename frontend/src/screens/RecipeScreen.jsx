import React from "react";
import { Link, useParams } from "react-router-dom";
import { useRecipes } from "../context/RecipesContext";
import "./RecipeScreen.css";

function formatIngredient(ingredient) {
    if (typeof ingredient === 'string') return ingredient;
    if (!ingredient.quantity) return ingredient.name;
    return `${ingredient.quantity}${ingredient.measurement ? ' ' + ingredient.measurement : ''} ${ingredient.name}`;
}

function RecipeScreen() {
    const { id } = useParams();
    const { recipes } = useRecipes();
    const recipe = recipes.find((r) => String(r.id) === id);

    if (!recipe) {
        return <div className="recipe-detail__not-found"><h3>Recipe not found</h3></div>;
    }

    return (
        <div className="recipe-detail">
            <div className="recipe-detail__breadcrumb">
                Recipes / {recipe.category}
            </div>

            <div className="recipe-detail__layout">
                <div className="recipe-detail__main">
                    <div className="recipe-detail__tag">{recipe.category} · {recipe.cuisine}</div>
                    <h1 className="recipe-detail__title">{recipe.title}</h1>
                    <p className="recipe-detail__blurb">{recipe.blurb}</p>

                    <div className="recipe-detail__stats">
                        <div className="recipe-detail__stat">
                            <div className="recipe-detail__stat-label">Time</div>
                            <div className="recipe-detail__stat-value">{recipe.time_minutes} min</div>
                        </div>
                        <div className="recipe-detail__stat">
                            <div className="recipe-detail__stat-label">Serves</div>
                            <div className="recipe-detail__stat-value">{recipe.servings}</div>
                        </div>
                        <div className="recipe-detail__stat">
                            <div className="recipe-detail__stat-label">Cost</div>
                            <div className="recipe-detail__stat-value">${recipe.price}</div>
                        </div>
                    </div>

                    <div className="recipe-detail__method">
                        <div className="recipe-detail__section-label">Method</div>
                        <ol className="recipe-detail__steps">
                            {recipe.steps.map((step, index) => (
                                <li key={index}>
                                    <span className="recipe-detail__step-index">0{index + 1}</span>
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>

                <div className="recipe-detail__side">
                    <div className="recipe-detail__photo">
                        {recipe.image ? (
                            <img src={recipe.image} alt={recipe.title} />
                        ) : (
                            <span className="recipe-detail__photo-tag">photo · {recipe.title}</span>
                        )}
                    </div>
                    <div className="recipe-detail__ingredients">
                        <div className="recipe-detail__section-label">Ingredients</div>
                        <ul>
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={ingredient.id ?? index}>{formatIngredient(ingredient)}</li>
                            ))}
                        </ul>
                        <Link to="/menus" className="recipe-detail__add-to-menu">Add to menu</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipeScreen;

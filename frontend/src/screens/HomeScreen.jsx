import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Recipe from '../components/Recipe';
import { useRecipes } from '../context/RecipesContext';
import './HomeScreen.css';

function HomeScreen() {
    const [searchParams] = useSearchParams();
    const { recipes } = useRecipes();
    const query = (searchParams.get('q') || '').trim().toLowerCase();

    const visibleRecipes = query
        ? recipes.filter((r) => r.title.toLowerCase().includes(query))
        : recipes;

    return (
        <div className="home">
            <div className="home__hero">
                <div className="home__hero-text">
                    <div className="home__eyebrow">Latest recipes</div>
                    <h1 className="home__title">What are we making today?</h1>
                </div>
                <Link to="/recipes/new" className="home__new-recipe">+ New recipe</Link>
            </div>

            {query && (
                <div className="home__query-note">
                    {visibleRecipes.length} result{visibleRecipes.length === 1 ? '' : 's'} for &ldquo;{searchParams.get('q')}&rdquo;
                </div>
            )}

            <div className="home__grid">
                {visibleRecipes.map((recipe) => (
                    <Recipe key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </div>
    )
}

export default HomeScreen;

import React, { createContext, useContext, useState } from 'react';
import initialRecipes from '../recipesfortest';

const RecipesContext = createContext(null);

export function RecipesProvider({ children }) {
    const [recipes, setRecipes] = useState(initialRecipes);

    const addRecipe = (recipe) => {
        const nextId = recipes.reduce((max, r) => Math.max(max, r.id), 0) + 1;
        const newRecipe = { ...recipe, id: nextId };
        setRecipes((prev) => [...prev, newRecipe]);
        return newRecipe;
    };

    return (
        <RecipesContext.Provider value={{ recipes, addRecipe }}>
            {children}
        </RecipesContext.Provider>
    );
}

export function useRecipes() {
    return useContext(RecipesContext);
}

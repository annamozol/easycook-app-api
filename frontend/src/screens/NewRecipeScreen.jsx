import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecipes } from '../context/RecipesContext';
import './NewRecipeScreen.css';

function linesToList(text) {
    return text.split('\n').map((line) => line.trim()).filter(Boolean);
}

function NewRecipeScreen() {
    const navigate = useNavigate();
    const { addRecipe } = useRecipes();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [timeMinutes, setTimeMinutes] = useState('');
    const [servings, setServings] = useState('');
    const [price, setPrice] = useState('');
    const [blurb, setBlurb] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [steps, setSteps] = useState('');
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setImage(reader.result);
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRecipe = addRecipe({
            title: title.trim(),
            category: category.trim(),
            cuisine: cuisine.trim(),
            time_minutes: Number(timeMinutes) || 0,
            servings: Number(servings) || 1,
            price: price.trim(),
            image,
            blurb: blurb.trim(),
            ingredients: linesToList(ingredients),
            steps: linesToList(steps),
        });
        navigate(`/recipe/${newRecipe.id}`);
    };

    return (
        <div className="new-recipe">
            <div className="new-recipe__breadcrumb">
                <Link to="/">Recipes</Link> / New recipe
            </div>

            <h1 className="new-recipe__title">New recipe</h1>

            <form className="new-recipe__form" onSubmit={handleSubmit}>
                <div className="new-recipe__row">
                    <label className="new-recipe__field">
                        <span>Title</span>
                        <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Spaghetti Bolognese" />
                    </label>
                </div>

                <div className="new-recipe__field">
                    <span>Photo</span>
                    <label className="new-recipe__photo">
                        <input type="file" accept="image/*" onChange={handleImageChange} hidden />
                        {image ? (
                            <>
                                <img src={image} alt="Recipe preview" />
                                <button
                                    type="button"
                                    className="new-recipe__photo-remove"
                                    onClick={(e) => { e.preventDefault(); setImage(null); }}
                                >
                                    Remove
                                </button>
                            </>
                        ) : (
                            <span className="new-recipe__photo-tag">+ Add a photo</span>
                        )}
                    </label>
                </div>

                <div className="new-recipe__row new-recipe__row--three">
                    <label className="new-recipe__field">
                        <span>Category</span>
                        <input required value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Dinner" />
                    </label>
                    <label className="new-recipe__field">
                        <span>Cuisine</span>
                        <input required value={cuisine} onChange={(e) => setCuisine(e.target.value)} placeholder="Italian" />
                    </label>
                    <label className="new-recipe__field">
                        <span>Cost</span>
                        <input required value={price} onChange={(e) => setPrice(e.target.value)} placeholder="20" />
                    </label>
                </div>

                <div className="new-recipe__row new-recipe__row--three">
                    <label className="new-recipe__field">
                        <span>Time (min)</span>
                        <input required type="number" min="1" value={timeMinutes} onChange={(e) => setTimeMinutes(e.target.value)} placeholder="40" />
                    </label>
                    <label className="new-recipe__field">
                        <span>Serves</span>
                        <input required type="number" min="1" value={servings} onChange={(e) => setServings(e.target.value)} placeholder="4" />
                    </label>
                </div>

                <label className="new-recipe__field">
                    <span>Blurb</span>
                    <textarea rows="2" required value={blurb} onChange={(e) => setBlurb(e.target.value)} placeholder="A short description of the dish." />
                </label>

                <label className="new-recipe__field">
                    <span>Ingredients (one per line)</span>
                    <textarea rows="6" required value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder={'180 g spaghetti\n400 g ground beef'} />
                </label>

                <label className="new-recipe__field">
                    <span>Method (one step per line)</span>
                    <textarea rows="6" required value={steps} onChange={(e) => setSteps(e.target.value)} placeholder={'Brown the beef in a wide pan.\nAdd onion and garlic.'} />
                </label>

                <div className="new-recipe__actions">
                    <Link to="/" className="new-recipe__cancel">Cancel</Link>
                    <button type="submit" className="new-recipe__submit">Save recipe</button>
                </div>
            </form>
        </div>
    )
}

export default NewRecipeScreen;

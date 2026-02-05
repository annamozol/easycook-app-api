import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Recipe({ recipe }) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/recipe/${recipe.id}`}>
                <Card.Img src={recipe.image} />
            </Link>

            <Card.Body>
                <a href={`/recipe/${recipe.id}`}>
                    <Card.Title as="div">
                        <strong>{recipe.title}</strong>
                    </Card.Title>
                </a>
            </Card.Body>
        </Card>
    )
}

export default Recipe;

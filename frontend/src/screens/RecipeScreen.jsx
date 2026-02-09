import React from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button } from "react-bootstrap";
import recipes from "../recipesfortest";
import "./recipescreen.css";

function RecipeScreen() {
    const { id } = useParams();
    const recipe = recipes.find((r) => String(r.id) === id);

    if (!recipe) {
        return <div className="mt-5"><h3>Recipe not found</h3></div>;
    }

    return (
        <div>
            <div className="text-center mb-4">
                <h2>{recipe.title}</h2>
            </div>

            <Row>
                <Col md={6}>
                    <Image className="recipe-image" src={recipe.image} alt={recipe.title} fluid/>
                </Col>

                <Col md={4}>
                    <ListGroup variant="flush">

                        <ListGroup.Item>
                            <strong>Ingredients:</strong>
                            <ul>
                                {recipe.ingredients.map((ingredient) => (
                                    <li key={ingredient.id}>
                                        {ingredient.name} - {ingredient.quantity} {ingredient.measurement}
                                    </li>
                                ))}
                            </ul>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={10}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <strong>Recipe:</strong>
                            <div className="mt-2">{recipe.description}</div>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button className="btn-block" type="button">Add to Menu</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>


        </div>
    )
}

export default RecipeScreen;

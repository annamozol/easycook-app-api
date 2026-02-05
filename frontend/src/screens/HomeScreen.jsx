import React from 'react';
import { Row, Col }from 'react-bootstrap';
import Recipe from '../components/Recipe';

import recipes from '../recipesfortest';

function HomeScreen() {
    return (
        <div>
            <h1>Latest Recipes</h1>
            <Row>
                {recipes.map(recipe => (
                    <Col key={recipe.id} sm={12} md={6} lg={4} xl={3}>
                        <Recipe recipe={recipe} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomeScreen;

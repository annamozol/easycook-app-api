import React from 'react';
import { Navbar, Nav, Container, Row } from 'react-bootstrap';

function Header() {
    return (
        <header>
            <Navbar expand="lg" className="bg-body-tertiary" collapseOnSelect>
                <Container>
                    <Navbar.Brand href="/">Easy Cook</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/recipes">Recipes</Nav.Link>
                        <Nav.Link href="/collections">Collections</Nav.Link>
                        <Nav.Link href="/menus">Menus</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;

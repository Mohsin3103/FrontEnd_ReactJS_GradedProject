import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';

const NavigationMenu = () =>{
    
    const [searchText, setSearchText] = useState("");

    function inputHandler(event: { target: { value: string; }; }) {
        var lowerCase = event.target.value.toLowerCase();
        setSearchText(lowerCase);
    };

    return(
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/" to="/home" as= { NavLink } >
                    <FontAwesomeIcon 
                        icon = {faFilm}
                        className = "me-2"
                    />
                    Movies
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/home" to="/movies-in-theaters" as= { NavLink } >Movies in Theatre</Nav.Link>
                    <Nav.Link href="/comingsoon" to="/movies-coming" as= { NavLink } >Coming soon</Nav.Link>
                    <Nav.Link href="/topratedindian" to="/top-rated-india" as= { NavLink } >Top Rated Indian</Nav.Link>
                    <Nav.Link href="/topratedmovies" to="/top-rated-movies" as= { NavLink } >Top Rated Movies</Nav.Link>
                    <Nav.Link href="/favourite" to="/favourite" as= { NavLink }>Favourites</Nav.Link>
                </Nav>
                <Form className="d-flex">
                    <FormControl
                    onChange={inputHandler}
                    type="text"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    />
                </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationMenu;
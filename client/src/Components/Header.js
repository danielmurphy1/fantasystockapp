import React from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { useContext } from 'react';
import AuthContext from '../store/auth-context';

function Header() {
    const authCtx = useContext(AuthContext);

    const isLoggedIn = authCtx.isLoggedIn;

    function logoutHandler(){
        authCtx.logout();
    }

    return(
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" sticky="top">
            <Navbar.Brand href="#home"></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav>
                    <Nav.Link href="/">Home</Nav.Link>
                    {isLoggedIn && (<Nav.Link href="/trade">Trade</Nav.Link>)}
                    {isLoggedIn && (<Nav.Link href="/portfolio">Portfolio</Nav.Link>)}
                    {isLoggedIn && (<Button onClick={logoutHandler}>Logout</Button>)}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;
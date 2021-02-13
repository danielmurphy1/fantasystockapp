import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Container, Form, Button } from 'react-bootstrap';

function Home() {
    return (
        <Container>
            <Container className="App welcome-container">
                <h1>Welcome to NAME OF APP HERE</h1>
                <p>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum."
                </p>
            </Container>
            <Container className="form-container">
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                    <p className="form-paragraph ml-5">Not registered yet? Register <a href="">Here</a></p>
                </Form>
            </Container>
        </Container>
    );
}

export default Home;
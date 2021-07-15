import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function LogInForm(props) {
    return(
        <Container className="form-container">
            <Form onSubmit={props.handleLogin}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="text"  ref={props.userNameInputRef} placeholder="Enter Username" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password"  ref={props.passwordInputRef} placeholder="Password" />
                </Form.Group>
                <Button variant="dark" type="submit">
                    Login
                </Button>
                <p className="form-paragraph">Not registered yet? Register <a onClick={props.isRegistered} href="">Here</a></p>
            </Form>
        </Container>
    )
}


export default LogInForm;
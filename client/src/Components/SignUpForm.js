import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function SignUpForm(props) {
    return(
        <Container className="form-container">
            <Form onSubmit={props.handleSignUp}>
                <Form.Group>
                    <Form.Control type="text" placeholder="Choose Username" ref={props.userNameInputRef}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" ref={props.passwordInputRef}/>
                </Form.Group>
                <Button variant="dark" type="submit">
                    Register
                </Button>
                <p className="form-paragraph">Already registered? Login <a onClick={props.isRegistered} href="">Here</a></p>
            </Form>
        </Container>
    );
};

export default SignUpForm;
import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function SignUpForm(props) {
    return(
        <Container className="form-container">
            <Form>
                <Form.Group>
                    <Form.Control type="text" placeholder="Choose Username" />
                </Form.Group>

                {/* <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group> */}

                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Confirm Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
                <p className="form-paragraph">Already registered? Login <a onClick={props.isRegistered} href="">Here</a></p>
            </Form>
        </Container>
    )
}

export default SignUpForm;
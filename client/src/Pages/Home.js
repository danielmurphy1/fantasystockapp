import React, { useState } from 'react';
import { Container} from 'react-bootstrap';
import LogInForm from '../Components/LogInForm';
import SignUpForm from '../Components/SignUpForm';

function Home() {
    const [ isRegistered, setIsRegistered ] = useState(true);

    function toggleIsRegistered(event) {
        event.preventDefault();
        setIsRegistered(prevState => !prevState);
        console.log(isRegistered)
    };

    function FormSwitch() {
        if (isRegistered) {
            return <LogInForm isRegistered={toggleIsRegistered}/>
         } else {
            return <SignUpForm isRegistered={toggleIsRegistered}/>
         }
    }

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
            <FormSwitch />
        </Container>
        
    );
}

export default Home;
import React, { useContext } from 'react';
import AuthContext from '../store/auth-context';
import UserContext from '../store/user-context';
import axios from 'axios';

import { Container } from 'react-bootstrap';

function Welcome() {

    const authCtx = useContext(AuthContext);
    const userCtx = useContext(UserContext);

    function getProtected(){
        axios.get('/api/protected', {
            headers:{
                "Content-type": "application/json", 
                "Accept": "application/json", 
                "Authorization": "Bearer" + " " + authCtx.token
            }
        })
        .then(res => console.log(res))
        .catch(err => {
            alert(err)
            console.log(err.message)})
    }
    return (
        <Container>
            <Container className="App welcome-container">
                <h1>Welcome {userCtx.userName} to Fantasy Stock Trader</h1>
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
            <h2>Login Successful</h2>
            <button onClick={getProtected}>Protected</button>

        </Container>
        
    );
}

export default Welcome;
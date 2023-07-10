import axios from 'axios';
import React, { useState, useRef, useContext } from 'react';
import { Container } from 'react-bootstrap';
import LogInForm from '../Components/LogInForm';
import SignUpForm from '../Components/SignUpForm';
import AuthContext from '../store/auth-context';
import UserContext from '../store/user-context';

function Home() {
    const [ isRegistered, setIsRegistered ] = useState(true);
    const [ successfulReg, setSuccessfulReg ] = useState(false);
    const userNameInputRef = useRef();
    const passwordInputRef = useRef();

    const authCtx = useContext(AuthContext);
    const userCtx = useContext(UserContext);

    function toggleIsRegistered(event) {
        event.preventDefault();
        setIsRegistered(prevState => !prevState);
        if (isRegistered) {
            setSuccessfulReg(false);
        }
    };

    const formSwitch = () => {
        if (isRegistered) {
            return <LogInForm 
                        isRegistered={toggleIsRegistered} 
                        handleLogin={handleLogin}
                        userNameInputRef={userNameInputRef}
                        passwordInputRef={passwordInputRef}
                        />
        } else {
            return <SignUpForm 
                        isRegistered={toggleIsRegistered}
                        handleSignUp={handleSignUp}
                        userNameInputRef={userNameInputRef}
                        passwordInputRef={passwordInputRef}
                        />
        }
    };

    function handleLogin(event){
        event.preventDefault();

        const enteredUserName = userNameInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        if(enteredUserName && enteredPassword){
            axios.post('/api/login', {
                username: enteredUserName, 
                password: enteredPassword
            })
            .then(res => {
                //expirationTime is current time plus token expiresIn converted to a new date object
                const expirationTime = new Date(new Date().getTime() + (+res.data.expiresIn));
                authCtx.login(res.data.accessToken, expirationTime.toISOString(), res.data.result[0].id);
                userCtx.login(res.data.result[0].wallet_balance, res.data.result[0].username);
            })
            .catch(error => {
                alert("Please check your username/password.");
            });
        } else {
            alert('You must provide a username and password.');
        }    
    };

    function handleSignUp(event) {
        event.preventDefault();
        const enteredUserName = userNameInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        axios.post('/api/signup', {
            username: enteredUserName, 
            password: enteredPassword
        }).then(res => {
            if (!res.data.detail) {
                setIsRegistered(prevState => !prevState);
                setSuccessfulReg(prevState => !prevState);
            } else {
                const errorMessage = res.data.detail;
                alert(errorMessage);
            }
        })
    };

    return (
        <Container>
            <Container className="App welcome-container">
                <h1>Welcome to Fantasy Stock Trader</h1>
                <p>
                    Fantasy Stock Trader is to Wall Street what fantasy football is to the NFL.
                    Instead of a coach, here you take on the role of a stock market invester with 
                    none of the risks: because at Fantasy Stock Trader the money is imaginary, 
                    just like your dream of being an NFL coach one day. When you register, you receive $25,000
                    of pretend money to hedge your bets and see if you can become a stock trading tycoon! So, 
                    what are you waiting for? Register below and begin your dream to become a millionaire.
                    <br></br> 
                    Please note that if you have just loaded the page, you may need to wait 30s-60s for the hosting
                    provider to spin up the backend. Thanks for your patience!
                </p>
            </Container>
            {successfulReg && (<p className="text-center">Registration Successful - Login Below</p>)}
            {formSwitch()}
        </Container>
        
    );
};

export default Home;
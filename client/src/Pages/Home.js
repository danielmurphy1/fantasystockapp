import axios from 'axios';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Container } from 'react-bootstrap';
import LogInForm from '../Components/LogInForm';
import SignUpForm from '../Components/SignUpForm';
import AuthContext from '../store/auth-context';
import UserContext from '../store/user-context';

function Home() {
    const [ isRegistered, setIsRegistered ] = useState(true);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
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
        console.log(isRegistered)
    };

    // function FormSwitch() {
    //     if (isRegistered) {
    //         return <LogInForm 
    //                     isRegistered={toggleIsRegistered} 
    //                     handleUserNameChange={handleUserNameChange} 
    //                     handlePasswordChange={handlePasswordChange}
    //                     handleLogin={handleLogin}
    //                     userName={userName}
    //                     password={password}
    //                     />
    //     } else {
    //         return <SignUpForm isRegistered={toggleIsRegistered}/>
    //     }
    // };

    const formSwitch = () => { //fix lose input focus each character typed bug
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
                console.log(res);
                console.log(res.data.accessToken);
                console.log(res.data.result[0].id);
                console.log(res.data.result[0].wallet_ballance)
                console.log(res.data.result[0].username)
                console.log(res.data.result[0].password)
                //expirationTime is current time plus token expiresIn converted to a new date object
                const expirationTime = new Date(new Date().getTime() + (+res.data.expiresIn));
                authCtx.login(res.data.accessToken, expirationTime.toISOString(), res.data.result[0].id);
                userCtx.login(res.data.result[0].wallet_ballance, res.data.result[0].username);
            })
            .catch(error => {
                console.log(error)
                alert(error)
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
            console.log(res)
            if (!res.data.detail) {
                setIsRegistered(prevState => !prevState);
                setSuccessfulReg(prevState => !prevState);
            } else {
                const errorMessage = res.data.detail;
                console.log(errorMessage);
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
                    Instead of a coach, here you take on the role of someone who wants to play the 
                    market with none of the risks: because at Fantasy Stock Trader the money is imaginary, 
                    just like your dream of being an NFL coach one day. When you sign-up, you receive $10,000
                    of pretend money to hedge your bets and see if you can become a stock trading tycoon! So, 
                    what are you waiting for? Register below and begin your dream to become a millionaire.
                </p>
            </Container>
            {successfulReg && (<p className="text-center">Registration Successful - Login Below</p>)}
            {formSwitch()}
        </Container>
        
    );
}

export default Home;
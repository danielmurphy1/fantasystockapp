import axios from 'axios';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Container } from 'react-bootstrap';
import LogInForm from '../Components/LogInForm';
import SignUpForm from '../Components/SignUpForm';
import AuthContext from '../store/auth-context';

function Home() {
    const [ isRegistered, setIsRegistered ] = useState(true);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ successfulReg, setSuccessfulReg ] = useState(false);
    const userNameInputRef = useRef();
    const passwordInputRef = useRef();

    const authCtx = useContext(AuthContext);

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
                //expirationTime is current time plus token expiresIn converted to a new date object
                const expirationTime = new Date(new Date().getTime() + (+res.data.expiresIn));
                authCtx.login(res.data.accessToken, expirationTime.toISOString());
            })
            .catch(error => {
                console.log(error)
                alert(error)
            });
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
            {successfulReg && (<p>Registration Successful</p>)}
            {/* <p>Registration Successful</p> */}
            {/* <FormSwitch /> */}
            {formSwitch()}
        </Container>
        
    );
}

export default Home;
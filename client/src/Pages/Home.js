import axios from 'axios';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Container } from 'react-bootstrap';
import LogInForm from '../Components/LogInForm';
import SignUpForm from '../Components/SignUpForm';
import AuthContext from '../store/auth-context';

// function FormSwitch() { //this is one fix for the single character entry input bug
//     const [ isRegistered, setIsRegistered ] = useState(true);
//     const [ isLoggedIn, setIsLoggedIn ] = useState(false);
//     const [ userName, setUserName] = useState('');
//     const [ password, setPassword ] = useState('');

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
//     };

//     function toggleIsRegistered(event) {
//         event.preventDefault();
//         setIsRegistered(prevState => !prevState);
//         console.log(isRegistered)
//     };

//     function handleLogin(event){
//         event.preventDefault();
//         if(userName && password.length > 0 ){
//             axios.post('/api/login', {
//                 username: 'admin', 
//                 password: 'admin'
//             });
//             setIsLoggedIn(true);
//         }
//     };

//     function handleUserNameChange(event){
//         // const { name, value } = event.target;
//         setUserName(event.target.value)
//     };

//     function handlePasswordChange(event){
//         // const { name, value } = event.target;
//         setPassword(event.target.value)
//     };
// };

function Home() {
    const [ isRegistered, setIsRegistered ] = useState(true);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ successfulReg, setSuccessfulReg ] = useState(false);
    // const [ userName, setUserName] = useState('');
    // const [ password, setPassword ] = useState('');
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
                        // handleUserNameChange={handleUserNameChange} 
                        // handlePasswordChange={handlePasswordChange}
                        // handleInputChange={handleInputChange}
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
        // if(userName && password){
        //     axios.post('/api/login', {
        //         username: userName, 
        //         password: password
        //     })
        //     .then(res => {
        //         console.log(res);
        //         setIsLoggedIn(true);
        //     })
        //     .catch(error => console.log(error.body));
        //     setUserName('');
        //     setPassword('');
        // }
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
                // setIsLoggedIn(true);
                authCtx.login(res.data.accessToken);
            })
            .catch(error => {
                console.log(error)
                alert(error)
            });
            // setUserName('');
            // setPassword('');
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

    // function handleUserNameChange(event){
    //     setUserName(event.target.value)
    // };

    // function handlePasswordChange(event){
    //     setPassword(event.target.value)
    // };

    // function handleInputChange(event){
    //     if (event.target.name === 'userName'){
    //         setUserName(event.target.value)
    //     } else if (event.target.name === 'password'){
    //         setPassword(event.target.value)
    //     }
    // };


    // useEffect(() => {
    //     handleLogin();
    // }, {})

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
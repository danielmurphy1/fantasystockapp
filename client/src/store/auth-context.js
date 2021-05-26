import React, { useState } from 'react';

const AuthContext = React.createContext({
    token: '', 
    isLoggedIn: false,
    login: (token) =>{}, 
    logout: () => {}
});

const calculateRemainingTime = (expirationTime) => {
    const curerntTime = new Date().getTime();
    const adjustedExpirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjustedExpirationTime - curerntTime;

    return remainingDuration;
};

export const AuthContextProvider = (props) => {
    const initalToken = localStorage.getItem('token');
    const [token, setToken] = useState(initalToken);

    const userIsLoggedIn = !!token;

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    const loginHandler = (token, expirationTime) =>{
        setToken(token);
        localStorage.setItem('token', token);

        const remainingTime = calculateRemainingTime(expirationTime);

        setTimeout(logoutHandler, remainingTime);
    };

    const contextValue = {
        token: token, 
        isLoggedIn: userIsLoggedIn, 
        login: loginHandler, 
        logout: logoutHandler
    };

    return(
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
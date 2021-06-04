import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
    token: '', 
    isLoggedIn: false,
    userId: '',
    login: (token) =>{}, 
    logout: () => {}
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjustedExpirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjustedExpirationTime - currentTime;

    return remainingDuration;
};

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    const storedExpirationDate = localStorage.getItem('expirationTime');

    const remainingTime = calculateRemainingTime(storedExpirationDate);

    if (remainingTime <= 60000) { //if less than 1m exists, do not log in 
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('expirationTime');
        return null;
    }

    return {
        token: storedToken,
        userId: storedUserId, 
        duration: remainingTime
    }
};

export const AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken();
    let initialToken;
    let initialUserId;

    // if (tokenData) {
    //     initialToken = tokenData.token;

    // }
    tokenData ? initialToken = tokenData.token : initialToken = undefined;
    tokenData ? initialUserId = tokenData.userId : initialUserId = undefined;
    
    const [token, setToken] = useState(initialToken);
    const [userId, setUserId] = useState(initialUserId);

    const userIsLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('expirationTime');

        // if (logoutTimer){
        //     clearTimeout(logoutTimer);
        // }

        logoutTimer ? clearTimeout(logoutTimer) : null;
    }, []);

    const loginHandler = (token, expirationTime, userId) =>{
        setToken(token);
        setUserId(userId);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('expirationTime', expirationTime);

        const remainingTime = calculateRemainingTime(expirationTime);

        logoutTimer = setTimeout(logoutHandler, remainingTime);
    };

    useEffect(() => {
        if (tokenData){
            console.log(tokenData.duration);
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData], logoutHandler);

    const contextValue = {
        token: token,
        userId: userId, 
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
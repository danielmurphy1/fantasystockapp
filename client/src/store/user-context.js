import React, { useState } from 'react';

const UserContext = React.createContext({
    accountBalance: 50000, 
    userName: '', 
    login: () => {}, 
    logout: () => {}
});

const retrieveUserData = () => {
    const storedBalance = localStorage.getItem('accountBalance');
    const storedUser = localStorage.getItem('userName');

    return{
        accountBalance: storedBalance, 
        userName: storedUser
    }
};


export const UserContextProvider = (props) => {
    const userData = retrieveUserData();
    let initialUserName;
    let initialBalance;

    userData ? initialUserName = userData.userName : initialUserName = undefined;
    userData ? initialBalance = userData.accountBalance : initialBalance = undefined;

    const [accountBalance, setAccountBalance] = useState(initialBalance);
    const [userName, setUserName] = useState(initialUserName);

    const loginHandler = (balance, name) => {
        setAccountBalance(balance);
        setUserName(name);
        localStorage.setItem('userName', name);
        localStorage.setItem('accountBalance', balance);
    };

    const logoutHandler = () => {
        setAccountBalance(null);
        setUserName(null);
        localStorage.removeItem('userName');
        localStorage.removeItem('accountBalance');
    };

    const contextValue = {
        accountBalance: accountBalance, 
        userName: userName, 
        login: loginHandler, 
        logout: logoutHandler
    };

    return (
        <UserContext.Provider value={contextValue}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContext;


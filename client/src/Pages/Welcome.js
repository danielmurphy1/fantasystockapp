import React, { useContext } from 'react';
import UserContext from '../store/user-context';
import { Container } from 'react-bootstrap';

function Welcome() {

    const userCtx = useContext(UserContext);

    return (
        <Container>
            <Container className="App welcome-container">
                <h1>Welcome {userCtx.userName} to Fantasy Stock Trader</h1>
                <p>
                    Head to the Trade page to search for stocks and to buy/sell shares. There you can also see information about the current stocks you hold
                    and how much money is in your account.  
                </p>
                <p>
                    The Portfolio page will show you graphic representations of your holdings. There you will see the percentage that each of your holdings 
                    contributes to your portfolio as well as a stock to stock comparison of the number of shares held. There you will also
                    see the total of all your assests combined from your cash account and the value of your stock shares. 
                </p>
            </Container>
        </Container>
        
    );
};

export default Welcome;
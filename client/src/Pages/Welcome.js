import React, { useContext } from 'react';
import UserContext from '../store/user-context';
import { Container } from 'react-bootstrap';

function Welcome() {

    const userCtx = useContext(UserContext);

    return (
        <Container>
            <Container className="App welcome-container">
                <h1>Welcome {userCtx.userName} to Fantasy Stock Trader</h1>
                <br></br>
                <p>
                    <em>Due to the significant increase in cost of the API that is consumed for this application, the free tier is used, which has rate limits
                    with it. If you experience sudden inability to search for stocks, this is almost certainly the issue. Take a little break, and come back in a few minutes. </em>
                </p>
                <br></br>
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
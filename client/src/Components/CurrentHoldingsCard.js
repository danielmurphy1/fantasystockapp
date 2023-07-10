import React, { useState, useEffect, useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import '../Styles/CurrentHoldingsCard.css';
import axios from 'axios';
import AuthContext from '../store/auth-context';
const formatter = require('../utils/helpers/currency-formatter');

function CurrentHoldingsCard(props) {
    const [currentPrice, setCurrentPrice] = useState(null);
    const [currentValue, setCurrentValue] = useState(null);

    const authCtx = useContext(AuthContext);

    const headers = {
        "Content-type": "application/json", 
        "Accept": "application/json", 
        "Authorization": "Bearer" + " " + authCtx.token
    }

    useEffect(async () => {
        const response = await axios.get(`/api/search/${props.holding.symbol}`, {
            headers:headers
            }
        );
        setCurrentPrice(response.data.priceResponse.price);
        console.log(response.data);

    },[props.holding.symbol]);

    useEffect(() => {
        setCurrentValue(currentPrice * props.holding.shares_owned);

    }, [currentPrice, props.holding.shares_owned]); 

    useEffect(() => {
        updateSharesValue();
    }, [currentValue]);
    
    function updateSharesValue (){
        
        const body = {
            userId: authCtx.userId, 
            symbol: props.holding.symbol, 
            newValue: currentValue
        }

        axios.put('/api/stocks/update', body, {headers:headers});
    };

    const price = formatter.format(currentPrice);
    const value = formatter.format(currentValue);

    return(
        <Card style={{width: '18rem', padding: '0px'}} className="mt-2 shadow-lg">
            <Card.Header id="holdings-header" style={{width: '100%'}}>
                <h3>{props.holding.symbol}</h3>
            </Card.Header>
            <Card.Body>
                <p>Current Shares: {props.holding.shares_owned}</p>
                <p>Current Price:{price}</p>
                <p>Value of Shares: {value}</p>
                <Button onClick={(event)=>{props.handleStockSearch(event, props.holding.symbol)}} variant="outline-dark">View Details</Button>
            </Card.Body>
        </Card>
    );
};

export default CurrentHoldingsCard;
import React, { useState, useEffect, useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import '../Styles/CurrentHoldingsCard.css';
import axios from 'axios';
import AuthContext from '../store/auth-context';

function CurrentHoldingsCard(props) {
    const [currentPrice, setCurrentPrice] = useState(null);
    // const currentValue = currentPrice * props.holding.shares_owned;
    const [currentValue, setCurrentValue] = useState(null);

    const authCtx = useContext(AuthContext);

    useEffect(async () => {
        const response = await axios.get(`/api/search/${props.holding.symbol}`);
        setCurrentPrice(response.data.latestPrice);
        console.log(response.data);

    },[props.holding.symbol])

    useEffect(() => {
        setCurrentValue(currentPrice * props.holding.shares_owned);

    }, [currentPrice, props.holding.shares_owned]) 

    useEffect(() => {
        updateSharesValue();
    }, [currentValue])

    
    function updateSharesValue (){
        
        const body = {
            userId: authCtx.userId, 
            symbol: props.holding.symbol, 
            newValue: currentValue
        }

        const headers = {
            "Content-type": "application/json", 
            "Accept": "application/json", 
            "Authorization": "Bearer" + " " + authCtx.token
        }

        axios.put('/api/stocks/update', body, {headers:headers});
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });

    const price = formatter.format(currentPrice);
    const value = formatter.format(currentValue);
    return(
        <Card style={{width: '18rem'}}>
            <Card.Header id="holdings-header">
                <h3>{props.holding.symbol}</h3>
            </Card.Header>
            <Card.Body>
                <p>Current Shares: {props.holding.shares_owned}</p>
                <p>Current Price:{price}</p>
                <p>Value of Shares: {value}</p>
                <Button onClick={()=>{props.handleStockSearch(event, props.holding.symbol)}}>View Details</Button>
            </Card.Body>
        </Card>
    )
}

export default CurrentHoldingsCard;
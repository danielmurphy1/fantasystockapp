import React, { useState } from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import '../Styles/SearchResultCard.css';


function SearchResultCard(props){

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });

    const price = formatter.format(props.currentPrice);
    const priceChange = formatter.format(props.priceChange);

    return(
        <Card>
            <Card.Header id="result-header" as="h3" className="text-left d-flex justify-content-between">{props.stockSymbol} 
                <div>
                    {props.companyName} 
                </div>
                <div>
                    <Button className="mx-3" onClick={props.buyTransaction}>Buy</Button>
                    <Button onClick={props.sellTransaction}>Sell</Button>
                </div>
            </Card.Header>
            <Card.Body id="result-card-body" className="d-flex justify-content-around">
                <div>
                    <h4>Current Shares</h4>
                    <p>{props.currentShares}</p>
                </div>
                <div>
                    <h4>Current Price</h4>
                    <p>{price}</p>
                </div>
                <div>
                    <h4>Price Change</h4>
                    <p>{priceChange}</p>
                </div>
            </Card.Body>
        </Card>
    )
}

export default SearchResultCard;
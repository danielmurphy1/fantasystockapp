import React from 'react';
import { Card, Button } from 'react-bootstrap';
import '../Styles/CurrentHoldingsCard.css';

function CurrentHoldingsCard(props) {
    return(
        <Card style={{width: '18rem'}}>
            <Card.Header id="holdings-header">
                <h3>{props.holding.stockSymbol}</h3>
            </Card.Header>
            <Card.Body>
                <p>Current Shares: 10</p>
                <p>Current Price: $215.65</p>
                <p>Value of Shares: $2156.50</p>
                <Button>View Details</Button>
            </Card.Body>
        </Card>
    )
}

export default CurrentHoldingsCard;
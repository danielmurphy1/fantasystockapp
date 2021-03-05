import React from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import '../Styles/SearchResultCard.css';


function SearchResultCard(props){
    return(
        <Card>
            <Card.Header id="result-header" as="h3" className="text-left d-flex justify-content-between">{props.stockSymbol}
                {/* <Container className=""> */}
                <div>
                    <Button className="mx-3">Buy</Button>
                    <Button>Sell</Button>
                {/* </Container> */}
                </div>
            </Card.Header>
            <Card.Body id="result-card-body" className="d-flex justify-content-around">
                <div>
                    <h4>Current Shares</h4>
                    <p>10</p>
                </div>
                <div>
                    <h4>Current Price</h4>
                    <p>$320.50</p>
                </div>
                <div>
                    <h4>Precentage Change</h4>
                    <p>+0.52%</p>
                </div>
            </Card.Body>
        </Card>
    )
}

export default SearchResultCard;
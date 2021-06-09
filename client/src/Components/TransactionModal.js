import React, { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import AuthContext from '../store/auth-context';

import axios from 'axios';

function TransactionModal(props) {
    const [sharesToTrade, setSharesToTrade] = useState(null);

    const authCtx = useContext(AuthContext);

    const headers = {
    "Content-type": "application/json", 
    "Accept": "application/json", 
    "Authorization": "Bearer" + " " + authCtx.token
}

    async function buyButtonHandler(){
        if (props.currentShares === 0){
            const body = {
                userId: authCtx.userId, 
                symbol: props.stockSymbol, 
                companyName: props.companyName, 
                sharesToBuy: sharesToTrade, 
                sharesValue: (sharesToTrade * props.currentPrice)
            }
            console.log(body)
            
            const response = await axios.post('/api/stocks', body, {headers:headers});
            console.log(response);
        } else {
            const body = {
                userId: authCtx.userId, 
                symbol: props.stockSymbol, 
                newShares: parseInt(props.currentShares) + parseInt(sharesToTrade), 
            }

            console.log(body)

            const response = await axios.put('/api/stocks/buy', body, {headers:headers});
            console.log(response);
        }

        props.getHoldings(authCtx.userId);
        props.setShowChart(false);
        props.setShowResultCard(false);

        // props.handleCloseModal();
            
    };

    async function sellButtonHandler(){
        if (props.currentShares === 0){
            const body = {
                userId: authCtx.userId, 
                symbol: props.stockSymbol, 
                companyName: props.companyName, 
                sharesToBuy: sharesToTrade, 
                sharesValue: (sharesToTrade * props.currentPrice)
            }
            console.log(body)
            
            const response = await axios.post('/api/stocks', body);
            console.log(response);
        } else {
            const body = {
                userId: authCtx.userId, 
                symbol: props.stockSymbol, 
                newShares: parseInt(props.currentShares) + parseInt(sharesToTrade), 
            }

            console.log(body)

            const response = await axios.put('/api/stocks/buy', body);
            console.log(response);
        }

        props.getHoldings(authCtx.userId);
        props.setShowChart(false);
        props.setShowResultCard(false);

        // props.handleCloseModal();
            
    };

    function renderButtons(){
        if (props.buyOrSell === "Buy") {

            return <div>
                        <Button className="mr-3" onClick={buyButtonHandler}>Buy Shares</Button>
                        <Button disabled>Sell Shares</Button>
                    </div>
            
        } else if (props.buyOrSell === "Sell"){
            return <div>
                        <Button className="mr-3" disabled>Buy Shares</Button>
                        <Button>Sell Shares</Button>
                    </div>
        }
    };

    function sharesToTradeHandler(event){
        setSharesToTrade(event.target.value)
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });

    const price = formatter.format(props.currentPrice);

    return(
        <Modal show={props.show} onHide={props.handleCloseModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>{props.stockSymbol}</Modal.Title>
            </Modal.Header>
            <Form>
                <Modal.Body className="text-center">
                    <p>Current Share Price: {price}</p>
                    <p>Current Number of Shares: {props.currentShares}</p>
                        <Form.Group>
                            <Form.Label>Number of Shares to Trade</Form.Label>
                            <Form.Control type="number" min="0" onChange={sharesToTradeHandler}></Form.Control>
                        </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    {renderButtons()}
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default TransactionModal;
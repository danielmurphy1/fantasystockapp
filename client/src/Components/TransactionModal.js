import React, { useState, useContext } from 'react';
import { Modal, Button, Form, ModalDialog } from 'react-bootstrap';
import AuthContext from '../store/auth-context';
import axios from 'axios';
const formatter = require('../utils/helpers/currency-formatter');

function TransactionModal(props) {
    const [sharesToTrade, setSharesToTrade] = useState(null);
    const [oversellMessage, setOversellMessage] = useState(null);
    const [overbuyMessage, setOverBuyMessage] = useState(null);

    const price = formatter.format(props.currentPrice);
    const purchaseAmount = sharesToTrade * props.currentPrice;
    const authCtx = useContext(AuthContext);

    const headers = {
        "Content-type": "application/json", 
        "Accept": "application/json", 
        "Authorization": "Bearer" + " " + authCtx.token
    }

    async function buyButtonHandler(){
        if ((sharesToTrade * props.currentPrice > props.accountBalance)){
            setOverBuyMessage("You Cannot Spend More Than Current Account Balance!");
            return;
        } else {
            if (props.currentShares === 0){
                const body = {
                    userId: authCtx.userId, 
                    symbol: props.stockSymbol, 
                    companyName: props.companyName, 
                    sharesToBuy: sharesToTrade, 
                    sharesValue: (sharesToTrade * props.currentPrice)
                }
                
                await axios.post('/api/stocks/new', body, {headers:headers});
            } else {
                const body = {
                    userId: authCtx.userId, 
                    symbol: props.stockSymbol, 
                    newShares: parseInt(props.currentShares) + parseInt(sharesToTrade),
                    newValue: props.currentPrice * (parseInt(props.currentShares) + parseInt(sharesToTrade))
                }
    
                await axios.put('/api/stocks/buy', body, {headers:headers});
            }
        }
        
        props.getHoldings(authCtx.userId);
        props.setShowChart(false);
        props.setShowResultCard(false);
        props.subtractAccountBalance(purchaseAmount);
        setOverBuyMessage(null);
        props.handleCloseModal();   
    };

    async function sellButtonHandler(){
        if (sharesToTrade > props.currentShares) {
            setOversellMessage("You Cannot Sell More Shares of This Stock Than You Own!");
        } else {
            const body = {
                userId: authCtx.userId, 
                symbol: props.stockSymbol, 
                newShares: parseInt(props.currentShares) - parseInt(sharesToTrade),
                newValue: props.currentPrice * (parseInt(props.currentShares) - parseInt(sharesToTrade))
            }
    
            await axios.put('/api/stocks/sell', body, {headers:headers});
        
            props.getHoldings(authCtx.userId);
            props.setShowChart(false);
            props.setShowResultCard(false);
            props.addAccountBalance(purchaseAmount);
            setOversellMessage(null);
            props.handleCloseModal();
        } 
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
                        <Button onClick={sellButtonHandler}>Sell Shares</Button>
                    </div>
        }
    };

    function sharesToTradeHandler(event){
        setSharesToTrade(event.target.value)
    };

    let transactionType;
    if (props.buyOrSell === "Buy") {
        transactionType = "Buy" 
    } else if (props.buyOrSell ==="Sell") {
        transactionType = "Sell"
    } 

    return(
        <Modal show={props.show} onHide={props.handleCloseModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>{props.stockSymbol}</Modal.Title>
            </Modal.Header>
            <Form>
                <Modal.Body className="text-center">
                    <p>Current Share Price: {price}</p>
                    <p>Current Number of Shares: {props.currentShares}</p>
                    <p>Current Account Balance: {props.balance}</p>
                        <Form.Group>
                            <Form.Label>Number of Shares to {transactionType}</Form.Label>
                            <Form.Control type="number" min="0" onChange={sharesToTradeHandler}></Form.Control>
                            {!!oversellMessage && (<ModalDialog>{oversellMessage}</ModalDialog>)}
                            {!!overbuyMessage && (<ModalDialog>{overbuyMessage}</ModalDialog>)}
                        </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    {renderButtons()}
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default TransactionModal;
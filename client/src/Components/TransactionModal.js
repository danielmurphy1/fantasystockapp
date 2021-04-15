import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function TransactionModal(props) {
    const [sharesToTrade, setSharesToTrade] = useState(null);

    async function buyButtonHandler(){
        const body = {
            stockSymbol: props.stockSymbol, 
            sharesToTrade: sharesToTrade
        };

        const response = await axios.post('/api/stocks', body);
        console.log(response);

        props.getHoldings();
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
        // <Modal show={props.show} onHide={props.handleCloseModal} centered>
        //     <Modal.Header closeButton>
        //         <Modal.Title>{props.stockSymbol}</Modal.Title>
        //     </Modal.Header>
        //     <Modal.Body className="text-center">
        //         <p>Current Share Price: {price}</p>
        //         <p>Current Number of Shares: 27</p>
        //         <Form>
        //             <Form.Group>
        //                 <Form.Label>Number of Shares to Trade</Form.Label>
        //                 <Form.Control type="number" min="0"></Form.Control>
        //             </Form.Group>
        //         </Form>
        //     </Modal.Body>
        //     <Modal.Footer>
        //         {renderButtons()}
        //     </Modal.Footer>
        // </Modal>
        <Modal show={props.show} onHide={props.handleCloseModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>{props.stockSymbol}</Modal.Title>
            </Modal.Header>
            <Form>
                <Modal.Body className="text-center">
                    <p>Current Share Price: {price}</p>
                    <p>Current Number of Shares: 27</p>
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
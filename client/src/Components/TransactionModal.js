import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function TransactionModal(props) {

    function renderButtons(){
        if (props.buyOrSell === "Buy") {

            return <div>
                        <Button className="mr-3">Buy Shares</Button>
                        <Button disabled>Sell Shares</Button>
                    </div>
            
        } else if (props.buyOrSell === "Sell"){
            return <div>
                        <Button className="mr-3" disabled>Buy Shares</Button>
                        <Button>Sell Shares</Button>
                    </div>
        }
    }

    return(
        <Modal show={props.show} onHide={props.handleCloseModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>{props.stockSymbol}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <p>Current Share Price: $105.23</p>
                <p>Current Number of Shares: 27</p>
                <Form>
                    <Form.Group>
                        <Form.Label>Number of Shares to Trade</Form.Label>
                        <Form.Control type="number" min="0"></Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {renderButtons()}
            </Modal.Footer>
        </Modal>
    )
}

export default TransactionModal;
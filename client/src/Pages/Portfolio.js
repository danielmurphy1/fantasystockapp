import React from 'react';
import { Container, Card, Image, ListGroup } from 'react-bootstrap';
import pie from '../images/sample-pie.png';
import bar from '../images/sample-bar.png';

function Portfolio() {
    return(
        <Container className="App">
            <h2>USERNAME's Portfolio</h2>
            <Container className="d-flex align-items-start mt-5">
                <Card style={{ width: '24rem' }}>
                    <Card.Header as="h3">Account Information</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item as="p">Account Balance: 100000.00</ListGroup.Item>
                        <ListGroup.Item as="p">Value of All Shares: 5000.00</ListGroup.Item>
                        <ListGroup.Item as="p">Total Holdings: 105000.00</ListGroup.Item>
                    </ListGroup>
                </Card>
                <Image src={pie} style={{width: "75%"}}></Image>
            </Container>
            <Container>
                <Image src={bar} style={{width: "75%"}}></Image>    
            </Container>
        </Container>
    )
}

export default Portfolio;
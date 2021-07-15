import React, { useContext, useEffect, useState } from 'react';
import { Container, Card, Image, ListGroup, Row, Col } from 'react-bootstrap';
import UserContext from '../store/user-context';
import AuthContext from '../store/auth-context';
import axios from 'axios';
import PortfolioPieChart from '../Components/Charts/PortfolioPieChart';
import PortfolioBarChart from '../Components/Charts/PortfolioBarChart';

function Portfolio() {
    const [sharesValue, setSharesValue] = useState();
    const [currentHoldings, setCurrentHoldings] = useState([]);
    const [showCharts, setShowCharts] = useState(false);

    const authCtx = useContext(AuthContext);
    const userCtx = useContext(UserContext);

    useEffect(() => { 
        getPortfolioTotal(authCtx.userId);
        getHoldings(authCtx.userId);
    }, [])

    async function getHoldings(userId){
        const response = await axios.get(`/api/stocks/${userId}`, {
            headers:{
                "Content-type": "application/json", 
                "Accept": "application/json", 
                "Authorization": "Bearer" + " " + authCtx.token
            }, 
            params: {
                userId: authCtx.userId
            }
        })

            setCurrentHoldings(response.data);
            console.log(currentHoldings);
            return response;
    };

    async function getPortfolioTotal(userId){
        const response = await axios.get(`/api/portfolio/${userId}`, {
            headers:{
                "Content-type": "application/json", 
                "Accept": "application/json", 
                "Authorization": "Bearer" + " " + authCtx.token
            }, 
            params: {
                userId: authCtx.userId
            }
        })

        if (response.data[0].total != null) {
            setSharesValue(response.data[0].total);
            setShowCharts(true);
        } else {
            setSharesValue(0);
            setShowCharts(false);
        }
        console.log(response.data[0].total)
        return response;
    };

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });

    const formattedBalance = formatter.format(userCtx.accountBalance);
    const formattedSharesValue = formatter.format(sharesValue);
    const totalHoldings = parseFloat(userCtx.accountBalance) + parseFloat(sharesValue);
    const formattedHoldings = formatter.format(totalHoldings);

    return(
        <Container className="App">
            <h2 className="pt-3">{userCtx.userName}'s Portfolio</h2>
                <Container className="d-flex align-items-start mt-5">
                    <Row>
                        <Col lg={5}>
                            <Card style={{ width: '24rem' }}>
                                <Card.Header as="h3">Account Information</Card.Header>
                                <ListGroup variant="flush">
                                    <ListGroup.Item as="p">Account Balance: {formattedBalance}</ListGroup.Item>
                                    <ListGroup.Item as="p">Value of All Shares: {formattedSharesValue}</ListGroup.Item>
                                    <ListGroup.Item as="p">Total Holdings: {formattedHoldings}</ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                        <Col lg={7}>
                        {showCharts && <PortfolioPieChart 
                            holdings={currentHoldings}
                        />}
                        {!showCharts && <h3>Your Portfolio Currently Consists of Your Account Balance...Go Trade!</h3>}
                        </Col>
                    </Row>
                    
                </Container>
            
            <Container className="mt-3">
                <Row>
                    <Col lg={12}>
                        {showCharts && <PortfolioBarChart 
                            holdings={currentHoldings}
                        />}
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default Portfolio;
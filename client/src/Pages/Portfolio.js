import React, { useContext, useEffect, useState } from 'react';
import { Container, Card, Image, ListGroup } from 'react-bootstrap';
import UserContext from '../store/user-context';
import AuthContext from '../store/auth-context';
import axios from 'axios';
import pie from '../images/sample-pie.png';
import bar from '../images/sample-bar.png';

function Portfolio() {
    const [sharesValue, setSharesValue] = useState();

    const authCtx = useContext(AuthContext);
    const userCtx = useContext(UserContext);

    useEffect(() => { 
        getPortfolioTotal(authCtx.userId)
    }, [])

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

        setSharesValue(response.data[0].total)
        // console.log(response.data[0].total)
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
            <h2>{userCtx.userName}'s Portfolio</h2>
            <Container className="d-flex align-items-start mt-5">
                <Card style={{ width: '24rem' }}>
                    <Card.Header as="h3">Account Information</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item as="p">Account Balance: {formattedBalance}</ListGroup.Item>
                        <ListGroup.Item as="p">Value of All Shares: {formattedSharesValue}</ListGroup.Item>
                        <ListGroup.Item as="p">Total Holdings: {formattedHoldings}</ListGroup.Item>
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
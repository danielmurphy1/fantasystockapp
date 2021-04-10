
import React, { useState, useEffect } from 'react';
import { Container, Image } from 'react-bootstrap';
import SearchForm from '../Components/SearchForm';
import SearchResultCard from '../Components/SearchResultCard';
import CurrentHoldingsCard from '../Components/CurrentHoldingsCard';
import TransactionModal from '../Components/TransactionModal';
import puppy from '../images/place-holder-line-graph.jpg';
import axios from 'axios';


function Trade() {
    const [accountBalance, setAccountBalance] = useState(100000.00);
    const [showChart, setShowChart] = useState(false);
    const [showResultCard, setShowResultCard] = useState(false);
    const [stockSymbol, setStockSymbol] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [show, setShow] = useState(false);
    const [buyOrSell, setBuyOrSell] = useState("");
    const [currentPrice, setCurrentPrice] = useState(null);
    const [priceChange, setPriceChange] = useState(null);
    const [companyName, setCompanyName] = useState("");

    useEffect(() => { //request stocks array from server and return to client
        fetch("/api/stocks")
        .then(res => res.json())
        .then(res => console.log(res))
            
    }) 

    function buyTransaction (event){
        setShow(true)
        setBuyOrSell(event.target.textContent);
    }

    function sellTransaction (event){
        setShow(true);
        setBuyOrSell(event.target.textContent);
    }

    function handleShowModal(){
        setShow(true);
    }

    function handleCloseModal(){
        setShow(false);
    }

    function handleInputValueChange(event){
        setInputValue(event.target.value);
    }

    let chart;
    if (showChart){
        chart = <Image className="search-result-image" src={puppy} fluid/>
    }

    let resultCard;
    if(showResultCard){
        resultCard = <SearchResultCard 
                        stockSymbol={stockSymbol} 
                        handleShowModal={handleShowModal} 
                        buyTransaction={buyTransaction} 
                        sellTransaction={sellTransaction} 
                        currentPrice={currentPrice}
                        priceChange={priceChange}
                        companyName={companyName}
                        />
    }

    async function handleStockSearch(event){
        event.preventDefault();
       
        
        await fetch(`/api/search/${inputValue}`)
            .then(res => res.json())
            .then(res => {
                setShowChart(true);
                setShowResultCard(true);
                setStockSymbol(inputValue);
                // console.log(showChart)
                setInputValue("");

                console.log(res);
                console.log(res.latestPrice)
                console.log(res.change);
                setCurrentPrice(res.latestPrice);
                setPriceChange(res.change);
                setCompanyName(res.companyName);
            });

              
    }

    
    
//current holding cards being clicked on will make them "searched" and return a SearchResultCard and Chart

    return(
        <Container className="App">
            <h2>Trading Page</h2>
            <h3>Current Account Balance: ${accountBalance}</h3>
            <p>Search Stock Symbols to Trade. Examples: "AAPL" = Apple "NFLX" = Netflix</p>
            <SearchForm  handleStockSearch={handleStockSearch} handleInputValueChange={handleInputValueChange} inputValue={inputValue}/>
            {/* the Image component is where the line graph will go for the SearchResultCard Stock */}
            {resultCard}
            {chart}
            <div className="row justify-content-around">
                <CurrentHoldingsCard />
                <CurrentHoldingsCard />
                <CurrentHoldingsCard />
            </div>
            <TransactionModal buyOrSell={buyOrSell} stockSymbol={stockSymbol} show={show} currentPrice={currentPrice} handleShowModal={handleShowModal} handleCloseModal={handleCloseModal} />
        </Container>
    )
}

export default Trade;
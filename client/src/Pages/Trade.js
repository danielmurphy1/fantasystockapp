
import React, { useState } from 'react';
import { Container, Image } from 'react-bootstrap';
import SearchForm from '../Components/SearchForm';
import SearchResultCard from '../Components/SearchResultCard';
import CurrentHoldingsCard from '../Components/CurrentHoldingsCard';
import puppy from '../images/place-holder-line-graph.jpg';


function Trade() {
    const [accountBalance, setAccountBalance] = useState(100000.00);
    const [showChart, setShowChart] = useState(false);
    const [showResultCard, setShowResultCard] = useState(false);
    const [stockSymbol, setStockSymbol] = useState("");

    function handleStockSymbolChange(event){
        setStockSymbol(event.target.value);
    }

    let chart;
    if (showChart){
        chart = <Image className="search-result-image" src={puppy} fluid/>
    }

    let resultCard;
    if(showResultCard){
        resultCard = <SearchResultCard stockSymbol={stockSymbol}/>
    }

    function handleStockSearch(event){
        event.preventDefault();
        setShowChart(true);
        setShowResultCard(true);
        // console.log(showChart) 
    }
    
//current holding cards being clicked on will make them "searched" and return a SearchResultCard and Chart

    return(
        <Container className="App">
            <h2>Trading Page</h2>
            <h3>Current Account Balance: ${accountBalance}</h3>
            <p>Search Stock Symbols to Trade. Examples: "AAPL" = Apple "NFLX" = Netflix</p>
            <SearchForm  handleStockSearch={handleStockSearch} handleStockSymbolChange={handleStockSymbolChange} stockSymbol={stockSymbol}/>
            {/* the Image component is where the line graph will go for the SearchResultCard Stock */}
            {resultCard}
            {chart}
            <div className="row justify-content-around">
                <CurrentHoldingsCard />
                <CurrentHoldingsCard />
                <CurrentHoldingsCard />
            </div>
            
        </Container>
    )
}

export default Trade;
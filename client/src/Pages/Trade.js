
import React, { useState } from 'react';
import { Container, Image } from 'react-bootstrap';
import SearchForm from '../Components/SearchForm';
import SearchResultCard from '../Components/SearchResultCard';
import puppy from '../images/place-holder-line-graph.jpg';


function Trade() {
    const [accountBalance, setAccountBalance] = useState(100000.00);
    const [showChart, setShowChart] = useState(false);

    function handleStockSearch(event){
        event.preventDefault();
        setShowChart(true);
        // console.log(showChart) 
    }

    let chart;
    if (showChart){
        chart = <Image className="search-result-image" src={puppy} fluid/>
    }

// need to add functionality for result card to only show up after a search
// need to add current holding cards under the area for the SearchResultCard and the chart - they are persistent 
//current holding cards being clicked on will make them "searched" and return a SearchResultCard and Chart

    return(
        <Container className="App">
            <h2>Trading Page</h2>
            <h3>Current Account Balance: ${accountBalance}</h3>
            <p>Search Stock Symbols to Trade. Examples: "AAPL" = Apple "NFLX" = Netflix</p>
            <SearchForm  handleStockSearch={handleStockSearch}/>
            {/* the Image component is where the line graph will go for the SearchResultCard Stock */}
            <SearchResultCard/>
            {chart}
        </Container>
    )
}

export default Trade;
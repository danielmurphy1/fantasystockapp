
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Container, Image } from 'react-bootstrap';
import SearchForm from '../Components/SearchForm';
import SearchResultCard from '../Components/SearchResultCard';
import CurrentHoldingsCard from '../Components/CurrentHoldingsCard';
import TransactionModal from '../Components/TransactionModal';
import AuthContext from '../store/auth-context';
import puppy from '../images/place-holder-line-graph.jpg';
import axios from 'axios';


function Trade() {
    const [currentHoldings, setCurrentHoldings] = useState([]);
    const [accountBalance, setAccountBalance] = useState(100000.00);
    const [showChart, setShowChart] = useState(false);
    const [showResultCard, setShowResultCard] = useState(false);
    const [stockSymbol, setStockSymbol] = useState("");
    // const stockSymbolInputRef = useRef();
    const [inputValue, setInputValue] = useState("");
    const [show, setShow] = useState(false);
    const [buyOrSell, setBuyOrSell] = useState("");
    const [currentPrice, setCurrentPrice] = useState(null);
    const [currentShares, setCurrentShares] = useState(null);
    const [priceChange, setPriceChange] = useState(null);
    const [companyName, setCompanyName] = useState(""); 

    const authCtx = useContext(AuthContext);
    
    useEffect(() => { //request stocks array from server and return to client
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
                        currentShares = {currentShares}
                        />
    }

    async function handleStockSearch(event, inputValue){
        event.preventDefault();

        let symbol;

        await fetch(`/api/search/${inputValue}`)
            .then(res => res.json())
            .then(res => {
                setShowChart(true);
                setShowResultCard(true);
                setStockSymbol(res.symbol);
                setInputValue("");
                symbol = res.symbol;
                console.log(res);
                console.log(res.latestPrice)
                console.log(res.change);
                setCurrentPrice(res.latestPrice);
                setPriceChange(res.change);
                setCompanyName(res.companyName);
            });

        const response = await getHoldings(authCtx.userId);
        console.log(response.data)

        for (let i = 0; i < response.data.length; i++){
            if (response.data[i].symbol === symbol){
                setCurrentShares(response.data[i].shares_owned);
                break;
            } else {
                setCurrentShares(0);
            }
        }
    }

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
                {currentHoldings.map(holding => <CurrentHoldingsCard key={holding.symbol} holding={holding} handleStockSearch={handleStockSearch} />)}
            </div>
            <TransactionModal 
                buyOrSell={buyOrSell} 
                stockSymbol={stockSymbol} 
                show={show} 
                currentPrice={currentPrice} 
                handleShowModal={handleShowModal} 
                handleCloseModal={handleCloseModal}
                getHoldings={getHoldings}
                setShowChart={setShowChart}
                setShowResultCard={setShowResultCard}
                companyName={companyName}
                />
        </Container>
    )
}

export default Trade;
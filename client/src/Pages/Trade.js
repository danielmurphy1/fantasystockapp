
import React, { useState, useEffect, useContext } from 'react';
import { Container, Image, Button } from 'react-bootstrap';
import SearchForm from '../Components/SearchForm';
import SearchResultCard from '../Components/SearchResultCard';
import CurrentHoldingsCard from '../Components/CurrentHoldingsCard';
import TransactionModal from '../Components/TransactionModal';
import AuthContext from '../store/auth-context';
import UserContext, { UserContextProvider } from '../store/user-context';
import puppy from '../images/place-holder-line-graph.jpg';
import axios from 'axios';


function Trade() {
    const [currentHoldings, setCurrentHoldings] = useState([]);
    const [showChart, setShowChart] = useState(false);
    const [showResultCard, setShowResultCard] = useState(false);
    const [stockSymbol, setStockSymbol] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [show, setShow] = useState(false);
    const [buyOrSell, setBuyOrSell] = useState("");
    const [currentPrice, setCurrentPrice] = useState(null);
    const [currentShares, setCurrentShares] = useState(null);
    const [priceChange, setPriceChange] = useState(null);
    const [companyName, setCompanyName] = useState(""); 

    

    const authCtx = useContext(AuthContext);
    const userCtx = useContext(UserContext);
    const [accountBalance, setAccountBalance] = useState(userCtx.accountBalance);
    
    useEffect(() => { //request stocks array from server and return to client
        getHoldings(authCtx.userId);
        console.log(userCtx.accountBalance);
        console.log(userCtx.userName);
        console.log(authCtx.userId)
        console.log(userCtx)
    }, [])

    useEffect(() => {
        console.log(typeof(accountBalance))
    }, [accountBalance])

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
            // setAccountBalance(userCtx.accountBalance);
            return response;
    };

    function subtractAccountBalance(amount){
        setAccountBalance(prevState => parseFloat(prevState) - amount);
    }

    function addAccountBalance(amount){
        setAccountBalance(prevState => parseFloat(prevState) + amount);
    }

    useEffect(async () => {
        const body = {
            balance: accountBalance
        }
        localStorage.setItem('accountBalance', accountBalance.toString())

        const response = await axios.put('/api/user/subtract', body );
        console.log(response)
    }, [accountBalance])

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

        const responseData = await fetch(`/api/search/${inputValue}`)
            .then(res => res.json());
        
        setShowChart(true);
        setShowResultCard(true);
        setStockSymbol(responseData.symbol);
        setInputValue("");
        console.log(responseData);
        console.log(responseData.latestPrice)
        console.log(responseData.change);
        setCurrentPrice(responseData.latestPrice);
        setPriceChange(responseData.change);
        setCompanyName(responseData.companyName);

        const response = await getHoldings(authCtx.userId);
        console.log(response.data)

        if (response.data.length === 0){
            setCurrentShares(0);
        } else {
            for (let i = 0; i < response.data.length; i++){
                if (response.data[i].symbol === responseData.symbol){
                    setCurrentShares(response.data[i].shares_owned);
                    break;
                } else {
                    setCurrentShares(0);
                }
            }
        }

        // for (let i = 0; i < response.data.length; i++){
        //     if (response.data[i].symbol === responseData.symbol){
        //         setCurrentShares(response.data[i].shares_owned);
        //         break;
        //     } else {
        //         setCurrentShares(0);
        //     }
        // }
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });

    const balance = formatter.format(accountBalance);
    return(
        <Container className="App">
            <h2>Trading Page</h2>
            <h3>Current Account Balance: {balance}</h3>
            <p>Search Stock Symbols to Trade. Examples: "AAPL" = Apple "NFLX" = Netflix</p>
            <SearchForm  handleStockSearch={handleStockSearch} handleInputValueChange={handleInputValueChange} inputValue={inputValue}/>
            {/* the Image component is where the line graph will go for the SearchResultCard Stock */}
            {resultCard}
            {chart}
            {/* <Button onClick={subtractAccountBalance}>Subtract</Button> */}
            <div className="row justify-content-around">
                {currentHoldings.map(holding => <CurrentHoldingsCard key={holding.symbol} holding={holding} handleStockSearch={handleStockSearch} />)}
            </div>
            <TransactionModal 
                buyOrSell={buyOrSell} 
                stockSymbol={stockSymbol} 
                show={show} 
                currentPrice={currentPrice}
                currentShares={currentShares} 
                handleShowModal={handleShowModal} 
                handleCloseModal={handleCloseModal}
                getHoldings={getHoldings}
                setShowChart={setShowChart}
                setShowResultCard={setShowResultCard}
                companyName={companyName}
                balance={balance}
                subtractAccountBalance={subtractAccountBalance}
                addAccountBalance={addAccountBalance}
                />
        </Container>
    )
}

export default Trade;
import React from 'react';
import { Container } from 'react-bootstrap';
import SearchForm from '../Components/SearchForm';

function Trade() {
    return(
        <Container className="App">
            <h3>Trading Page</h3>
            <p>Search Stock Symbols to Trade. Examples: "AAPL" = Apple "NFLX" = Netflix</p>
            <SearchForm />
        </Container>
    )
}

export default Trade;
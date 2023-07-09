import React from 'react';
import { Form, Button } from 'react-bootstrap';

function SearchForm(props) {
    return(
        <Form inline className="justify-content-around mb-3" onSubmit={()=>{props.handleStockSearch(event, props.inputValue)}}>
            <Form.Group>
                <Form.Label htmlFor="stockSymbolSearch" srOnly>Stock Symbol</Form.Label>
                <Form.Control type="text" id="stockSymbolSearch" placeholder="Enter Stock Symbol" className="mr-1" value={props.inputValue} onChange={props.handleInputValueChange} required/>
                <Button type="submit">Search</Button>
            </Form.Group>
        </Form>
    );
};


export default SearchForm;
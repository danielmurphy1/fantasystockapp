import React from 'react';
import { Form, Button } from 'react-bootstrap';

function SearchForm() {
    return(
        <Form inline className="justify-content-around">
            <Form.Group>
                <Form.Label htmlFor="stockSymbolSearch" srOnly>Stock Symbol</Form.Label>
                <Form.Control type="text" id="stockSymbolSearch" placeholder="Enter Stock Symbol" className="mr-1" />
                <Button type="submit">Search</Button>
            </Form.Group>
        </Form>
    )
}


export default SearchForm;
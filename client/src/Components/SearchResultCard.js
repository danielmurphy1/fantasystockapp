import React from 'react';
import { Card } from 'react-bootstrap';
import puppy from '../images/place-holder-line-graph.jpg';


function SearchResultCard(){
    return(
        <Card>
            {/* <Card.Img variant="top" src={puppy}/> */}
            <Card.Body>
                <Card.Title>Title</Card.Title>
            </Card.Body>
        </Card>
    )
}

export default SearchResultCard;
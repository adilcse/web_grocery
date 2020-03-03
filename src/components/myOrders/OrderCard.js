import React from 'react';
import { CardDeck, Card } from 'react-bootstrap';
import ItemCard from './ItemCard';
const OrderCard=(props)=>{
    const{order}=props;
    console.log(order)
   
    if(order){
    return (
        <CardDeck>
            <Card>
            <Card.Body>
             <ItemCard items={order.item}/>
            </Card.Body>
            </Card>
        </CardDeck>
        )
       }
    else{
        return(
            <></>
        )
    }
}
export default OrderCard;
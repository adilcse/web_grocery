import React, { useState } from 'react';
import { CardDeck, Card } from 'react-bootstrap';
import ItemCard from './ItemCard';
import StatusCard from './StatusCard';
import { getItems } from '../../app/helper/getItems';
let items=[];
const OrderCard=(props)=>{
    const{order}=props;
    const [loaded,setLoaded]=useState(false);


    const getIds=()=>{
        let ids=[];
        order.item.forEach(element => {
        ids.push(element.id)
        });
        return ids;
    }
    if(!loaded){
        let ids=getIds();
         getItems(ids).then((res) => {
             items=res;
            setLoaded(true);
        });
    }
    if(order){
    return (
        <CardDeck className={props.className}>
            <Card>
            <Card.Body>
             <ItemCard items={items}/>
             <StatusCard className='border-top'/>
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
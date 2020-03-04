import React, { useState } from 'react';
import { CardDeck, Card} from 'react-bootstrap';
import ItemCard from './ItemCard';
import StatusCard from './StatusCard';
import { getItems } from '../../app/helper/getItems';
import Loading from '../Loading';
import HeaderCard from './HeaderCard';
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
             items=[];
             order.item.forEach((item)=>{
              let data= res.find((element)=>{
               return item.id===element.id
               });
                items.push({name:data.name,
                            image:data.image,
                            catagory:data.catagory,
                            price:item.price,
                            quantity:item.quantity})
             })   
        }).then(()=>setLoaded(true));
    }
    if(order && loaded){
        return (
            <CardDeck className='rounded mb-3'>
            <Card>
                <Card.Header>
                    <HeaderCard orderedOn={order.orderedOn} deleveredOn={order.deleveredOn}/>
                </Card.Header>
            <Card.Body>
            <ItemCard items={items}/>
            <StatusCard address={order.address} 
                        paymentMode={order.paymentMode} 
                        total={order.total}
                        status={order.status}   
                        />
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
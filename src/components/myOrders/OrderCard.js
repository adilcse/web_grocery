import React, { useState } from 'react';
import { CardDeck, Card ,Media, Container, Row, Col, Button} from 'react-bootstrap';
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
        <Media className="border">
            <img 
            width={200}
            height={200}
            className="mr-3"
            src={Image}
            alt={items}
            />
            <Media.Body>
             <h1> <ItemCard items={items}/></h1>
             <Container>
                 <Row>
                     <h3> Price</h3>
                 </Row>
                 <Row className="border-top">
                     <Col xs-2><h4><StatusCard/></h4></Col>
                     <Col xs-2><Button variant="link">Track order</Button></Col>
                     <Col xs-8></Col>
                 </Row>
             </Container>
            </Media.Body>
        </Media>
        )
       }
    else{
        return(
            <></>
        )
    }
}
export default OrderCard;
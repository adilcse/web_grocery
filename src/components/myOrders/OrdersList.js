import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import OrderCard from "./OrderCard";
const OrdersList=(props)=>{
    console.log(props.orders)
    if(props.orders.length>0){
    return(
        <Container>
        {/* Stack the columns on mobile by making one full-width and the other half-width */}
        <Row  className="justify-content-md-center">
          <Col xs={12} md={10}>
            {props.orders.map((item,index)=>{
                return <OrderCard order={item} key={index}/>
            })}
          </Col>
        </Row>
        </Container>
      
    )}else{
        return(<></>)
    }
}
export default OrdersList;
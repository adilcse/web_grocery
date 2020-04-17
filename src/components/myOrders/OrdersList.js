import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import OrderCard from "./OrderCard";
const OrdersList=(props)=>{
    if(props.orders.length>0){
    return(
        <Container>
        <Row  className="justify-content-md-center">
          <Col xs={12} md={10}>
            {props.orders.map((item,index)=>{
                return <OrderCard order={item} key={index}  changePage={props.changePage}/>
            })}
          </Col>
        </Row>
        </Container>
      
    )}else{
        return(<></>)
    }
}
export default OrdersList;
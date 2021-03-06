import React from 'react';
import { Row, Col } from 'react-bootstrap';
const  HeaderCard=(props)=>{
    const ordered=props.orderedOn?props.orderedOn.toDate().toLocaleString():null;
    const delevered=props.deleveredOn?props.deleveredOn.toDate().toLocaleString():null;
    
    return(
    <Row>
        <Col className='text-left' xs='12' md='4'>
        Ordered On : {ordered}
        </Col>
        <Col className='text-center' xs='12' md='4'>
        seller name: {props.sellerName}
        </Col>
        <Col className='text-right' xs='12' md='4'>
        Delevered On : {delevered?delevered:'Pending'}
        </Col>

    </Row>
)
}
export default HeaderCard;
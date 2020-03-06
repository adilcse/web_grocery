import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
const StatusCard=(props)=>{
   
    let trackButton=<Button>Track Now</Button>
return(
    <Container  >
        <Row className='border-bottom'>
            <Col md='6' xs='12' className='text-left border-bottom'>
              
                <Row>
                    <Col md='4' xs='6'>
                    Payment mode  
                    </Col>
                    <Col md='8' xs='6'>
                    {props.paymentMode}
                    </Col>
                </Row>
                <Row>
                    <Col md='4' xs='6'>
                    Address 
                    </Col>
                    <Col md='8' xs='6' className='text-truncate'>
                    {props.address.address}
                    </Col>   
                </Row>
                <Row className='h5'>
                    <Col md='4' xs='6'>
                     status 
                    </Col>
                    <Col md='8' xs='6'>
                     {props.status}
                    </Col>    
                </Row>
              
                
            </Col>
            <Col md='4' xs='12' className='ml-auto text-left'>
                <Row>
                    <Col md='8' xs='8'>
                    Sub Total 
                    </Col>
                    <Col md='4' xs='4'>
                    ₹{props.total.total-props.total.deleveryCharges}
                    </Col>
                </Row>
                <Row className='border-bottom pb-3'>
                    <Col md='8' xs='8'>
                    Delevery Charges  
                    </Col>
                    <Col md='4' xs='4'>
                    ₹{props.total.deleveryCharges} 
                    </Col>   
                </Row>
                <Row className='h5'>
                    <Col md='8' xs='8'>
                    Grand Total 
                    </Col>
                    <Col md='4' xs='4' className='d-flex'>
                    ₹{props.total.total}
                    </Col>    
                </Row>

            </Col>
        </Row>
        <Row className='justify-content-center'>
        {props.status==='pending'?trackButton:<></>}
        </Row>
    </Container>
)
}
export default StatusCard;
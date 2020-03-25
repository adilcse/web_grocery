import React from 'react';
import { Container, Row, Col, Button, ProgressBar } from 'react-bootstrap';
import {  ACCEPT, OUT_FOR_DELIVERY, PENDING, DELIVERED } from '../../app/constants';
import { changeStatusText } from '../../app/helper/changeStatusText';

const StatusCard=(props)=>{
    let trackButton=<Button onClick={props.track}>Track Now</Button>
    let StatusProgressBar=()=>{
        switch(props.status){
            case PENDING:
                return  <ProgressBar>
                        <ProgressBar striped variant="warning" now={25} key={1} label='Ordered'/>
                </ProgressBar>
            case ACCEPT:
                return <ProgressBar>
                            <ProgressBar striped variant="warning" now={25} key={1} label='Ordered'/>
                            <ProgressBar striped variant="primary" now={25} key={2} label='Accepted'/>
                    </ProgressBar>
            case OUT_FOR_DELIVERY:
                return <ProgressBar>
                        <ProgressBar striped variant="warning" now={25} key={1} label='Ordered' />
                        <ProgressBar striped variant="primary" now={25} key={2} label='Accepted' />
                        <ProgressBar striped variant="info" now={25} key={3} label='Out For Delivered'/>
                </ProgressBar>
            case DELIVERED:
                return <ProgressBar>
                        <ProgressBar striped variant="warning" now={25} key={1}  label='Ordered' />
                        <ProgressBar striped variant="primary" now={25} key={2}  label='Accepted'/>
                        <ProgressBar striped variant="info" now={25} key={3}  label='Out ForDelivery'/>
                        <ProgressBar striped variant="success" now={25} key={4}  label='Delivered'/>
                </ProgressBar>
            default:
                return <ProgressBar>
                        <ProgressBar striped variant="danger" now={100} key={1} label='Rejected' />
                </ProgressBar>

        }
    }
     
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
                    delivery Address 
                    </Col>
                    <Col md='8' xs='6' className='text-truncate'>
                    {props.address.address}
                    </Col>   
                </Row>
                <Row>
                    <Col md='4' xs='6'>
                   Seller  Address 
                    </Col>
                    <Col md='8' xs='6' className='text-truncate'>
                    {props.sellerDetails.address}
                    </Col>   
                </Row>
                <Row className='h5'>
                    <Col md='4' xs='6'>
                    </Col>
                    <Col md='8' xs='6'>
                     {changeStatusText(props.status)}
                    </Col>    
                </Row>
                <Row>
                <Col>
                <StatusProgressBar/>
                </Col>
                </Row>
                
            </Col>
            <Col md='4' xs='12' className='ml-auto text-left'>
                <Row>
                    <Col md='8' xs='8'>
                    Sub Total 
                    </Col>
                    <Col md='4' xs='4'>
                    ₹{props.total.total-props.total.deliveryCharges}
                    </Col>
                </Row>
                <Row >
                    <Col md='8' xs='8'>
                    Delivery Charges  
                    </Col>
                    <Col md='4' xs='4'>
                    ₹{props.total.deliveryCharges} 
                    </Col>   
                </Row>
                {props.total.cancledAmount>0?<Row>
                    <Col md='8' xs='8'>
                    Refund Amount : 
                    </Col>
                    <Col md='4' xs='4'>
                    - ₹{props.total.cancledAmount} 
                    </Col>  
                </Row>:<></>}
                <Row className='border-top pt-3 h5'>
                    <Col md='8' xs='8'>
                    Grand Total 
                    </Col>
                    <Col md='4' xs='4' className='d-flex'>
                    ₹{props.total.cancledAmount?props.total.total-props.total.cancledAmount:props.total.total}
                    </Col>    
                </Row>

            </Col>
        </Row>
        <Row className='justify-content-center'>
        {(props.status===ACCEPT ||props.status===OUT_FOR_DELIVERY)?trackButton:<></>}
        </Row>
    </Container>
)
}
export default StatusCard;
import React from 'react';
import { Button, Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import CreditCard from '../profile/CreditCard';
import { Divider } from 'semantic-ui-react';
const Payment =(props)=>{
    const {address}=props;
    return(
        <div className='ml-1'>
            <Row>
                <span className="h4">Name : </span> <span className='my-auto ml-1 h5'> {address.name}</span>
            </Row>
            <Row>
                <span className="h4">Mobile Number : </span> <span  className='my-auto ml-1 h5'> {address.mobile}</span>
            </Row>
            <Row>
                <span className="h4">Address : </span> <span  className='my-auto ml-1 h5'> {`${address.address} , ${address.locality} , ${address.city} , ${address.state} , ${address.pin}`} </span>  
            </Row>
            <Col className="col-md-7 m-auto">
                <CreditCard className="col col-md-8 mt-2" />
                <p>Payment via card is not available at the moment</p>
            </Col>
            <Divider/>

            <Button variant="info" size="lg" className="mt-3 mb-3"  onClick={()=>props.status(true)} > Cash On Delevery</Button>
        </div>
    )
}
export default Payment;
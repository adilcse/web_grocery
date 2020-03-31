import React from 'react';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
const Payment =(props)=>{
    const {address}=props;
    let styleContainer={
        minHeight:'200px',
       
    }
    let styleButton={
        marginTop:'50%'
    }
    return(
        <div style={styleContainer} className='ml-1'>
            <Row>
                <h3>Name :</h3> <h5 className='my-auto'>{address.name}</h5>
            </Row>
            <Row>
                <h3>Mobile Number :</h3> <h5  className='my-auto'>{address.mobile}</h5>
            </Row>
            <Row>
               <h3>Address :</h3> <h5  className='my-auto'>{`${address.address} , ${address.locality} , ${address.city} , ${address.state} , ${address.pin}`} </h5>  
            </Row>

            <Button variant="info" style={styleButton} onClick={()=>props.status(true)} > Cash On Delevery</Button>
        </div>
    )
}
export default Payment;
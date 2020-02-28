import React from 'react';
import { Button } from 'react-bootstrap';
const Payment =(props)=>{
    let styleContainer={
        minHeight:'200px',
       
    }
    let styleButton={
        marginTop:'50%'
    }
    return(
        <div style={styleContainer}>
            <Button variant="info" style={styleButton} onClick={()=>props.status(true)} > Cash On Delevery</Button>
        </div>
    )
}
export default Payment;
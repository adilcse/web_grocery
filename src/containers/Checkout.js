import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import CartTotal from '../components/cart/CartTotal';
import EnterAddress from '../components/EnterAddress';
const Checkout=()=>{
let {from}=useParams('from');
const userName=useSelector(state=>state.userLogin.userName);
const total=useSelector(state=>state.CheckoutReducer.total);
if(!userName){
    return (  
        <Alert variant='danger' >
            <Alert.Heading>Please Login First</Alert.Heading>
            <h2><Link to='/signin'>Login</Link></h2>
        </Alert>
    )
}
else
return(
    <div className="container">
    <div className='row'>
        <div className='col-md-8'>
       <EnterAddress/>
        </div>
        <div className='col-md-4'>
        {total.countItems>=1?
        <div className='row'>
            <CartTotal item={total}/>      
        </div>:<div>No Items</div>
    }
        </div>
        
    
    </div>

</div>
)
}
export default Checkout;
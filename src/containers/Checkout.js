import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import CartTotal from '../components/cart/CartTotal';
import EnterAddress from '../components/EnterAddress';
import LoginRegister from '../components/signin/LoginRegister';
const Checkout=()=>{
let {from}=useParams('from');
const userName=useSelector(state=>state.userLogin.userName);
const details=useSelector(state=>state.CheckoutReducer.total);
const LoginCard=()=>{
    if(!userName){
        return (  
            <>
            <Alert variant='danger' >
                <Alert.Heading>Please Login First</Alert.Heading>
               
            </Alert>
            <LoginRegister/>
            </>
        )
    }
    else{
    return(
        <div className='card'>
            <div className='text-left'>
                <h3>LogedIn as : {userName}</h3>      
            </div>
          <EnterAddress/>
        </div> 
    )}
}

return(
    <div className="container">
    <div className='row'>
        <div className='col-md-8'>
       <LoginCard from={'checkout'}/>
        </div>
        <div className='col-md-4'>
        {details.countItems>=1?
        <div className='row'>
            <CartTotal item={details}/>      
        </div>:<div>No Items</div>
    }
        </div>
        
    
    </div>

</div>
)
}
export default Checkout;
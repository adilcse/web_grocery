import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { Alert, Button } from 'react-bootstrap';
import CartTotal from '../components/cart/CartTotal';
import EnterAddress from '../components/checkout/EnterAddress';
import LoginRegister from '../components/signin/LoginRegister';
import {LOGIN, ADDRESS, PAYMENT} from '../app/constants';
import PaymentPage from '../components/checkout/Payment'
import ErrorMessage from '../app/helper/ErrorMessage';
import {PlaceOrder} from '../redux/actions/CheckoutAction'
let fullAddress;
/**
 * it displays checkout page to user
 */
const Checkout=()=>{
const [currentTab,setCurrentTab]=useState(LOGIN);
const dispatch=useDispatch();
let {from}=useParams('from');
const userName=useSelector(state=>state.userLogin.userName);
const userId=useSelector(state=>state.userLogin.userId);
const details=useSelector(state=>state.CheckoutReducer);
if(!userName &&currentTab!==LOGIN){
    setCurrentTab(LOGIN)
}else if(userName && currentTab===LOGIN){
    setCurrentTab(ADDRESS);
}
/**
 * displays on left side of screen shows edit address and payment option
 * @param {*} props 
 */
const CheckoutCard=(props)=>{
    return(
        <div className='card'>
        <div className='text-left'>
            <h3>LogedIn as : {userName}</h3>      
        </div>
     {props.children}
    </div> 
    )
}
/**
 * if address entered by user is valid then change current tab
 * @param {*} tab 
 * @param {*} address 
 */
const validateAddress=(tab,address)=>{
    if(tab){
     fullAddress=address;
     setCurrentTab(PAYMENT);
    }
}
/**
 * if payment is successed then place the order .
 * call action to save data in db.
 * @param {*} status 
 */
const paymentStatus=(status)=>{
    if(status){
       dispatch(PlaceOrder(fullAddress,details,from,userId));
    }
}
/**
 * display different tabs for checkout
 */
const LeftCard=()=>{
     if(details.total.countItems>=1){
        switch(currentTab){
            case LOGIN: 
            return (  
                <>
                <Alert variant='danger' >
                    <Alert.Heading>Please Login First</Alert.Heading>
                
                </Alert>
                <LoginRegister/>
                </>
            );
            case ADDRESS:
                return(
                    <CheckoutCard>
                     
                        <EnterAddress setValidAddress={validateAddress} fullAddress={fullAddress}/>
                    </CheckoutCard>
                );
            case PAYMENT:
                    return(
                        <CheckoutCard>  
                               <Button block size='lg' onClick={()=>setCurrentTab(ADDRESS)}>Edit Address</Button>  
                            <PaymentPage status={paymentStatus}/>
                        </CheckoutCard>
                    )
            default:
                return(<ErrorMessage isError='true' message='Something went wrong'/>)
        }
    }
    else{
        return(<ErrorMessage isError='true' message='Something went wrong'/>)
    }
  
}
if(details.orderPlaced){
    return(
        <Alert variant='success' >
            <Alert.Heading>Order Placed Successfully</Alert.Heading>
            <Alert.Body>
                Go to My Orders
            </Alert.Body>
        </Alert>
    )
}
return(
    <div className="container">
    <div className='row'>
        <div className='col-md-8'>
       <LeftCard/>
        </div>
        <div className='col-md-4'>
        {details.total.countItems>=1?
        <div className='row'>
            <CartTotal item={details.total}/>      
        </div>:<div></div>
    }
        </div>

    </div>

</div>
)
}
export default Checkout;
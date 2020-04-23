import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Button, Tabs, Tab } from 'react-bootstrap';
import CartTotal from '../components/cart/CartTotal';
import EnterAddress from '../components/checkout/EnterAddress';
import LoginRegister from '../components/signin/LoginRegister';
import {LOGIN, ADDRESS, PAYMENT, PAYMENT_METHOD_COD} from '../app/constants';
import PaymentPage from '../components/checkout/Payment'
import ErrorMessage from '../app/helper/ErrorMessage';
import {PlaceOrder} from '../redux/actions/CheckoutAction'
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import GpsAddress from '../components/checkout/GpsAddress';
/**
 * it displays checkout page to user
 */
const Checkout=()=>{
const [currentTab,setCurrentTab]=useState(LOGIN);
const [addressTab,setAddressTab]=useState('gpsAddress');
const dispatch=useDispatch();
let {from}=useParams('from');
const userName=useSelector(state=>state.userLogin.name);
const user=useSelector(state=>state.userLogin.user);
const details=useSelector(state=>state.CheckoutReducer);
let userAddress=useSelector(state=>state.userLogin.address);
const sellers=useSelector(state=>state.sellers.ids);
const [fullAddress,setFullAddress]=useState(userAddress);

const sellersId=details.items.map(s=>{
    return s.seller_id;
});
const sellerLocations=sellersId.map(el=>{
  return sellers.find(element=>element.id===el)
})
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
            <h3>Logged in as : {userName}</h3>      
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
     setFullAddress(address);
     setCurrentTab(PAYMENT);
     }
}
/**
 * if payment is successed then place the order .
 * call action to save data in db.
 * @param {*} status 
 */
const paymentStatus=(status)=>{
   
    Object.keys(fullAddress).forEach(key=>{
        if(!fullAddress[key])
            fullAddress[key]='';
    })
    if(status){
       PlaceOrder(dispatch,fullAddress,details,from,user,PAYMENT_METHOD_COD);
    }
}
/**
 * set users address from gps and prompt to enter extra detiails
 * @param {*}address uses address by gps and google api call
 */
const setAddressByGps=(address)=>{
    setFullAddress({...fullAddress,...address});
    setAddressTab('enterAddress')
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
                        <Tabs activeKey={addressTab} id="addressTab" onSelect={k => setAddressTab(k)}>
                            <Tab eventKey="gpsAddress" title="Use my Location" >
                            <GpsAddress setAddress={setAddressByGps} sellers={sellerLocations}/>
                            </Tab>
                            <Tab eventKey="enterAddress" title="Enter Address">
                            <EnterAddress setValidAddress={validateAddress} fullAddress={fullAddress}/>
                            </Tab>
                           
                        </Tabs>
    
                    </CheckoutCard>
                );
            case PAYMENT:
                    return(
                        <CheckoutCard>  
                               <Button block size='lg' onClick={()=>setCurrentTab(ADDRESS)}>Edit Address</Button>  
                            <PaymentPage status={paymentStatus} address={fullAddress}/>
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
            <p><Link to="/myOrder">
                Go to My Orders
                </Link>
            </p>
        </Alert>
    )
}
if(details.loading){
    return(
        <Loading size={100}/>
    )
}

return(
  
    <div className="container">
        <ErrorMessage isError={details.isError} message={details.errorMessage}/>
    <div className='row'>
        <div className='col-md-8'>
       <LeftCard className='container'/>
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
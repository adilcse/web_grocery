import React, { useState } from 'react'
import CartCard from '../components/cart/CartCard';
import CartTotal from '../components/cart/CartTotal';
import { Button, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import CartList from '../components/cart/CartList';
import { db } from '../firebaseConnect';
import Loading from '../components/Loading';
import { removeFromCart } from '../redux/actions/CardAction';
let cart=[];
const Cart =()=>{
    const userId=useSelector(state=>state.userLogin.userId);
    const dispatch=useDispatch();
    let buttonStyle={
        padding : '10px 50px',
        fontSize:'1.5rem',
        color:'white',
    }
    let loading=false;
    const [loaded,setLoaded]=useState(false);
    const [cartUpdated,setCartUpdated]=useState(false);
    const loadCart=()=>{
        cart=[];
        if(!loading){
            loading=true;
            db.collection("user").doc(userId).collection('cart').get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                  
                    cart.push(doc.data());
                });
            }).then(()=>{
                setLoaded(true);
                loading=false;
            });}
    }
//remove item from cart
const removeItem=(id,index)=>{
    cart.splice(index,1);
    setCartUpdated(!cartUpdated);
    dispatch(removeFromCart(userId,id));
}
const updateQuantity=(id,quantity)=>{
    console.log(id,quantity,cart);
    cart[id].quantity=quantity;
    setCartUpdated(!cartUpdated);
}
    if(userId){
        if(!loaded){
        loadCart();
       return <Loading size={120}/>
    }else{
        return(
            <div className="container">
                <div className='row'>
                    <div className='col-md-8'>
                       <CartList item={cart} 
                       user={userId} 
                       removeItem={removeItem}
                       updateQuantity={updateQuantity}/>
                    </div>
                    <div className='col-md-4'>
                    <div className='row'>
                        <CartTotal item={cart}/>       
                    </div>
                    <div className='row mt-5 mx-auto'>
                    <button className="btn btn-primary " style={buttonStyle}>
                        <span>Place Order</span>
                    </button>   
                    </div>
                    </div>
                    
                
                </div>
               
            </div>
    
        ) 
    }
    }
   else{ 
    return(
        <Alert variant='danger'>
        <Alert.Heading>Please Login First</Alert.Heading>
    </Alert>
    )
   }
}
export default Cart;
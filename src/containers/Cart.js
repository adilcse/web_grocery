import React, { useState } from 'react'
import CartTotal from '../components/cart/CartTotal';
import {  Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import CartList from '../components/cart/CartList';
import Loading from '../components/Loading';
import { removeFromCart, removeFromGuestCart } from '../redux/actions/CardAction';
import { CheckoutCart } from '../redux/actions/CheckoutAction';
import {  useHistory } from 'react-router-dom';
//cart array holds all the items used in cart

/**
 * Cart component is a container routed by the cart in navbar
 * it renders all the items in the cart and the total price user have to pay
 */
const Cart =()=>{
    document.title='my Cart';
    let history = useHistory();
    const userId=useSelector(state=>state.userLogin.userId);
    const cart=useSelector(state=>state.addItemsToCart.item);
    const products=useSelector(state=>state.sellers.products); 
    const [available,setAvailable]=useState([]);
    const dispatch=useDispatch();
    const [showError,setShowError]=useState(false);
    const [checked,setChecked]=useState(false);
    const buttonStyle={
        padding : '10px 50px',
        fontSize:'1.5rem',
        color:'white',
    }
    const [loaded,setLoaded]=useState(false);
    const [cartUpdated,setCartUpdated]=useState(false);
    const checkItems=(cartItems=cart,product=products)=>{
        let av=[];
        cartItems.forEach(el=>{
            let item=product.find(item=>item.id===el.id);
           if(item)
            av.push(item.id);
        });
        setAvailable(av);
        setChecked(true)
        if(av.length!==cartItems.length)
            return false;
        else
            return true;
    }
    if(!checked && cart.length>0) checkItems();
    /**
     * when place order button is clicked 
     * it calculates the total 
     * and dispatches checkout action
     */
    const placeOrder=()=>{
        //scroll to top
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0;
       if(checkItems(cart,products)){
        setShowError(false);
        let obj=cardTotal();
        CheckoutCart(dispatch,cart,obj);
        history.push('/checkout/cart');
    }else{
        setShowError(true);
    }
    }

   /**
    * calculates the total cart price
    */
   const cardTotal=()=>{
    const countItems=cart.length;
    let total=0;
    let deleveryCharges=0;
    let MRPTotal=0;
    cart.forEach(element => {
        total+=(element.price*element.quantity);
        MRPTotal+=(element.MRP*element.quantity);
    });
    let discount=MRPTotal-total;
    total+=deleveryCharges;
  let cardTotalObj={
        countItems:countItems,
        total:total,
        deleveryCharges:deleveryCharges,
        discount:discount
    }
    return cardTotalObj;
   }
/**
 * if user is loggedin it removes from local as well as from database
 * if user is a guest then no need to update the database
 * @param {id of item to remove} id 
 * @param {index where to remove} index 
 */
const removeItem=(id,index)=>{
    cart.splice(index,1);
    setCartUpdated(!cartUpdated);
    if(userId)
        removeFromCart(userId,id, dispatch)
    else
        dispatch(removeFromGuestCart(id))
}
/**
 * updates the quantity of the item
 * @param {id of item to update} id 
 * @param {new updated qantity} quantity 
 */
const updateQuantity=(id,quantity)=>{
    cart[id].quantity=quantity;
    setCartUpdated(!cartUpdated);
}
//if item is not loaded it returns the progress bar
if(!loaded){
setLoaded(true);
return <Loading size={120}/>
}else{
if(cart.length===0){
    return(
        <Alert variant='info'>
            <Alert.Heading>No Item In Cart</Alert.Heading> 
        </Alert>
    )
}
else
    return( 
        <div className="container">
            <div className='row'>
                <div className='col-md-8' style={{overflowY:"scroll",maxHeight:'100vh'}}>
                    {showError?<Alert variant='danger'>One or more item is unavailable . Remove to continue.</Alert>:<></>}
                <CartList item={cart} 
                user={userId} 
                removeItem={removeItem}
                updateQuantity={updateQuantity}
                available={available}
                />
                </div>
                <div className='col-md-4'>
                <div className='row'>
                    <CartTotal item={cardTotal()}/>       
                </div>
                <div className='row mt-5 mx-auto'>
                 
                    <button className="btn btn-primary " style={buttonStyle} onClick={placeOrder}>
                        <span>Place Order</span>
                    </button>   
               
                </div>
                </div>
                
            
            </div>
        
        </div>

    ) 
}

}
export default Cart;
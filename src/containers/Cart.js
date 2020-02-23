import React from 'react'
import CartCard from '../components/cart/CartCard';
import CartTotal from '../components/cart/CartTotal';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
const Cart =()=>{
    const cart=useSelector(state=>state.addItemsToCart.cart);
    console.log(cart);

    let buttonStyle={
        padding : '10px 50px',
        fontSize:'1.5rem',
        color:'white',
    }
    return(
        <div className="container">
            <div className='row'>
                <div className='col-md-8'>
                    <div className='card'> 
                        <CartCard />
                        <CartCard />
                        <CartCard />                     
                    </div>
                </div>

                <div className='col-md-4'>
                <div className='row'>
                    <CartTotal/>       
                </div>
                <div className='row mt-5 mx-auto'>
                <button class="btn btn-primary " style={buttonStyle}>
                    <span>Place Order</span>
                </button>   
                </div>
                </div>
                
            
            </div>
           
        </div>

    )
}
export default Cart;
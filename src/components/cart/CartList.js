import React from 'react';
import CartCard from './CartCard';
import Loading from '../Loading';
/**
 * it rrenders card for each item
 * @param {*} props list of items present in cart
 */
const CartList=(props)=>{
    const {item,user}=props;    
    if(item)
        return(
            <div>
            {
                item.map((data,index) =>{    
                    return <CartCard item={data}  
                                    key={data.id}
                                    userId={user}
                                    index={index} 
                                    removeItem={props.removeItem}
                                    updateQuantity={props.updateQuantity}/>
                } )
            }
            </div>
        )
    else
        return(
            <Loading size={120}/>
        )
}
export default CartList;
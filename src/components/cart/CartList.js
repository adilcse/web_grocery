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
                                    key={data.item_id}
                                    user={user}
                                    dispatch={props.dispatch}
                                    index={index} 
                                    removeItem={props.removeItem}
                                    updateQuantity={props.updateQuantity}
                                    available={props.available}/>
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
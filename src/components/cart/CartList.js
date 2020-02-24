import React from 'react';
import CartCard from './CartCard';
import Loading from '../Loading';
import { Alert } from 'react-bootstrap';
const CartList=(props)=>{
    const {item,user}=props;
    if(item.length===0){
        return(
            <Alert variant='info'>
               <Alert.Heading>No Item In Cart</Alert.Heading> 
            </Alert>
        )
    }
    
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
import {
    ADD_TO_CART_FAILED,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_PENDING
    } from '../../app/ActionConstants';

export const addToCart = (id)=>dispatch=>{
    dispatch({ type: ADD_TO_CART_PENDING,
        payload : id})
    
}


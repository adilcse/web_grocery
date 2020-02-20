import {ADD_TO_CART} from '../../app/ActionConstants';

export const addToCart = (id)=>({
    type: ADD_TO_CART,
    payload : id
})


import {ADD_TO_CART} from '../../app/constants';
export const AddToCart = (id)=>({
    type: ADD_TO_CART,
    payload : id
})
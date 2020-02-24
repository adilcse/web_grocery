import {
    ADD_TO_CART_FAILED,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_PENDING,
    USER_NOT_SIGNED_IN
    } from '../../app/ActionConstants';


const initialState={
   cart:new Set()
    
}
export const addItemsToCart = (state=initialState,action={})=>{
    switch(action.type){
        case  ADD_TO_CART_SUCCESS:
            console.log(action.payload)
             let Ncart =new Set([...state.cart]);
           Ncart.add(action.payload);
            return {...state,cart:Ncart} ;
        default : 
        return state;
    }
}
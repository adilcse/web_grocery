import {
    ADD_TO_CART_FAILED,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_PENDING
    } from '../../app/ActionConstants';


const initialState={
   cart:new Set()
    
}
export const addItemsToCart = (state=initialState,action={})=>{
    switch(action.type){
        case  ADD_TO_CART_PENDING:
             let Ncart =new Set([...state.cart]);
           Ncart.add(action.payload);
            return {...state,cart:Ncart} ;
        default : 
        return state;
    }
}
import {
    ADD_TO_CART_FAILED,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_PENDING,
    USER_NOT_SIGNED_IN,
    LOGOUT_USER_SUCCESS,
    REMOVE_FROM_CART_SUCCESS,
    LOAD_CART
    } from '../../app/ActionConstants';


const initialState={
   cart:new Set()
    
}
export const addItemsToCart = (state=initialState,action={})=>{
    switch(action.type){
        case  ADD_TO_CART_SUCCESS:
           { 
             console.log(action.payload)
             let Ncart =new Set([...state.cart]);
             Ncart.add(action.payload);
             return {...state,cart:Ncart} ;
        }
        case REMOVE_FROM_CART_SUCCESS:
           { 
             let Ncart =new Set([...state.cart]);
             Ncart.delete(action.payload);
             return {...state,cart:Ncart} ;
            }
        case LOGOUT_USER_SUCCESS:
            return {...state,cart:initialState.cart};

        case LOAD_CART:
            return {...state,cart:action.payload}  ;  
        default : 
        return state;
    }
}
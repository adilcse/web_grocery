import {
    ADD_TO_CART_FAILED,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_PENDING,
    LOGOUT_USER_SUCCESS,
    REMOVE_FROM_CART_SUCCESS,
    REMOVE_FROM_CART_PENDING,
    LOAD_CART,
    ADD_TO_GUEST_CART,
    REMOVE_FROM_GUEST_CART,
    EMPTY_CART,
    CATAGORIES_LOADED,
    REMOVE_FROM_CART_FAILED,
    UPDATE_CART_FAILED,
    UPDATE_CART_SUCCESS
    } from '../../app/ActionConstants';

const initialState={
   cart:new Set(),
    item:[],
    loading:false,
    cartLoaded:false,
}
/**
 * cart reducers handles all cart releted action
 * @param {*} state 
 * @param {*} action 
 */
export const addItemsToCart = (state=initialState,action={})=>{
    switch(action.type){
        case ADD_TO_CART_PENDING:
            return{...state,loading:true}
        case  ADD_TO_CART_SUCCESS:
           { 
             let Ncart =new Set([...state.cart]);
             Ncart.add(action.payload);
             
             let items=[...state.item];
             items.push(action.item);
             return {...state,cart:Ncart,loading:false,item:items,cartLoaded:false};
        }
        case ADD_TO_CART_FAILED:
            return {...state}
        case REMOVE_FROM_CART_PENDING:
            return {...state}
        case REMOVE_FROM_CART_SUCCESS:
           { 
             let Ncart =new Set([...state.cart]);
             Ncart.delete(action.payload);
             return {...state,cart:Ncart,loading:false,cartLoaded:false} ;
            }
        case REMOVE_FROM_CART_FAILED:{
            return {...state}
        }
        case UPDATE_CART_SUCCESS:{
            const sItem=[...state.item];
            const item=sItem.map(el=>{
                if(el.item_id===action.payload.item_id){
                    return {...el,quantity:action.payload.quantity}
                }else{
                    return el;
                }
            })
            return {...state,item:item}
        }
            
        case UPDATE_CART_FAILED:{
            return {...state}
        }

        case LOGOUT_USER_SUCCESS:
            return {...state,...initialState};
        case ADD_TO_GUEST_CART:
            {
                let Ncart =new Set([...state.cart]);
                Ncart.add(action.payload);
                let Nitem=[...state.item];
                Nitem.push(action.item);
                return{...state,cart:Ncart,item:Nitem,loading:false}
            }
        case REMOVE_FROM_GUEST_CART:
            {
                let Ncart =new Set([...state.cart]);
                Ncart.delete(action.payload);
                let Nitem=[...state.item];
                Nitem.forEach((element,index)=>{
                    if(element.item_id===action.payload){
                        Nitem.splice(index,1)
                    }
                })
                return{...state,cart:Ncart,item:Nitem,loading:false}
            }    
        case LOAD_CART:
            return {...state,cart:action.payload,item:action.item,loading:false,cartLoaded:true}  ;  
        case EMPTY_CART:
            return {...state,...initialState}
            
        default : 
        return state;
    }
}

const initialCatagory={
    item:[]
};
/**
 * catagory reducer handles catagory  action
 * @param {*} state state object
 * @param {*} action action performed
 */
export const CatagoryReducer=(state=initialCatagory,action={})=>{
    switch(action.type){
        case CATAGORIES_LOADED:
            return{...state,
                item:action.payload.catagory?action.payload.catagory:[]
            }
        default:
            return{...state}
    }
}
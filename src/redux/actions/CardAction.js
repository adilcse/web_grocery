import {
    ADD_TO_CART_FAILED,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_PENDING,
    REMOVE_FROM_CART_PENDING,
    REMOVE_FROM_CART_SUCCESS,
    REMOVE_FROM_CART_FAILED,
    ADD_TO_GUEST_CART,
    REMOVE_FROM_GUEST_CART
    } from '../../app/ActionConstants';
import { db } from '../../firebaseConnect';
/**
 * add cart detils to database
 * @param {*} itemId id of item to be loaded in cart
 * @param {*} item details of item
 * @param {*} userId userId 
 * @param {*} quantity quantity of item to be loaded
 */
export const addToCart = (itemId,item,userId,quantity=1)=>dispatch=>{
    dispatch({ type: ADD_TO_CART_PENDING});
    if(userId){
      
        let items={
            id:itemId,
            sellerId:item.sellerId,
            quantity:quantity,
            inCart:true
        }
    db.collection("user").doc(userId).collection('cart').doc(itemId).set(items)
    .then(function() {
        dispatch({ type: ADD_TO_CART_SUCCESS,payload:itemId,item:{...item,quantity:quantity}});
       
    })
    .catch(function(error) {
        dispatch({ type: ADD_TO_CART_FAILED});
        console.error("Error adding document: ", error);
    });
}
    
}
export const removeFromCart=(userId,itemId, dispatch)=>{
    dispatch({type: REMOVE_FROM_CART_PENDING});
     db.collection("user").doc(userId).collection('cart').doc(itemId).delete().then(function() {
      
        dispatch({type: REMOVE_FROM_CART_SUCCESS,payload:itemId});
    }).catch(function(error) {
        console.error("Error removing document: ", error);
        dispatch({type: REMOVE_FROM_CART_FAILED});
    });
    
}
//guest cart
export const addToGuestCart=(itemId,item,quantity=1)=>dispatch=>{
    dispatch(
        {type:ADD_TO_GUEST_CART,
            payload:itemId,
            item:{...item,quantity:quantity}
        }
    )
}
//remove from guest cart
export const removeFromGuestCart=(itemId)=>({
    type:REMOVE_FROM_GUEST_CART,
    payload:itemId
})
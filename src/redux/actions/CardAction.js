import {
    ADD_TO_CART_FAILED,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_PENDING
    } from '../../app/ActionConstants';
import { db } from '../../firebaseConnect';

export const addToCart = (itemId,item,userId,quantity=1)=>dispatch=>{
    dispatch({ type: ADD_TO_CART_PENDING});
    db.collection("user").doc(userId).collection('cart').doc(itemId).set({
        id:itemId,
        item:item,
        quantity:quantity
    })
    .then(function() {
        dispatch({ type: ADD_TO_CART_SUCCESS,payload:itemId});
        console.log("Document written");
    })
    .catch(function(error) {
        dispatch({ type: ADD_TO_CART_FAILED});
        console.error("Error adding document: ", error);
    });
    
}


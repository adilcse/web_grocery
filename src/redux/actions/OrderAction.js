import { db } from "../../firebaseConnect"
import { GET_ORDERS_PENDING, GET_ORDERS_SUCCESS, GET_ORDERS_FAILED } from "../../app/ActionConstants";

export const getOrder=(dispatch,userId)=>{
    dispatch({type:GET_ORDERS_PENDING});
    let orders=[];
    db.collection("orders").where("uid", "==", userId).orderBy("orderedOn", "desc")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          orders.push(doc.data());
        });
        dispatch({type:GET_ORDERS_SUCCESS,payload:orders})
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
        dispatch({type:GET_ORDERS_FAILED,payload:error.code})
    });

}
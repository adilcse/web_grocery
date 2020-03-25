import { db } from "../../firebaseConnect"
import { GET_ORDERS_PENDING, GET_ORDERS_SUCCESS, GET_ORDERS_FAILED } from "../../app/ActionConstants";

export const getOrder=(dispatch,userId)=>{
    dispatch({type:GET_ORDERS_PENDING});
    db.collection("sellerOrders").where("userId", "==", userId).orderBy("orderedOn", "desc").limit(10)
    .onSnapshot(function(querySnapshot) {
        var orders = [];
        querySnapshot.forEach(function(doc) {
            orders.push(doc.data());
        });
        dispatch({type:GET_ORDERS_SUCCESS,payload:orders});
    },function(error) {
        console.log(error)
        dispatch({type:GET_ORDERS_FAILED,payload:error});
    });

}
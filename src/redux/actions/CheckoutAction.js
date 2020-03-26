import {  CHECKOUT,ORDER_PLACE_PENDING,ORDER_PLACE_FAILED,ORDER_PLACE_SUCCESS, EMPTY_CART,ADDRESS_UPDATED } from "../../app/ActionConstants";
import { db } from "../../firebaseConnect";
import firebase from 'firebase';
import { PENDING, NOT_AVAILABLE } from "../../app/constants";
export const CheckoutCart=(cart,total)=>({
type:CHECKOUT,
payload:cart,
total:total
})
/**
 * Place order action places the user's order after confirming all the details
 * @param {*} address 
 * @param {*} order 
 * @param {*} dispatch 
 * @param {'cart','item'} from from where the user is checking out
 */
export const PlaceOrder=(dispatch,address,order,from,userId,cartIds,payMode,sellers)=>{
    console.log(sellers)
    dispatch({type:ORDER_PLACE_PENDING});
    const sellerOrders=getSellerOrders(order,sellers);
    const sellerTotal=(item)=>{
        let tot=0;
        item.forEach(el=>{
            tot+=(el.quantity*el.price)
        });
        return {
            total:tot,
            itemCount:item.length,
            deliveryCharges:0
            };
    }
    if(sellerOrders){
        const batch=db.batch();
        sellerOrders.forEach(ord=>{
            ord.userId=userId;
            ord.total=sellerTotal(ord.items);
            ord.address=address;
            ord.paymentMode=payMode;
            ord.orderedOn=firebase.firestore.FieldValue.serverTimestamp();
            ord.status=PENDING;
            console.log(ord);
            const docRef=db.collection("sellerOrders").doc();
            batch.set(docRef,ord);
        });
        batch.commit().then(res=>{
            dispatch({type:ORDER_PLACE_SUCCESS});
            updateAddress(dispatch,userId,address);
            if(from==='cart')
                emptyCart(dispatch,userId,cartIds);
        }).catch(error=>{
            dispatch({ type: ORDER_PLACE_FAILED,payload:error.message});
        })

    }else{
        dispatch({type:ORDER_PLACE_FAILED,payload:'out of stock'});
    }
}
/**
 * convert order to seller wise order and return seller orders
 * @param {*} order 
 */
const getSellerOrders=(order,AllSellers)=>{
    let sellers=[];
    let sellerOrders=[];
    for(let i=0;i<order.items.length;i++){
        const value=order.items[i];
        if(value.stock===NOT_AVAILABLE){
            return false;
           } 
           const it={
            id:value.id,
            quantity:value.quantity,
            price:value.price,
            accept:true
        }
        const details=AllSellers.find(el=>el.id===value.sellerId);
        if(sellers.includes(value.sellerId)){
            let index=sellerOrders.findIndex(element=>element.sellerId===value.sellerId);
             sellerOrders[index].items.push(it);
         }else{
             let ord={
                 sellerId:value.sellerId,
                 sellerDetails:{name:details.name,
                                address:details.address},
                 items:[it]
             }
             sellers.push(value.sellerId);
             sellerOrders.push(ord);
         }
    }
    return sellerOrders;
}
export const updateAddress=(dispatch,id,address)=>{
    db.collection('user').doc(id).set({
        address:address
    })
    .then(()=>{
         dispatch({type:ADDRESS_UPDATED,payload:address})
    }).catch((err)=>{
        console.log(err)
    })
}
/**
 * empty the cart
 * @param {*} id 
 */
const emptyCart=(dispatch,userId,cartIds)=>{
    console.log(userId,cartIds)
    var writeBatch = db.batch();
    cartIds.forEach(id=>{
        let documentReference = db.collection("user").doc(userId).collection('cart').doc(id);
        writeBatch.delete(documentReference);
    });
    writeBatch.commit().then(function () {
       dispatch({type:EMPTY_CART})
    });
}
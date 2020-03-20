import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';
import { db } from '../../firebaseConnect';
/**
 * display cart items
 * @param {*} props takes item which is on cart
 */
const CartCard=(props)=>{
  const{item}=props;
  const {id}=props.item;
  const {userId}=props;
  const[quant,setQuant]=useState(item.quantity);
 //allow to add only quantity between 1 to 5
 const updateQuant=(element,num)=>{
   if((quant>=5 && num===1)||(quant<=1 && num===-1))
      return;
   else {
     let newQuant=quant+num;
     setQuant(newQuant);
     props.updateQuantity(props.index,newQuant);
     //if user exist then only update user's cart
     if(userId)
        updateQuantityInDB(newQuant,num);
    }
 }
 /**
  * it updates the quantity of items in the database
  * @param {*} q new quantity to update
  * @param {*} num the numbers increased
  */
 const updateQuantityInDB=(q,num)=>{

  db.collection("user").doc(userId).collection('cart').doc(id).update({
   quantity:q
})
.then(function() {
    console.log("Document successfully written!");
   
})
.catch(function(error) {
    console.error("Error writing document: ", error);
     setQuant(quant-num);
});
 }
return(        
    <div className="row no-gutters">
      <div className="col-md-4">
        <img src={item.image} className="card-img" alt={item.name}/>
      </div>
      <div className="col-md-8">
        <div className="card-body" align="left">
        <Link to={`/Product/${id}`}>  <h4 className="card-title">{item.name} </h4> </Link>
          <h4> ₹ {item.price}  only   </h4> 
          Quantity : <button className="btn btn-success" onClick={(element)=>updateQuant(element.target,1)} >+</button> 
          <input className="ct text center" type="text" value={quant} readOnly />
           <button className="btn btn-danger" onClick={(element)=>updateQuant(element.target,-1)}>-</button>
           <button className="btn btn-warning" onClick={()=>props.removeItem(id,props.index)}>Remove</button> 
        </div>
      </div> 
    </div>
  
)
}
export default CartCard;
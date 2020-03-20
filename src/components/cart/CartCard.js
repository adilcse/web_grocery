import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';
import { db } from '../../firebaseConnect';
import UpdateQuantitybutton from '../UpdateQuantityButtons';
/**
 * display cart items
 * @param {*} props takes item which is on cart
 */
const CartCard=(props)=>{
  const{item}=props;
  const {id}=props.item;
  const {userId}=props;
  const {available}=props;
  const[quant,setQuant]=useState(item.quantity);
  const [av,setAv]=useState(false);
  const [checked,setChecked]=useState(false)
  if(!checked){
    setAv(available.find(it=>it===item.id));
    setChecked(true);
  }
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
      <div className="col-md-4" style={{maxHeight:'200px'}}>
        <img src={item.image} className="card-img img-thumbnail rounded mh-100"  alt={item.name}/>
      </div>
      <div className="col-md-8">
        <div className="card-body" align="left">
        <Link to={`/Product/${id}`}>  <h4 className="card-title">{item.name} </h4> </Link>
        {!av?<h3>This item is not deleverable, Please remove to continue</h3>:<></>}
          <h4> ₹ {item.price}  only   </h4> 
          Quantity : <UpdateQuantitybutton quant={quant} updateQuant={updateQuant}>
           <button className="btn btn-warning ml-3" onClick={()=>props.removeItem(id,props.index)}>Remove</button> 
            </UpdateQuantitybutton>
        </div>
      </div> 
    </div>
  
)
}
export default CartCard;
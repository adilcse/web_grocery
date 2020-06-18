import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';
import { db } from '../../firebaseConnect';
import UpdateQuantitybutton from '../UpdateQuantityButtons';
import { Row } from 'react-bootstrap';
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
 const updateQuant=(newQuant)=>{
    setQuant(newQuant);
    props.updateQuantity(props.index,newQuant);
    //if user exist then only update user's cart
    if(userId)
      updateQuantityInDB(newQuant);
  }
 /**
  * it updates the quantity of items in the database
  * @param {*} q new quantity to update
  * @param {*} num the numbers increased
  */
 const updateQuantityInDB=(q)=>{

  db.collection("user").doc(userId).collection('cart').doc(id).update({
  quantity:q
})
.then(function() {
    console.log("Document successfully written!");
   
})
.catch(function(error) {
    console.error("Error writing document: ", error);
    
});
 }
return(        
    <div className="row no-gutters">
      <div className="col-md-4 col-sm-10" style={{height:'18rem'}}>
        <img src={item.image} className="card-img img-thumbnail rounded mh-100"  alt={item.name}/>
      </div>
      <div className="col-md-8">
        <div className="card-body" align="left">
          <Link to={`/Product/${id}`}>  <h4 className="card-title">{item.name} </h4> </Link>
          {!av?<span className="text-danger h4">This item is not deliverable, Please remove to continue</span>:<></>}
          <h4 class="row p-2"> ₹ {item.price}  /- only   </h4> 
          <div className="d-inline h5">
            Quantity :
            </div>
            <UpdateQuantitybutton className="d-inline" quant={quant} stock={item.stock} setQuant={updateQuant}>
              <button className="btn btn-warning ml-4" onClick={()=>props.removeItem(id,props.index)}>Remove</button> 
          </UpdateQuantitybutton>   
          <br/>
          {parseInt(item.stock)<=quant?<Row className="text-danger mt-2">Only {item.stock} items left</Row>:<></>}
          <span className="d-flex h4 mt-4">Item Total : ₹{item.price} x {quant} = ₹ {item.price*quant} /-</span>
        </div>
      </div> 
    </div>
  
)
}
export default CartCard;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';
import UpdateQuantitybutton from '../UpdateQuantityButtons';
import { updateQuantityInDB } from '../../redux/actions/CardAction';
/**
 * display cart items
 * @param {*} props takes item which is on cart
 */
const CartCard=(props)=>{
  const{item}=props;
  const {item_id}=props.item;
  const {user}=props;
  const {available}=props;
  const quant=item.quantity;
  const [av,setAv]=useState(false);
  const [checked,setChecked]=useState(false);

  if(!checked){
    setAv(available.find(it=>it===item.item_id));
    setChecked(true);
  }
 //allow to add only quantity between 1 to 5
 const updateQuant=(element,num)=>{
   if((quant>=5 && num===1)||(quant<=1 && num===-1))
      return;
   else {

     let newQuant=quant+num;
     props.updateQuantity(props.index,newQuant);
     //if user exist then only update user's cart
     if(user)
        updateQuantityInDB(props.dispatch,user,item_id,newQuant);
    }
 }

return(        
    <div className="row no-gutters">
      <div className="col-md-4" style={{maxHeight:'200px'}}>
        <img src={item.image} className="card-img img-thumbnail rounded mh-100"  alt={item.name}/>
      </div>
      <div className="col-md-8">
        <div className="card-body" align="left">
        <Link to={`/Product/${item_id}`}>  <h4 className="card-title">{item.name} </h4> </Link>
        {!av?<h3>This item is not deleverable, Please remove to continue</h3>:<></>}
          <h4> ₹ {item.price}  only   </h4> 
          Quantity : <UpdateQuantitybutton quant={quant} updateQuant={updateQuant}>
           <button className="btn btn-warning ml-3" onClick={()=>props.removeItem(item_id,props.index)}>Remove</button> 
            </UpdateQuantitybutton>
        </div>
      </div> 
    </div>
  
)
}
export default CartCard;
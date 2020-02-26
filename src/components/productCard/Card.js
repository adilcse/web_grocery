import React from 'react';
import { Card as Cardboot ,Button} from 'react-bootstrap';
import './Card.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { CheckoutCart } from '../../redux/actions/CheckoutAction';
// import { addItemsToCart } from '../../redux/reducers/CardReducer';
// import {Link} from 'react-router-dom';

const Card=(props)=>{
 const {source,id}=props;
 let dispatch=useDispatch();
 let cardButton ={
   style :'warning',
   text : 'Add to Cart',
   active : '',
   disabled :false
 }
 
const cart=useSelector(state=>state.addItemsToCart.cart);
//change button color if item is on cart
 if(cart.has(id)){
  cardButton.style = 'success';
  cardButton.active = 'disabled';
  cardButton.disabled= true;
  cardButton.text = 'Added to Cart';
 }
 //add item to cart and proceed to checkout
const checkout=()=>{
  let cart = {
    id:source.id,
    item:source,
    quantity:1
  };
  let total={
    deleveryCharges:0,
    countItems:1,
  }
  total.total=source.price+total.deleveryCharges;
 dispatch(CheckoutCart([cart],total));
}

return(



<Cardboot  className="crd shadow text-center " >
<Link to={`/Product/${id}`}>
<Cardboot.Img variant="top" src={source.image} className="card-img zoom text-center" />
</Link>
  <Cardboot.Body>
    <Link to={`/Product/${id}`}>
    <Cardboot.Title><div className="title  font-weight-bold">{source.name}</div></Cardboot.Title>
    <Cardboot.Text style={{fontSize:'1.5rem'}}>
  <i><small><strike>MRP ₹{Math.floor(parseInt(source.price)*1.1)}</strike></small> </i>₹{source.price}
    </Cardboot.Text>
    </Link>
    </Cardboot.Body>
  <div>
    <Link to='/Checkout/item'>
      <Button variant="primary card-btn " onClick={checkout}>Buy </Button> 
    </Link>
<Button variant={cardButton.style + " card-btn "+cardButton.active} onClick={()=>props.addItem(id,source)} disabled={cardButton.disabled} >{cardButton.text}</Button> 
  </div>
   
 
  <div id="snackbar" hidden>Item Added to Cart</div>
</Cardboot>
 
);

}
export default Card;
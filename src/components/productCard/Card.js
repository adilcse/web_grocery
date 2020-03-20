import React, { useState } from 'react';
import { Card as Cardboot ,Button, Row} from 'react-bootstrap';
import './Card.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AddItemForCheckout } from '../../app/helper/AddItemForCheckout';
import UpdateQuantitybutton from '../UpdateQuantityButtons';
import { MAX_ITEM_ALLOWED } from '../../app/constants';
// import { addItemsToCart } from '../../redux/reducers/CardReducer';
// import {Link} from 'react-router-dom';

const Card=(props)=>{
 const {source,id}=props;
 let dispatch=useDispatch();
 const [quant,setQuant]=useState(1);
 
 let cardButton ={
   style :'warning',
   text : 'Add to Cart',
   active : '',
   disabled :false
 }
 
const cart=useSelector(state=>state.addItemsToCart.cart);
const updateQuant=(target,value)=>{
let newQuant=quant+value;
if(newQuant>0&&newQuant<=MAX_ITEM_ALLOWED){
  setQuant(newQuant);
}
}
//change button color if item is on cart
 if(cart.has(id)){
  cardButton.style = 'success';
  cardButton.active = 'disabled';
  cardButton.disabled= true;
  cardButton.text = 'Added to Cart';
 }
 //add item to cart and proceed to checkout

return(



<Cardboot  className="crd shadow text-center " >
<Link to={`/Product/${id}`} onClick={()=>{document.body.scrollTop = 0; // For Safari
                    document.documentElement.scrollTop = 0;}}  >
<Cardboot.Img variant="top" src={source.image} className="card-img zoom text-center" />
</Link>
  <Cardboot.Body>
    <Link to={`/Product/${id}`}>
    <Cardboot.Title><div className="title  font-weight-bold">{source.name}</div></Cardboot.Title>
    <Cardboot.Text style={{fontSize:'1.5rem'}}>
  <i><small><strike>MRP ₹{source.MRP}</strike></small> </i>₹{source.price}
    </Cardboot.Text>
    </Link>
    <br/>

    </Cardboot.Body>
  <div>
    <Row className='justify-content-center mb-2'><UpdateQuantitybutton quant={quant} className='text-center' updateQuant={updateQuant} /> </Row>
    <Link to='/Checkout/item'>
      <Button variant="primary card-btn " onClick={()=>AddItemForCheckout(dispatch,source,quant)}>Buy </Button> 
    </Link>
<Button variant={cardButton.style + " card-btn "+cardButton.active} onClick={()=>props.addItem(id,source)} disabled={cardButton.disabled} >{cardButton.text}</Button> 
  </div>
   
 
  <div id="snackbar" hidden>Item Added to Cart</div>
</Cardboot>
 
);

}
export default Card;
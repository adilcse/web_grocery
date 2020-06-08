import React, { useState } from 'react';
import { Card as Cardboot ,Button, Row} from 'react-bootstrap';
import './Card.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AddItemForCheckout } from '../../app/helper/AddItemForCheckout';
import UpdateQuantitybutton from '../UpdateQuantityButtons';

const Card=(props)=>{
  const {source,id}=props;
  let dispatch=useDispatch();
  const [quant,setQuant]=useState(1);
  const cart=useSelector(state=>state.addItemsToCart.cart);
  let cardButton ={
    style :'warning',
    text : 'Add to Cart',
    active : '',
    disabled :false
  }

  //change button color if item is on cart
  if(cart.has(id)){
    cardButton.style = 'success';
    cardButton.active = 'disabled';
    cardButton.disabled= true;
    cardButton.text = 'Added to Cart';
  }
  const scrollTop=()=>{
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0;
  }
  //add item to cart and proceed to checkout

return(
  <Cardboot  className="crd shadow text-center " >
    <Link to={`/Product/${id}`} onClick={scrollTop}  >
      <Cardboot.Img variant="top" src={source.image} className="card-img zoom text-center" />
    </Link>
    <Cardboot.Body>
      <Link to={`/Product/${id}`} onClick={scrollTop}>
        <Cardboot.Title><div className="title  font-weight-bold">{source.name}</div></Cardboot.Title>
      </Link>
      {isNaN(source.stock)?<></>:<span className="text-danger h6">Hurry!! only {source.stock} items left</span>}
      <Cardboot.Text style={{fontSize:'1.5rem'}}>
        <i><small><strike>MRP ₹{source.MRP}</strike></small> </i>₹{source.price}
      </Cardboot.Text>
      <br/>
    </Cardboot.Body>
    <div>
      <Row className='justify-content-center mb-2'>
        <UpdateQuantitybutton stock={source.stock} quant={quant} className='text-center' setQuant={setQuant} /> 
      </Row>
      <Link to='/Checkout/item'>
        <Button variant="primary card-btn " onClick={()=>AddItemForCheckout(dispatch,source,quant)}>Buy </Button> 
      </Link>
      <Button variant={cardButton.style + " card-btn "+cardButton.active} onClick={()=>props.addItem(id,source,quant)} disabled={cardButton.disabled} >{cardButton.text}</Button> 
    </div>
    <div id="snackbar" hidden>Item Added to Cart</div>
  </Cardboot>
);

}
export default Card;
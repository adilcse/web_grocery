import React from 'react';
import { Card as Cardboot ,Button} from 'react-bootstrap';
import './Card.css';
// import {Link} from 'react-router-dom';

const Card=(props)=>{
 const {source}=props;

 let cardButton ={
   style :'warning',
   text : 'Add to Cart',
   active : '',
   disabled :false
 }
 if(source.inCart){
  cardButton.style = 'success';
  cardButton.active = 'disabled';
  cardButton.disabled= true;
  cardButton.text = 'Added to Cart';
 }


return(



<Cardboot  className="crd shadow text-center" >
<Cardboot.Img variant="top" src={source.imageurl} className="card-img zoom" />

  <Cardboot.Body>
    <Cardboot.Title><div className="title  font-weight-bold">{source.name}</div></Cardboot.Title>
    <Cardboot.Text>
   <h3><i><small><strike>MRP ₹{Math.floor(parseInt(source.price)*1.1)}</strike></small> </i>₹{source.price}</h3>
    </Cardboot.Text>
  <div className="">
    <Button variant="primary card-btn ">Buy </Button> 
<Button variant={cardButton.style + " card-btn "+cardButton.active} onClick={()=>props.addItem(source.id)} disabled={cardButton.disabled} >{cardButton.text}</Button> 
  </div>
   
  </Cardboot.Body>
  <div id="snackbar" hidden>Item Added to Cart</div>
</Cardboot>
 
);

}
export default Card;
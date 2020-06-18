import React, { useState } from 'react';
import {Button, Alert, Container} from 'react-bootstrap';
import './item.css';
import ProductCards from "../../components/productCard/ProductCards";
import '../../assets/images/img2.jpeg';

import { useDispatch, useSelector } from 'react-redux';
import { addToCart,addToGuestCart } from '../../redux/actions/CardAction';
import { AddItemForCheckout } from '../../app/helper/AddItemForCheckout';
import {Redirect, Link } from 'react-router-dom';
import { getItemsByTime } from '../../app/helper/getItemsByTime';
import UpdateQuantitybutton from '../UpdateQuantityButtons';

const Item =(props)=>{
    const {name,price,description,image,quantity,catagory,MRP,stock}=props.item;
    const itemId=props.id;
    const userId=useSelector(state=>state.userLogin.userId);
    const [newItems,setNewItems]=useState(null);
    const [showMsg,setShowMessage]=useState(false); 
    const dispatch = useDispatch();
    const products=useSelector(state=>state.sellers.products);
    const [quant,setQuant]=useState(1);
    let addToCartButton ={
        style :'warning',
        text : 'Add to Cart',
        active : '',
        disabled :false
      }
      
     const cart=useSelector(state=>state.addItemsToCart.cart);
     const [buy,setBuy]=useState(false);
     //change button color if item is on cart
      if(cart.has(itemId)){
       addToCartButton.style = 'success';
       addToCartButton.active = 'disabled';
       addToCartButton.disabled= true;
       addToCartButton.text = 'Added to Cart';
      }

      const addItem = () => {
        if(userId)
        dispatch(addToCart(itemId,props.item,userId,quant));
    else
    dispatch(addToGuestCart(itemId,props.item));
    }
    const ErrorMessage= ()=>{
        if(showMsg)
            return (  
                <Alert variant='danger' onClose={()=>setShowMessage(false)} dismissible >
                    <Alert.Heading>Please Login First</Alert.Heading>
                </Alert>
            )
        return <> </>;    
    }
    const checkout=()=>{
        AddItemForCheckout(dispatch,props.item,quant);
        setBuy(true);
         
    }
    if(buy){
        return(<Redirect to='/checkout/item'/>)
    }
    const NewArival=()=>{
            if(!newItems){
             getItemsByTime(products,7).then(res=>{
          setNewItems(res);    
        }
        )
        .catch(()=>setNewItems(true));
        return(<></>)
        }
        else{
          
            return(<>
                <div className="alert alert-dark cntnt"><h3>New arriavals</h3></div>
                <div><i className="dropdown-toggle"></i></div>
                <div className="flexcss sm-h-60">
                 <div className="photobanner">
               {newItems.map(item=>{
                   return <Link key={item.id} onClick={()=>{document.body.scrollTop = 0; // For Safari
                    document.documentElement.scrollTop = 0;}}   to={`/product/${item.id}`}>
                   <img   src={item.image} alt="img1" width='250px' height='250px' />
                   </Link>
               })}    
            </div>
            </div>
            </>
            )
        }
       
    }
    
    return(
        <div>
            <ErrorMessage/> 
            <div className="container itm mh-100">
                <div className="row">
                    <div className="col-md-1 bkstyl" ></div>
                    <div className="col-md-5" style={{height:'350px'}}>
                        <img src={image} style={{width:'100%',height:'100%',maxWidth:'400px',maxHeight:'350px'} }alt={name}></img>
                    </div>
                    <div className="col-md-4">
                        <div className="row">
                            <span className="gFont1 h3">{name}  {quantity}</span>
                        </div>
                        <div className="row">
                            <span className="gFont1 h3"><i><small><strike>MRP ₹{MRP}</strike></small> </i> ₹{price} /- only</span>
                        </div>
                        {isNaN(stock)?<></>:<div className="text-danger h6">Hurry!! only {stock} items left</div>}
                        <div className=" b text-center mt-3">
                            <UpdateQuantitybutton stock={props.item.stock} className="m-auto" quant={quant} setQuant={setQuant}/>
                            <div className="mt-2 text-center">
                                    <Button variant="primary card-btn d-inline" size="lg" onClick={checkout} > Buy</Button>
                                    <Button size="lg" variant={addToCartButton.style + " card-btn d-inline"+addToCartButton.active} 
                                        onClick={()=>addItem()}
                                        disabled={addToCartButton.disabled} >
                                        {addToCartButton.text}
                                    </Button> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Container className=" text-left h-50 mw-75">
                <span className="  mh-75 text-justify h4 gFont2">
                <span className="h2">Description :</span> {description}</span>
            </Container>
            <NewArival/>
            <div className="alert alert-dark cntnt"><h3>Shop More</h3></div>
            <div><i className="dropdown-toggle"></i></div>
            <ProductCards catagory={catagory} max={3}/>
        </div>
    )
}
export default Item;
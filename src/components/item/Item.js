import React, { useState } from 'react';
import {Button, Alert} from 'react-bootstrap';
import './item.css';
import ProductCards from "../../components/productCard/ProductCards";
import '../../assets/images/img2.jpeg';

import { useDispatch, useSelector } from 'react-redux';
import { addToCart,addToGuestCart } from '../../redux/actions/CardAction';
import { AddItemForCheckout } from '../../app/helper/AddItemForCheckout';
import {Redirect, Link } from 'react-router-dom';
import { getItemsByTime } from '../../app/helper/getItemsByTime';

const Item =(props)=>{
    const {name,price,description,image,quantity,catagory}=props.item;
    const itemId=props.id;
    const userId=useSelector(state=>state.userLogin.userId);
    const [newItems,setNewItems]=useState(null);
    const [showMsg,setShowMessage]=useState(false); 
    const dispatch = useDispatch();
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
        dispatch(addToCart(itemId,props.item,userId));
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
        AddItemForCheckout(dispatch,props.item);
        setBuy(true);
         
    }
    if(buy){
        return(<Redirect to='/checkout/item'/>)
    }
    const NewArival=()=>{
        console.log('new',newItems );
          if(!newItems){
             getItemsByTime(2).then(res=>{
            setNewItems(res);  
        }
        )
        .catch(()=>setNewItems(true));
        return(<></>)
        }
        else{
            console.log(newItems)
            return(<>
                <div className="alert alert-dark cntnt"><h3>New arriavals</h3></div>
                <div><i className="dropdown-toggle"></i></div>
                <div className="flexcss">
                 <div className="photobanner">
               {newItems.map(item=>{
                   return <Link to={`/product/${item.id}`}>
                   <img  key={item.id} src={item.data.image} alt="img1" width='250px' height='250px' />
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
        <div className="container itm">
            <div className="row">
                <div className="col-md-1 bkstyl" ></div>
            <div className="col-md-5">
                <img src={image} style={{width:'100%',height:'100%',maxWidth:'400px',maxHeight:'350px'} }alt={name}></img>
            </div>
            <div className="col-md-4">
                <div className="row">
                <h2 className="gFont1">{name} , {quantity}</h2>
                </div>
                <div className="row">
                <h3 className="gFont1">Price : Rs.{price}</h3>
                </div>
                <div className="row text-left">
                <p className="gFont2">Description : {description}</p>
                </div>
            </div>
            <div className="col-md-2 buybackground">
                <div className="row"></div>
                <div className="row cntr">
                <div className="col-sm-3"></div>
                <div className="col-sm-6">
                <div className=" btn-group-vertical ">
               
                  <Button variant="primary card-btn " onClick={checkout} > Buy</Button>
             
                <Button variant={addToCartButton.style + " card-btn "+addToCartButton.active} 
                    onClick={()=>addItem()}
                    disabled={addToCartButton.disabled} >
                    {addToCartButton.text}
                </Button> 
                </div>
                </div>
                <div className="col-sm-3"></div>
                </div>
                <div className="row"></div>
                
            </div>
            </div>
        </div>

        <NewArival/>
        <div className="alert alert-dark cntnt"><h3>Shop More</h3></div>
        <div><i className="dropdown-toggle"></i></div>
        <ProductCards catagory={catagory}/>
        
        
        </div>
    )
}
export default Item;
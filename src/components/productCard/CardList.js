import React,{useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {addToCart, addToGuestCart} from '../../redux/actions/CardAction';
import Card from './Card';
import { Alert } from 'react-bootstrap';

/**
 * display numbers of item in the screen 
 * @param {array} props source  array of item
 */
const CardList =(props)=>{
    const dispatch = useDispatch();
    const userid=useSelector(state=>state.userLogin.userId)
    const [showMsg,setShowMessage]=useState(false); 
    const source=props.items;

 const onItemAdded = (itemId,item,quant,userId=userid) => {
      if(userId)
        dispatch(addToCart(itemId,item,userId,quant));
    else
    dispatch(addToGuestCart(itemId,item,quant));
       
  }
  /**
   * loads item from database
   */
   
    const ErrorMessage= ()=>{
        if(showMsg)
            return (  
                <Alert variant='danger' onClose={()=>setShowMessage(false)} dismissible >
                    <Alert.Heading>Please Login First</Alert.Heading>
                </Alert>
            )
        return <> </>;    
    }

 if(source.length>0){
return (
        <div className="container ">
           <ErrorMessage/>
            <div className="row text-center">
            {
                source.map((item) =>{   
               return <Card source={item} id={item.id} key = {item.id} addItem={onItemAdded} />
                } )
            }
            </div>
        </div>
    )}
    else{
        
        return(
            <h1>
                Sorry!!!
                No Items Found.
            </h1>
        )
    }
 }   



export default CardList; 
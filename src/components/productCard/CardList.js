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
    const user=useSelector(state=>state.userLogin)
    const [showMsg,setShowMessage]=useState(false); 
    const source=props.items;
 const onItemAdded = (itemId,item,quant) => {
      if(user.id)
        addToCart(dispatch,itemId,item,user,quant);
    else
    addToGuestCart(dispatch,itemId,{...item,item_id:item.id},quant);
       
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
    else if(props.loaded){
        return(
            <h1>
                Sorry!!!
                No Items Found.
            </h1>
        )
    }else{
        return(<h1>Loading...</h1>)
    }
 }   



export default CardList; 
import React,{useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {addToCart, addToGuestCart} from '../../redux/actions/CardAction';
import Card from './Card';
import Loading from '../Loading';
import { Alert } from 'react-bootstrap';
import { getItemsByCatagory } from '../../app/helper/getItemsByCatagory';
let loading=false;
let type=null;
let source=[];
/**
 * display numbers of item in the screen by catagory
 * @param {'all','vegetables','fruits','oil','masala'} props catagory of items
 */
const ProductCards =(props)=>{
    const dispatch = useDispatch();
    const userid=useSelector(state=>state.userLogin.userId)
    const[loaded,setLoaded]=useState(false); 
    const [showMsg,setShowMessage]=useState(false); 
 const onItemAdded = (itemId,item,userId=userid) => {
      if(userId)
        dispatch(addToCart(itemId,item,userId));
    else
    dispatch(addToGuestCart(itemId,item));
       // setShowMessage(true);
  }
  /**
   * loads item from database
   */
    const loadItem=(catagory)=>{    
        if(!loading){
           loading=true;
           getItemsByCatagory(catagory).then((res)=>{
            source=res;
            loading=false;
            setLoaded(true); 
           }
           ).catch(e=>{
            loading=false;
            setLoaded(true);
           })
           
      }
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
    //if catagory is changed it loads thee data
    if(type!==props.catagory){
        type=props.catagory;
        loadItem(props.catagory);
        setLoaded(false);
    }
   if(!loaded && source.length<1){
    loadItem(props.catagory);
    return(
       <Loading size={120}/>
    )
}
else if(source.length>0){
return (
        <div className="container ">
           <ErrorMessage/>
            <div className="row text-center">
            {
                source.map((item) =>{     
                    return <Card source={item.data} id={item.id} key = {item.id} addItem={onItemAdded} />
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



export default ProductCards; 
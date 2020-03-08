import React, { useState } from 'react';
import { useParams } from 'react-router';
import Loading from '../components/Loading';
import { db } from '../firebaseConnect';
import Item from '../components/item/Item';
import { getItemFromDb } from '../app/helper/getItemFromDb';
let previousId;
 const Product=()=>{
   const {id}=useParams();
   const [loaded,setLoaded]=useState(false);
   const [item,setItem]=useState({})
   const getProduct=(itemId)=>{
   
    var query = db.collection("products").doc(itemId);
    getItemFromDb(query).then(result=>{
        if(result){
            setItem(result);
        }else{
            setItem(false);
        }
    });
   
    setLoaded(true);
   }
   if(!loaded ||id!==previousId){  
       previousId=id;
      getProduct(id);
      return(
          <Loading size={120}/>
      )
    }
   else{
       if(item)
    return(
        <Item item={item} id={id}/>
    ) 
    else
    return(
        <h2>
            Sorry !! Item Not Found!!!
        </h2>
    )
}
}
export default Product;
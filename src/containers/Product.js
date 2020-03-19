import React, { useState } from 'react';
import { useParams } from 'react-router';
import Loading from '../components/Loading';
import Item from '../components/item/Item';
import _ from 'lodash'
import { useSelector } from 'react-redux';
let previousId;
document.title='product';
 const Product=()=>{
   const {id}=useParams();
   const [loaded,setLoaded]=useState(false);
   const [loading,setLoading]=useState(true)
   const [item,setItem]=useState({})
   const sellers=useSelector(state=>state.sellers);

   const getProduct=(itemId)=>{
   let prod=_.find(sellers.products, function(obj) { return obj.id===itemId});
   setItem(prod);
    setLoaded(true);
   }
   if(!loaded ||id!==previousId || (loading&&sellers.productLoaded)){  
    
       previousId=id;
      getProduct(id);
      if(sellers.productLoaded)
        setLoading(false)
      return(
          <Loading size={120}/>
      )
      
    }else if(!sellers.productLoaded){
        return(
            <Loading size={120}/>
        ) 
    }
   else{
       if(item){
        document.title=item.name?item.name:'product';
        return(
        <Item item={item} id={id}/>
    ) }
    else
    return(
        <h2>
            Sorry !! Item Not Found!!!
        </h2>
    )
}
}
export default Product;
import React,{useState} from 'react';

import Loading from '../Loading';

import CardList from './CardList';
import { useSelector } from 'react-redux';
let type=null;
let source=[];
/**
 * display numbers of item in the screen by catagory
 * @param {'all','vegetables','fruits','oil','masala'} props catagory of items
 */
const ProductCards =(props)=>{

    const[loaded,setLoaded]=useState(false); 
    const sellers=useSelector(state=>state.sellers);
  /**
   * loads item from database
   * @param {catagory} catagory to dispay
   */
    const loadItem=(catagory)=>{   
        if(!sellers.productLoading && sellers.productLoaded){
           if(catagory==='all'){
            source=sellers.products;
           }else{
               source=[];
            sellers.products.forEach(element => {
                if(element.catagory.includes(catagory)){
                    source.push(element);
                }
            });

           }
           setLoaded(true);
      }
      
    }

    //if catagory is changed it loads the data
    if(type!==props.catagory && sellers.loaded){
        type=props.catagory;
        loadItem(props.catagory); 
    }
   if(sellers.productLoaded && !loaded){
    loadItem(props.catagory);
    return(
       <Loading size={120}/>
    )
}
return <CardList items={source}/>
}



export default ProductCards; 
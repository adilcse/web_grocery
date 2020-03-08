import React,{useState} from 'react';

import Loading from '../Loading';

import { getItemsByCatagory } from '../../app/helper/getItemsByCatagory';
import CardList from './CardList';
let loading=false;
let type=null;
let source=[];
/**
 * display numbers of item in the screen by catagory
 * @param {'all','vegetables','fruits','oil','masala'} props catagory of items
 */
const ProductCards =(props)=>{

    const[loaded,setLoaded]=useState(false); 

  /**
   * loads item from database
   * @param {catagory} catagory to dispay
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
  
    //if catagory is changed it loads the data
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
return <CardList items={source}/>
}



export default ProductCards; 
import React,{useState} from 'react';

import Loading from '../Loading';
import _ from 'lodash';
import CardList from './CardList';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
let type=null;
/**
 * display numbers of item in the screen by catagory
 * @param {'all','vegetables','fruits','oil','masala'} props catagory of items
 */
const ProductCards =(props)=>{
    let{max}=props;
    max=max?max:10;
    const[loaded,setLoaded]=useState(false); 
    const sellers=useSelector(state=>state.sellers);
    const [allItems,setAllItems]=useState([])
    const [loadMore,setLoadMore]=useState(true);
  /**
   * loads item from database
   * @param {catagory} catagory to dispay
   */
    const loadItem=(catagory)=>{  
        let source=[]; 
        if(!sellers.productLoading && sellers.productLoaded){
           if(!catagory){
            source=sellers.products;
           }else{
               source=[];
            sellers.products.forEach(element => {
                let found=_.intersection(catagory,element.catagory);
                if(found.length>0){
                    source.push(element);
                    setLoadMore(true);
                }else{
                    setLoadMore(false);
                }}
            );      
           }
           source=source.slice(0,max);
           setAllItems(source);
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
const loadButton=()=>{
    if(sellers.loaded && sellers.products.length>allItems.length && loadMore)
    {return <Button variant="primary" onClick={()=>{
        max+=5;
        loadItem(props.catagory);
    }}>Load more</Button>
}else{
    return <></>
}
}
return (
    <div className='mb-5'>
        <CardList items={allItems}/>
      {loadButton()}
    </div>
    )
}



export default ProductCards; 
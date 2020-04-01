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
let oldProductSize=0;

const ProductCards =(props)=>{
    
    const [max,setMax]=useState(props.max?props.max:10)
    const[loaded,setLoaded]=useState(false); 
    const sellers=useSelector(state=>state.sellers);
    const products=useSelector(state=>state.sellers.products);
    const [allItems,setAllItems]=useState([])
    const [loadMore,setLoadMore]=useState(true);
    const [loading,setLoading]=useState(false);
  /**
   * loads item from database
   * @param {catagory} catagory to dispay
   */
    const loadItem=(catagory)=>{  
        setLoading(true);
        let source=[]; 
        if(!sellers.productLoading && sellers.productLoaded){
           if(!catagory){
            source=products;
           }else{
               source=[];
                products.forEach(element => {
                let found=_.intersection(catagory,element.catagory);
                if(found.length>0){
                    source.push(element);
                    setLoadMore(true);
                }else{
                    setLoadMore(false);
                }}
            );      
           }
           setAllItems(source.slice(0,max));
           setLoaded(true);
           setLoading(false)
      }
      
    }
    //if catagory is changed it loads the data
    if(type!==props.catagory && sellers.loaded){
        type=props.catagory;
        loadItem(props.catagory); 
    }
   if((sellers.productLoaded && !loaded)||oldProductSize!==products.length ){
    loadItem(props.catagory);
    oldProductSize=products.length;
    return(
       <Loading size={120}/>
    )
}

const loadButton=()=>{
    if(sellers.loaded && products.length>allItems.length && loadMore)
    {return <Button variant="primary" onClick={()=>{
        setMax(max+5);
        loadItem(props.catagory);
    }}>Load more</Button>
}else{
    return <></>
}
}

return (
    <div className='mb-5'>
        <CardList items={allItems} loaded={sellers.productLoaded}/>
        {loading?<Loading size={100}/>:<></>}
      {loadButton()}
    </div>
    )
}



export default ProductCards; 
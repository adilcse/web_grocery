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
    const [source,setSource]=useState([]);
    const [loadItems,setLoadItems]=useState(false);
    /**
   * loads item from database
   * @param {catagory} catagory to dispay
   */
    const loadItem=(catagory,maximum=max)=>{  
        setLoading(true);
        if(!sellers.productLoading && sellers.productLoaded){
            if(!catagory) {
            setSource(products);
            } else {
                setSource(products.filter(el=>{
                    const found=_.intersection(catagory,el.catagory);
                    if(found.length>0){
                        setLoadMore(true);
                        return true;
                    }else{
                        setLoadMore(false);
                        return false;
                    }
                }));   
            }
            setLoadItems(true);
            displayItems(source,maximum)
            setLoaded(true);
            setLoading(false)
        }
    }
    //display items
    const displayItems=(Nsource=source,maximum=max)=>{
        setAllItems(Nsource.slice(0,maximum));
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

    if(loadItems) {
        displayItems();
        setLoadItems(false);
    }

const LoadButton=()=>{
    if(sellers.loaded && source.length>allItems.length && loadMore)
        {
            return <Button variant="primary" onClick={()=>{
                const Nmax=max+5;
                displayItems(source,Nmax);
                setMax(Nmax);
            }}>Load more</Button>
    } else {
        return <></>
    }
}

return (
    <div className='mb-5'>
        <CardList items={allItems} loaded={sellers.productLoaded}/>
        {loading?<Loading size={100}/>:<></>}
        {<LoadButton/>}
    </div>
    )
}



export default ProductCards; 
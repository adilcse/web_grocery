import React, { useState } from 'react';
import CatagoryCard from './CatagoryCard';
import { getCatagories } from '../../app/helper/getCatagories';
let catagories=[];
const CatagoryList=(props)=>{
    let [loaded,setLoaded]=useState(false);
    if(!loaded){
        getCatagories().then(res=>{
            catagories=res;
            setLoaded(true);
        }).catch(res=>{
            setLoaded(true);
        })
    }
return(
    <>
    {catagories.map((item,index)=>{
        return  <CatagoryCard item={item.data} key={index}/>
    })}
    </>
)
}
export default CatagoryList;
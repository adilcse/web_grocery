import React, { useState } from "react";
import ProductCards from "../components/productCard/ProductCards";
import Slider from "../components/Slider";
import CatagoryList from "../components/catagory/CatagoryList";

import { useSelector, useDispatch } from "react-redux";
import { getUserLocation } from "../redux/actions/LocationAction";
import { Alert } from "react-bootstrap";
let loaded=false;
const Home=()=>{
    const dispatch=useDispatch();
    const location=useSelector(state=>state.UserLocation)
    if(!loaded){
        loaded=true;
    getUserLocation(dispatch);
  }
    return(
        <>
        
        {location.addressPending?<h2>Loading.....</h2>:(location.addressError?<h2>something went wrong please refresh the page</h2>:
             <Alert variant='primary'>
                <h4>
                 you are in : {location.address}
                </h4>
           </Alert>)}
        
       
        <Slider/>
        <CatagoryList className='mt-3'/>
        <h2 className='text-left'>Catagory : ALL</h2>
        <ProductCards catagory='all'/>
        </>
    )
}
export default Home;
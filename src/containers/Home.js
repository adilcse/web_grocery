import React from "react";
import ProductCards from "../components/productCard/ProductCards";
import Slider from "../components/Slider";
import CatagoryList from "../components/catagory/CatagoryList";

import { useSelector } from "react-redux";

import { Alert } from "react-bootstrap";
/**
 * home user page which dispays adds and some product to the user.
 */
document.title='Home';
const Home=()=>{
   
    const location=useSelector(state=>state.UserLocation)
    return(
        <>
        
        {location.addressPending?<h2>Loading.....</h2>:(location.addressError?<h2>something went wrong please refresh the page</h2>:
             <Alert variant='primary'>
                <h4>
                 My Location: {location.address}
                </h4>
           </Alert>)}
        
       
        <Slider/>
        <CatagoryList className='mt-3'/>
        <h2 className='text-left'>Catagory : ALL</h2>
        <ProductCards max={10}/>
        </>
    )
}
export default Home;
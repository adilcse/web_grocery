import React, { useState } from "react";
import ProductCards from "../components/productCard/ProductCards";
import Slider from "../components/Slider";
import CatagoryList from "../components/catagory/CatagoryList";

import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import { HOME, CHANGE_LOCATION } from "../app/constants";
import SelectLocation from "../components/SelectLocation";
/**
 * home user page which dispays adds and some product to the user.
 */
document.title='Home';
const Home=()=>{
    const [page,setPage]=useState(HOME)
    const location=useSelector(state=>state.UserLocation);

if(page===HOME)
    return(
        <>
        {location.addressPending?<h2>Loading.....</h2>:(location.addressError?<h2>something went wrong please refresh the page</h2>:
            (location.locationError?<Alert variant='danger'>
                <h4>{location.locationError.code===1?'PLEASE ENABLE GPS':location.locationError.message}</h4>
                <h5 onClick={()=>setPage(CHANGE_LOCATION)} style={{ cursor: 'pointer',  textDecoration: 'underline'}}>
                set Location
                </h5>
            </Alert>
            :<Alert variant='primary'>
                <h4>
                <span style={{color:'black',fontWeight:'bold'}}> My Location:</span>  {location.address}
                </h4>
                <h5 onClick={()=>setPage(CHANGE_LOCATION)} style={{ cursor: 'pointer',  textDecoration: 'underline'}}>
                    change
                    </h5>
            </Alert>)
            )}
            
        <Slider/>
        <CatagoryList className='my-3 mx-1'/>
        <h2 className='text-left'>Catagory : ALL</h2>
        <ProductCards max={10}/>
        </>
    )
    else{
        return(
            <SelectLocation changePage={setPage} location={location}/>
        )
    }
}
export default Home;
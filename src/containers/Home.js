import React from "react";
import ProductCards from "../components/productCard/ProductCards";
import Slider from "../components/Slider";
import CatagoryList from "../components/catagory/CatagoryList";
const Home=()=>{
    return(
        <>
        <Slider/>
        <CatagoryList className='mt-3'/>
        <h2 className='text-left'>Catagory : ALL</h2>
        <ProductCards catagory='all'/>
        </>
    )
}
export default Home;
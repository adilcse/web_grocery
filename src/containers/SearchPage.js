import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { searchProductInDb } from "../app/helper/searchProductInDb";
const SearchPage=()=>{
let {id} = useParams();
const [searchItems,setSearchItems]=useState([]);
const [loaded,setLoaded]=useState(false);
let {results,updated}=useSelector(state=>state.searchProduct);
if(!updated && !loaded){
searchProductInDb(id).then(res=>{
    setSearchItems(res);
    setLoaded(true);
})
}else if(updated && !loaded){

    setSearchItems(results);
    setLoaded(true);
}
console.log(searchItems );
return(
<h2>Search result : {id}</h2>
)
}
export default SearchPage;
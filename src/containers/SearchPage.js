import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { searchProductInDb } from "../app/helper/searchProductInDb";
import CardList from "../components/productCard/CardList";
let oldId=null;
const SearchPage=()=>{
let {id} = useParams();
const [searchItems,setSearchItems]=useState([]);
const [loaded,setLoaded]=useState(false);
let {results,updated}=useSelector(state=>state.searchProduct);
console.log(oldId,id)
if((!updated && !loaded )|| oldId!==id){
searchProductInDb(id).then(res=>{
    console.log('loading from db')
    oldId=id;
    setLoaded(true);
    setSearchItems(res);
  
})
}else if(updated && !loaded){
    console.log('loading from store');
    setLoaded(true);
    setSearchItems(results);
  
}
console.log(searchItems );
return(
    <div>
<h2>Search result : {id}</h2>
<CardList items={searchItems}/>
</div>
)
}
export default SearchPage;
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { searchProductInDb } from "../app/helper/searchProductInDb";
import CardList from "../components/productCard/CardList";
let oldId=null;
document.title='Search';
const SearchPage=()=>{

let {id} = useParams();
const [searchItems,setSearchItems]=useState([]);
const [loaded,setLoaded]=useState(false);
let {results,updated}=useSelector(state=>state.searchProduct);

if((!updated && !loaded )|| oldId!==id){
searchProductInDb(id).then(res=>{

    oldId=id;
    setLoaded(true);
    setSearchItems(res);
  
})
}else if(updated && !loaded){
 
    setLoaded(true);
    setSearchItems(results);
  
}

return(
    <div>
<h2>Search result : {id}</h2>
<CardList items={searchItems}/>
</div>
)
}
export default SearchPage;
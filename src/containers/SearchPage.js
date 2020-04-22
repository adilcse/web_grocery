import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { searchProductInDb } from "../app/helper/searchProductInDb";
import CardList from "../components/productCard/CardList";
import Loading from "../components/Loading";
let oldId=null;
document.title='Search';
/**
 * search page display the search item results
 */
const SearchPage=()=>{

let {id} = useParams();
const [searchItems,setSearchItems]=useState([]);
const [loaded,setLoaded]=useState(false);
let {results,updated}=useSelector(state=>state.searchProduct);
const {products,productLoaded,productLoading}=useSelector(state=>state.sellers)

if(((!updated && !loaded )|| oldId!==id) && productLoaded){
let res=searchProductInDb(products,id)
    oldId=id;
    setLoaded(true);
    setSearchItems(res);

}else if(updated && !loaded){
 
    setLoaded(true);
    setSearchItems(results);
  
}
if(productLoading || !loaded)
    return(
        <Loading size={100}/>
    )
    else
        return(
            <div>
        <h2>Search result : {id}</h2>
        <CardList items={searchItems}/>
        </div>
        )
}
export default SearchPage;
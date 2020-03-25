import { GET_SELLERS_PENDING, GET_SELLERS_SUCCESS, GET_ALL_PRODUCT_PENDING, GET_ALL_PRODUCT_SUCCESS } from "../../app/ActionConstants"

import algoliasearch from "algoliasearch";
import {ALGOLIA_SELLER_INDEX, AVAILABLE, NOT_AVAILABLE, RADIUS_IN_KM} from '../../app/constants';
import { getItemsByIds } from "../../app/helper/getItemsByIds";
const client = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID,process.env.REACT_APP_ALGOLIA_API_KEY);
const index = client.initIndex(ALGOLIA_SELLER_INDEX);
/**
 * get all the sellers within 10kms
 * @param {*} dispatch 
 * @param {*} location 
 */
export const getNearbySeller=(dispatch,location)=>{
dispatch({type:GET_SELLERS_PENDING})
index.search('', {
    aroundLatLng: location.latitude+','+location.longitude,
    aroundRadius: RADIUS_IN_KM*1000  // in meters
  }).then(({ hits }) => {
    let ids=[];
    hits.forEach(item=>{
        ids.push(item.objectID);
    })
    dispatch({type:GET_SELLERS_SUCCESS,payload:hits})
   getProductsOfSellers(dispatch,ids);
  });
}

export const getProductsOfSellers=(dispatch,ids)=>{
    dispatch({type:GET_ALL_PRODUCT_PENDING});
    let sellerItems=getItemsByIds(ids,'sellerItems','sellerId');
    let products=[];
    sellerItems.then(res=>{
        res.forEach(item=>{
            products.push({...item,stock:item.stock>0?AVAILABLE:NOT_AVAILABLE})
        })
      
       dispatch({type:GET_ALL_PRODUCT_SUCCESS,payload:products})
    })
}
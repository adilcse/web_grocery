import { GET_SELLERS_PENDING, GET_SELLERS_SUCCESS, GET_ALL_PRODUCT_PENDING, GET_ALL_PRODUCT_SUCCESS } from "../../app/ActionConstants"
import * as geofirex from 'geofirex';
import { firebase, db } from "../../firebaseConnect";
import {AVAILABLE, NOT_AVAILABLE, RADIUS_IN_KM} from '../../app/constants';
import { getItemsByIds } from "../../app/helper/getItemsByIds";

const geo = geofirex.init(firebase);
/**
 * get all the sellers within 10kms
 * @param {*} dispatch 
 * @param {*} location 
 */
export const getNearbySeller=(dispatch,location)=>{
dispatch({type:GET_SELLERS_PENDING})
console.log('getting sellers')
const sellers=db.collection('seller');
const center = geo.point( location.latitude,location.longitude);
const radius = RADIUS_IN_KM;
const field = 'position';
const query = geo.query(sellers).within(center, radius, field);
console.log(query)
geofirex.get(query).then(res=>{
    console.log(res);
    const ids=[];
    res.forEach(el=>{
        ids.push(el.id
            );
    })
    dispatch({type:GET_SELLERS_SUCCESS,payload:res})
    getProductsOfSellers(dispatch,ids);
})
}

export const getProductsOfSellers=(dispatch,ids)=>{
    dispatch({type:GET_ALL_PRODUCT_PENDING});
    let sellerItems=getItemsByIds(ids,'sellerItems','sellerId');
    let products=[];
    sellerItems.then(res=>{
        res.forEach(item=>{
            products.push({...item,stock:(item.stock>0?(item.stock>10?AVAILABLE:item.stock):NOT_AVAILABLE)})
        })
      
       dispatch({type:GET_ALL_PRODUCT_SUCCESS,payload:products})
    })
}

import { SET_CURRENT_LOCATION_PENDING, SET_CURRENT_LOCATION_SUCCESS, SET_CURRENT_ADDRESS_PENDING, SET_CURRENT_ADDRESS_SUCCESS, SET_CURRENT_ADDRESS_FAILED, SET_CURRENT_LOCATION_FAILED, GET_ALL_PRODUCT_FAILED, GET_SELLERS_FAILED } from "../../app/ActionConstants";
import { getAddressByLatLng } from "../../app/helper/getAddressByLatLng";
import { getNearbySeller } from "./GetProductAction";
/**
 * get user's location by GPS
 * @param {*} dispatch 
 */
export const getUserLocation=(dispatch)=>{
    if (navigator.geolocation) {
        dispatch({type:SET_CURRENT_LOCATION_PENDING});
        navigator.geolocation.getCurrentPosition(position=>{
            console.log(position)
                dispatch({type:SET_CURRENT_LOCATION_SUCCESS,payload:position.coords});
                getNearbySeller(dispatch,position.coords)
                dispatch({type:SET_CURRENT_ADDRESS_PENDING});
                getAddressByLatLng(position.coords).then(address=>{   
                address?dispatch({type:SET_CURRENT_ADDRESS_SUCCESS,payload:address.formatted_address})
                :dispatch({type:SET_CURRENT_ADDRESS_FAILED});   
                });
        },error=>{
            console.log(error);
            let message='something went wrong';
            if(error.code===2)
                message='Network failed';
            else if(error.code===1)
                message= 'Please enable GPS';
            dispatch({type:SET_CURRENT_LOCATION_FAILED,payload:message});
            dispatch({type:GET_ALL_PRODUCT_FAILED});
            dispatch({type:GET_SELLERS_FAILED});
        })
    } else {
        dispatch({type:SET_CURRENT_LOCATION_FAILED})
    } 
}
/**
 * change location of a user 
 * @param {*} dispatch 
 * @param {*} address address of user 
 * @param {*} location current location of user
 */
export const changeUserLocation=(dispatch,address,location)=>{
    dispatch({type:SET_CURRENT_LOCATION_SUCCESS,payload:location});
    dispatch({type:SET_CURRENT_ADDRESS_SUCCESS,payload:address});
    getNearbySeller(dispatch,location);
}
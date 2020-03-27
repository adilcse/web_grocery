
import { SET_CURRENT_LOCATION_PENDING, SET_CURRENT_LOCATION_SUCCESS, SET_CURRENT_ADDRESS_PENDING, SET_CURRENT_ADDRESS_SUCCESS, SET_CURRENT_ADDRESS_FAILED, SET_CURRENT_LOCATION_FAILED } from "../../app/ActionConstants";
import { getAddressByLatLng } from "../../app/helper/getAddressByLatLng";
import { getNearbySeller } from "./GetProductAction";
export const getUserLocation=(dispatch)=>{
    if (navigator.geolocation) {
        dispatch({type:SET_CURRENT_LOCATION_PENDING});
        navigator.geolocation.getCurrentPosition(position=>{
                getNearbySeller(dispatch,position.coords)
                dispatch({type:SET_CURRENT_LOCATION_SUCCESS,payload:position.coords});
                dispatch({type:SET_CURRENT_ADDRESS_PENDING});
                getAddressByLatLng(position.coords).then(address=>{   
                address?dispatch({type:SET_CURRENT_ADDRESS_SUCCESS,payload:address.formatted_address})
                :dispatch({type:SET_CURRENT_ADDRESS_FAILED});   
                });
        })
    } else {
        dispatch({type:SET_CURRENT_LOCATION_FAILED})
    } 
}

export const changeUserLocation=(dispatch,address,location)=>{
    dispatch({type:SET_CURRENT_LOCATION_SUCCESS,payload:location});
    dispatch({type:SET_CURRENT_ADDRESS_SUCCESS,payload:address});
    getNearbySeller(dispatch,location);
}
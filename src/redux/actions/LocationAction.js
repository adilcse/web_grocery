
import { SET_CURRENT_LOCATION_PENDING, SET_CURRENT_LOCATION_SUCCESS, SET_CURRENT_ADDRESS_PENDING, SET_CURRENT_ADDRESS_SUCCESS, SET_CURRENT_ADDRESS_FAILED, SET_CURRENT_LOCATION_FAILED } from "../../app/ActionConstants";
import { getAddressByLatLng } from "../../app/helper/getAddressByLatLng";
import { getNearbySeller } from "./GetProductAction";
let lastTimestamp=null;
export const getUserLocation=(dispatch)=>{
    if (navigator.geolocation) {
        dispatch({type:SET_CURRENT_LOCATION_PENDING});
        navigator.geolocation.watchPosition(position=>{
          let secondsDifference=Infinity;
          if(lastTimestamp){
            let diff=position.timestamp-lastTimestamp;
            secondsDifference=Math.floor(diff/1000);
          }else{
              lastTimestamp=position.timestamp;
          }
            if(secondsDifference>10){
                getNearbySeller(dispatch,position.coords)
                dispatch({type:SET_CURRENT_LOCATION_SUCCESS,payload:position.coords});
                dispatch({type:SET_CURRENT_ADDRESS_PENDING});
                getAddressByLatLng(position.coords).then(address=>{
                
                address?dispatch({type:SET_CURRENT_ADDRESS_SUCCESS,payload:address.formatted_address})
                :dispatch({type:SET_CURRENT_ADDRESS_FAILED});
               
                });
            }
        })
    } else {
        dispatch({type:SET_CURRENT_LOCATION_FAILED})
    } 
}
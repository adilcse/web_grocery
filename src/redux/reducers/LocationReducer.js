import { SET_CURRENT_LOCATION_PENDING, SET_CURRENT_LOCATION_SUCCESS, SET_CURRENT_LOCATION_FAILED, SET_CURRENT_ADDRESS_PENDING, SET_CURRENT_ADDRESS_SUCCESS, SET_CURRENT_ADDRESS_FAILED } from "../../app/ActionConstants"

const initialState={
    location:null,
    address:null,
    locationError:false,
    addressError:false,
    locationPending:false,
    addressPending:false
}
export const UserLocation=(state=initialState,action={})=>{
    switch(action.type){
        case SET_CURRENT_LOCATION_PENDING:
            return{...state,locationPending:true}
        case SET_CURRENT_LOCATION_SUCCESS:
            return {...state,locationPending:false,location:action.payload,locationError:false}
        case SET_CURRENT_LOCATION_FAILED:
            return{...state,locationPending:false,location:null,locationError:action.payload}
        case SET_CURRENT_ADDRESS_PENDING:
            return{...state,addressPending:true}
        case SET_CURRENT_ADDRESS_SUCCESS:
            return {...state,addressPending:false,address:action.payload,addressError:false,locationError:false}
        case SET_CURRENT_ADDRESS_FAILED:
            return{...state,addressPending:false,address:null,addressError:true}
        default:
            return state;
    }
}
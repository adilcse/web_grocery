import { CHANGE_USER_TYPE } from "../../app/ActionConstants"

const initialState={
    pageType:null
}
export const PageReducer=(state=initialState,action={})=>{
    switch(action.type){
        case CHANGE_USER_TYPE:
            return{...state,pageType:action.payload}
        default:
            return{...state}
    }
}
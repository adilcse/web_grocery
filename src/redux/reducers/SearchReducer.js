import {CHANGE_SEARCH_FIELD} from '../../app/ActionConstants';
const initialState={
    results : [],
    updated:false
}

export const searchProduct = (state=initialState,action={})=>{
switch(action.type){
    case CHANGE_SEARCH_FIELD:
        return {...state,results:action.payload,updated:true}
    default:
        return state;
}
}
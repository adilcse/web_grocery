import { 
    LOGIN_USER_PENDING,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGOUT_USER_FAILED,
    LOGOUT_USER_PENDING,
    LOGOUT_USER_SUCCESS
 } from "../../app/ActionConstants";
 import { 
    USER_TYPE_LOCAL
 } from "../../app/constants";
 let initialState={
     userName:null,
     loggedIn:false,
     UserType:null,
     loggingIn:false,
     error:false,

 }
export const userLogin=(state=initialState,action={})=>{
     switch(action.type){
         case LOGIN_USER_PENDING:
             return {...state,loggingIn:true,loggedIn:false};
         case LOGIN_USER_SUCCESS:
            return{...state,
                userName:action.payload.email,
                loggingIn:false,
                loggedIn:true,
                UserType:USER_TYPE_LOCAL
            } 
        case LOGIN_USER_FAILED:
            return initialState;
        case LOGOUT_USER_FAILED:
            return {...state,error:action.error}   
        case LOGOUT_USER_SUCCESS:
            return initialState;
        case LOGOUT_USER_PENDING:
            return {...state,loggingIn:true}        
        default:
            return state;
     }
 }
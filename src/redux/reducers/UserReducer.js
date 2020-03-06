import { 
    LOGIN_USER_PENDING,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGOUT_USER_FAILED,
    LOGOUT_USER_PENDING,
    LOGOUT_USER_SUCCESS,
    REGISTER_USER_PENDING,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    LOAD_USER,
    ADDRESS_UPDATED
 } from "../../app/ActionConstants";
 import { 
    USER_TYPE_LOCAL
 } from "../../app/constants";
 let initialState={
     userId:null,
     userName:null,
     name:null,
     loggedIn:false,
     userType:null,
     loggingIn:false,
     error:false,
     guest:true,
     address:{}


 }
export const userLogin=(state=initialState,action={})=>{
     switch(action.type){
         case LOGIN_USER_PENDING:
             return {...state,loggingIn:true,loggedIn:false,guest:true};
         case LOGIN_USER_SUCCESS:
            
            return{...state,
                userId:action.payload.uid,
                userName:action.payload.email,
                loggingIn:false,
                loggedIn:true,
                guest:false
            } 
        case LOAD_USER:
            console.log(action.payload);
            return{...state,
                name:action.payload.name,
                userType:action.payload.userType,
                address:action.payload.address,
            }
        case LOGIN_USER_FAILED:
            return initialState;
        case LOGOUT_USER_FAILED:
            return {...state,error:action.error}   
        case LOGOUT_USER_SUCCESS:
            return initialState;
        case LOGOUT_USER_PENDING:
            return {...state,loggingIn:true}        
        
        case REGISTER_USER_PENDING:
            return {...state,loggingIn:true,loggedIn:false};
        case REGISTER_USER_SUCCESS:
            return{...state,
                userId:action.payload.uid,
                userName:action.payload.email,
                loggingIn:false,
                loggedIn:true,
                userType:USER_TYPE_LOCAL,
                guest:false
            } 
            case REGISTER_USER_FAILED:
                return{...state,
                    userId:null,
                    userName:null, 
                    loggedIn:false,
                    loggingIn:false,
                    error:true,
                    errorType:action.payload,
                    guest:true
                }  
            case ADDRESS_UPDATED:
                return{
                    ...state,
                    address:action.payload
                }
        default:    
            return state;
     }
 }
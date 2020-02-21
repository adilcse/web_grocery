import { 
    LOGIN_USER_PENDING,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGOUT_USER_PENDING,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAILED
 } from "../../app/ActionConstants";
 import {firebase} from '../../firebaseConnect';
export const Login=(email,password)=>dispatch=>{
    console.log("action",email, password);
    dispatch({ type: LOGIN_USER_PENDING});
    //handles user signin
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user=>{
        dispatch({type:LOGIN_USER_SUCCESS,payload:user})
    })
    .catch(function(error) {
        // Handle Errors here.
        dispatch({type:LOGIN_USER_FAILED,error:{error}})
        // ...
      });
};
export const LoginSuccess=(user)=>({
type:LOGIN_USER_SUCCESS,
payload : user
})

export const Logout=()=>dispatch=>{
    dispatch({type:LOGOUT_USER_PENDING})
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        dispatch({type:LOGOUT_USER_SUCCESS });
      }).catch(function(error) {
        // An error happened.
        dispatch({LOGOUT_USER_FAILED});
      });
}
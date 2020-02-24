import { 
    LOGIN_USER_PENDING,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGOUT_USER_PENDING,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAILED,
    EMPTY_CART,
    LOAD_CART
 } from "../../app/ActionConstants";
 import {firebase, db} from '../../firebaseConnect';
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
//check user loggedin Status
export const LoginStatus=()=>dispatch=>{
  dispatch({ type: LOGIN_USER_PENDING});
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      dispatch({type:LOGIN_USER_SUCCESS,payload:user})
      loadCart(dispatch,user.uid);

    } else {
      // No user is signed in.
      dispatch({type:LOGIN_USER_FAILED})

    }
  });
}

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
const loadCart=(dispatch,userId)=>{
  let cart=new Set();
  console.log('cart loading')
  db.collection("user").doc(userId).collection('cart').get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
      
        cart.add(doc.id);
    });
}).then(()=>{
  dispatch({type:LOAD_CART,payload:cart})
});
}
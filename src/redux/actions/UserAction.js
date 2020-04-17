import { 
    LOGIN_USER_PENDING,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGOUT_USER_PENDING,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAILED,
    REGISTER_USER_PENDING,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
   
    LOAD_CART,
    CATAGORIES_LOADED
 } from "../../app/ActionConstants";
 import {firebase} from '../../firebaseConnect';
import {getCatagoriesFromAPI } from "../../app/helper/getCatagories";
import { validateUserFromAPI, registerWithAPI } from "../../app/helper/laravelAPI";
/**
 * Tries to signin with given email and password
 * if verifies logsin the user
 * @param {dispatch} dispatch dispath hook
 * @param {'test@test.com'} email email for user login
 * @param {'*******'} password user's pasword
 */
let token=null;
export const EmailLogin=(dispatch,email,password)=>{
    console.log("action",email, password);
    dispatch({ type: LOGIN_USER_PENDING});
    //handles user signin
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        dispatch({type:LOGIN_USER_FAILED,payload:{...error}})
        // ...
      });
};
/**
 * When user's hit login with google it logs in with google auth
 * if user's exist it
 * @param {*} dispatch dispatch hook
 */
export const GoogleLogin=(dispatch)=>{
  let provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
     token = result.credential.accessToken;
    console.log(result.user)
    // The signed-in user info.
    var user = result.user;
    ValidateUser(dispatch,user,'google');
  
    // ...
  }).catch(function(error) {
  console.log(error);
  dispatch({type:LOGIN_USER_FAILED,payload:{...error}});
    // ...
  });
}
/**
 * user register with firebase auth and add data to firebase database
 * @param {*} name name of the user
 * @param {*} email email id of the user
 * @param {*} password password to set
 */
export const Register =(name,email,password)=>dispatch=>{
dispatch({type:REGISTER_USER_PENDING});
firebase.auth().createUserWithEmailAndPassword(email, password)
 .then((data)=>{
  addUserToDb(dispatch,data.user,name);
})
.catch(function(error) {
  console.log(error);
  dispatch({type:REGISTER_USER_FAILED,payload:{...error}});
  // ...
});

}

//check user loggedin Status
export const LoginStatus=(dispatch)=>{
  loadCatagory(dispatch);
  dispatch({ type: LOGIN_USER_PENDING});
  firebase.auth().onAuthStateChanged(function(user) {
  
    if (user) {
  
     if(!token)
        ValidateUser(dispatch,user);
     

    } else {
      // No user is signed in.
 
      dispatch({type:LOGIN_USER_FAILED})

    }
  });
}
/**
 * logout user from app
 * @param {*} dispatch dispatch hook
 */
export const Logout=(dispatch)=>{
    dispatch({type:LOGOUT_USER_PENDING})
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        dispatch({type:LOGOUT_USER_SUCCESS });
      }).catch(function(error) {
        // An error happened.
        dispatch({LOGOUT_USER_FAILED});
      });
}
const loadCart=(dispatch,cartLoaded=null)=>{
  let cart=new Set();
  cartLoaded.forEach(element => {
    cart.add(element.item_id);
  });
  dispatch({type:LOAD_CART,payload:cart,item:cartLoaded}) 
}
/**
 * GETS USER ADDRESS
 * @param {*} dispatch 
 * @param {*} userId 
 */
export const ValidateUser=(dispatch,user,by='email')=>{
  validateUserFromAPI(user).then(res=>{
    dispatch({type:LOGIN_USER_SUCCESS,payload:{userData:res.user,address:res.address,user:user}});
      token=null;
      loadCart(dispatch,res.cart);
  }).catch(err=>{
    if(by==='google'){ 
        addUserToDb(dispatch,user,user.displayName);
      }else{
        dispatch({type:LOGIN_USER_FAILED,payload:{code:'user not exist'}});
        Logout(dispatch);
      }
    dispatch({type:LOGIN_USER_FAILED,payload:{code:'user not exist'}});
    Logout(dispatch);
  });
  //   db.collection("user").doc(user.uid).get().then(function(doc) {
  //     if (doc.exists) {
  //       dispatch({type:LOGIN_USER_SUCCESS,payload:{...user,...doc.data(),token:user.getIdToken()}});
  //       token=null;
  //       loadCart(dispatch,user.uid);
  //     } else {
  //         // doc.data() will be undefined in this case
  //         console.log("use not exist...");
  //         if(by==='google'){
          
  //           addUserToDb(dispatch,user.uid,user.email,user.displayName);
  //         }else{
  //           dispatch({type:LOGIN_USER_FAILED,payload:{code:'user not exist'}});
  //           Logout(dispatch);
  //         }

  //     }
  // }).catch(function(error) {
  //     console.log("Error getting document:", error);
  // });
}


/**
 * add user to database
 * Register as a local user
 * @param {*} dispatch dispatch hook
 * @param {*} userId userId from firebase auth
 * @param {*} email user's mail to register
 * @param {*} name name of the user
 */
const addUserToDb=(dispatch,user,name)=>{
registerWithAPI(user,name).then(res=>{
console.log(res)
})
.then(function() {
   dispatch({type:REGISTER_USER_SUCCESS,payload:{uid:user.uid,email:user.email,name:name}});

})
.catch(function(error) {
    console.error("Error writing document: ", error);
    dispatch({type:REGISTER_USER_FAILED,payload:error});
    user.delete().then(function() {
      console.log('user deleted');
    }).catch(function(error) {
      // An error happened.
    });
}).finally(()=>token=null);
}
export const loadCatagory=(dispatch)=>{
    getCatagoriesFromAPI().then(res=>{
     dispatch({type:CATAGORIES_LOADED,payload:res})
  }).catch(res=>{
    dispatch({type:CATAGORIES_LOADED,payload:[]})
  });
}

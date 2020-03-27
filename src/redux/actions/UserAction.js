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
 import {firebase, db} from '../../firebaseConnect';
import { getCatagories } from "../../app/helper/getCatagories";
import { USER_TYPE_LOCAL, AVAILABLE, NOT_AVAILABLE } from "../../app/constants";
import { getItemsByIds } from "../../app/helper/getItemsByIds";
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
    .then(user=>{
      LoginStatus(dispatch);
    })
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
  addUserToDb(dispatch,data.user.uid,data.user.email,name);
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

export const LoginSuccess=(user)=>({
type:LOGIN_USER_SUCCESS,
payload : user
})
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
const loadCart=(dispatch,userId)=>{
  let cart=new Set();
  let item=[];
 db.collection("user").doc(userId).collection('cart').get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
      
        cart.add(doc.id);
        item.push(doc.data());

    });
    return [...cart];
}).then((crt)=>{
  let prod=[];
  getItemsByIds(crt,'sellerItems',firebase.firestore.FieldPath.documentId()).then(res=>{
    function merge(array1, array2, prop) {
      return array2.map(function (item2) {
          var item1 = array1.find(function (item1) {

              return item1[prop] === item2[prop];
          });
          return Object.assign({}, item1, item2,{stock:(item2.stock>0?(item2.stock>10?AVAILABLE:item2.stock):NOT_AVAILABLE)});
      });
  }
    prod=merge(item,res,'id')
    dispatch({type:LOAD_CART,payload:cart,item:prod})
  })
 // 
});
}
/**
 * GETS USER ADDRESS
 * @param {*} dispatch 
 * @param {*} userId 
 */
export const ValidateUser=(dispatch,user,by='email')=>{
  db.collection("user").doc(user.uid).get().then(function(doc) {
    if (doc.exists) {
      dispatch({type:LOGIN_USER_SUCCESS,payload:{...user,...doc.data()}});
      token=null;
      loadCart(dispatch,user.uid);
    } else {
        // doc.data() will be undefined in this case
        console.log("use not exist...");
        if(by==='google'){
         
          addUserToDb(dispatch,user.uid,user.email,user.displayName);
        }else{
          dispatch({type:LOGIN_USER_FAILED,payload:{code:'user not exist'}});
          Logout(dispatch);
        }

    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
}


/**
 * add user to database
 * Register as a local user
 * @param {*} dispatch dispatch hook
 * @param {*} userId userId from firebase auth
 * @param {*} email user's mail to register
 * @param {*} name name of the user
 */
const addUserToDb=(dispatch,userId,email,name)=>{
  db.collection("user").doc(userId).set({
    email: email,
    name:name,
    userType:USER_TYPE_LOCAL
})
.then(function() {
   dispatch({type:REGISTER_USER_SUCCESS,payload:{uid:userId,email:email}});

})
.catch(function(error) {
    console.error("Error writing document: ", error);
    dispatch({type:REGISTER_USER_FAILED,payload:error})
}).finally(()=>token=null);
}
export const loadCatagory=(dispatch)=>{
  getCatagories().then(
    getCatagories().then(res=>{
     dispatch({type:CATAGORIES_LOADED,payload:res})
  
  }).catch(res=>{
    dispatch({type:CATAGORIES_LOADED,payload:res})
  })
  );
}

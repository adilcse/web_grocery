import { LARAVEL_API_URL, RADIUS_IN_KM, ORDER_PER_PAGE } from "../constants";
export const getCatagoriesFromAPI=()=>{
    return fetch(`${LARAVEL_API_URL}/getCatagory`,{
        method:'GET',
        mode:'cors',
        headers:{
            'accept':'application/json',
            
        }
    })
            .then(res=>{
                return res.json()})
            .then(data=>{
                return data;
            })
            .catch(err=>{
                console.log(err)
                return [];
            });
}
/**
 * validate user with mysql database
 * @param {*} user user object
 */
export const validateUserFromAPI=async(user)=>{
    const token= await user.getIdToken();
    return fetch(`${LARAVEL_API_URL}/user/login?api_token=${token}`,{
        mode:'cors',
        method:'GET',
    })
        .then(res=>{
        if(res.status===200)
            return res.json();
        else 
            throw res.json();
        })
}

/**
 * register user to sql database
 * @param {*} user user object to register in tatablase
 * @param {*} name name of user
 */
export const registerWithAPI=async(user,name)=>{
    const token=await user.getIdToken();
        const userData={
            name: name, 
            uid: user.uid, 
            email:user.email
        }
        const  data = new FormData();
        data.append("json", JSON.stringify( userData));
        return fetch(`${LARAVEL_API_URL}/user/register?api_token=${token}`,{
            method:'post',
            mode:'cors',
            body:data
        })
        .then(res=>res.json())
        .then(res=>{console.log(res);
            return res})
        .catch(err=>{console.log(err)});
    
}
/**
 * loads user cart in redux store
 * @param {*} disppatch 
 * @param {*} user 
 */
export const  getUserCartFromAPI=async(user)=>{
    const token=await user.getIdToken();
    return fetch(`${LARAVEL_API_URL}/user/getUserCart?api_token${token}`)
        .then(res=>{
            let cart=new Set();
            res.forEach(element => {
                cart.add(element.item_id);
            });
            return({cart:cart,item:res});
        })
}
/**
 * get nearby seller and product from database
 * @param {{latitude,longitude}} location user's location
 */
export const getSellerAndItemsAPI=async(location)=>{
    const lat=location.latitude;
    const lng=location.longitude;
    return fetch(`${LARAVEL_API_URL}/nearbySellers?lat=${lat}&lng=${lng}&radius=${RADIUS_IN_KM}`)
    .then(res=>res.json())
}
/**
 * add item in cart with api
 * @param {*} user user object
 * @param {item_id,quantity} item item to be added
 */
export const addItemToCartAPI=async(user,item)=>{
    const token=await user.getIdToken();
    const  data = new FormData();
    data.append("json", JSON.stringify(item));
    return fetch(`${LARAVEL_API_URL}/user/addToCart?api_token=${token}`,{
        method:'post',
        mode:'cors',
        body:data
    })
    .then(res=>res.json());

}
/**
 * remove item from cart with API
 * @param {*} user user object
 * @param {item_id} item item id to be removed from cart
 */
export const removeFromCartAPI=async(user,item)=>{
    const token=await user.getIdToken();
    return fetch(`${LARAVEL_API_URL}/user/removeFromCart/${item}/delete?api_token=${token}`,{
        method:'get'
        })
        .then(res=>{
            if(res.status===200)
                return res.json();
            else 
                throw res.json();
        });
}
/**
 * update quantity of an item in database by calling API
 * @param {*} user user object
 * @param {*} item item to be updated
 */
export const updateQuantityAPI=async(user,item)=>{
    const token=await user.getIdToken();
    const data=new FormData();
    data.append("json", JSON.stringify( item));
    return fetch(`${LARAVEL_API_URL}/user/updateCart?api_token=${token}`,{
        method:'post',
        mode:'cors',
        body:data
    })
    .then(res=>res.json());

}
/**
 * place order by calling API
 * @param {*} user 
 * @param {*} order order to be placed 
 */
export const placeOrderAPI=async(user,order)=>{
    const token=await user.getIdToken();
    const data=new FormData();
    data.append("json", JSON.stringify(order));
    return fetch(`${LARAVEL_API_URL}/user/placeOrder?api_token=${token}`,{
        method:'post',
        mode:'cors',
        body:data
    })
    .then(res=>res.json());

}
/**
 * update users address 
 * @param {*} user 
 * @param {*} address new address
 */
export const updateAddressAPI=async(user,address)=>{
    const token=await user.getIdToken();
    const data=new FormData();
    data.append("json", JSON.stringify(address));
    return fetch(`${LARAVEL_API_URL}/user/updateAddress?api_token=${token}`,{
        method:'post',
        body:data
    }).then(res=>res.json())
}
/**
 * get user's orders
 * @param {*} user 
 * @param {*} page 
 */
export const getOrdersAPI=async(user,page=1)=>{
    const token=await user.getIdToken();
    return fetch(`${LARAVEL_API_URL}/user/getOrders/${ORDER_PER_PAGE}?page=${page}&api_token=${token}`)
    .then(res=>res.json())
}

export const addressUpdateAPI=async(user,address)=>{
    const token=await user.getIdToken();
    const data=new FormData();
    data.append('json',JSON.stringify(address));
    return fetch(`${LARAVEL_API_URL}/user/updateAddress/?api_token=${token}`,{
        method:'POST',
        body:data
    })
    .then(res=>res.json())
}
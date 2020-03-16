import {createStore,applyMiddleware,combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import  thunkMiddleware  from "redux-thunk";
import { addItemsToCart,CatagoryReducer } from '../reducers/CardReducer';
import { searchProduct } from "../reducers/SearchReducer";
import { userLogin } from "../reducers/UserReducer";
import {CheckoutReducer} from '../reducers/CheckoutReducer';
import {getOrders} from '../reducers/OrderReducer';
import {UserLocation} from '../reducers/LocationReducer';
import {sellers} from '../reducers/GetSellerReducer';
 const Store=()=>{
    const logger= createLogger();
    const reducers=combineReducers({addItemsToCart,
                                    searchProduct,
                                    userLogin,
                                    CheckoutReducer,
                                    getOrders,
                                    CatagoryReducer,
                                    UserLocation,
                                    sellers});
    const store = createStore(reducers,applyMiddleware(thunkMiddleware, logger));
    return store;

}
export default Store;
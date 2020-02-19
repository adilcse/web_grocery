import React from 'react';
import {createStore,applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import { AddItemsToCart } from '../reducers/CardReducer';
 const Store=()=>{
    const logger= createLogger();
    const store = createStore(AddItemsToCart,applyMiddleware(logger));
    
    return store;

}
export default Store;
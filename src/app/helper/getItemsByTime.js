import { db } from "../../firebaseConnect"
import { getFromDb } from "./getFromDb";
/**
 * returns Promise with items selected from db
 * @param {1-10} limit number of items to fetch
 */
export const getItemsByTime=(limit)=>{
    let query= db.collection('products').orderBy('itemAdded','desc').limit(limit)
    return getFromDb(query);
}
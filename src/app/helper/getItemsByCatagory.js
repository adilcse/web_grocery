import { db } from "../../firebaseConnect"
import { getFromDb } from "./getFromDb";

export const getItemsByCatagory=(catagory)=>{
    if(!catagory)
        return new Promise((resolve,reject)=>reject(false));
    let query=(catagory==='all')
                ?db.collection("products").limit(10)
                :db.collection('products').where('catagory','==',catagory).limit(10);
    return getFromDb(query);
}
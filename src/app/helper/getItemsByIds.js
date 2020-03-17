import { db } from "../../firebaseConnect"
import { getFromDb } from "./getFromDb";
/**
 * get data from database by ids
 * @param {*} ids ids to fetch data from
 * @param {*} col name of collection defailt 'sellerItems'
 * @param {*} key field to match default 'id'
 */
export const getItemsByIds=async(ids,col='sellerItems',key='id')=>{
    let result=[];
    for(let i=0;i<ids.length;i+=10){
    let query= db.collection(col).where(key,'in',ids.slice(i,i+10));
    const res=await getFromDb(query);
        result=result.concat(res);
    }
    return result;
}
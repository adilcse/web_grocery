import { db } from "../../firebaseConnect"
import { getFromDb } from "./getFromDb";

export const getItemsByIds=async(ids,col='products',key='id')=>{
    let result=[];
    for(let i=0;i<ids.length;i+=10){
    let query= db.collection(col).where(key,'in',ids.slice(i,i+10));
    const res=await getFromDb(query);
        result=result.concat(res);
    }
    return result;
}
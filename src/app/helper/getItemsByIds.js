import { db } from "../../firebaseConnect"
import { getFromDb } from "./getFromDb";
import {firebase} from '../../firebaseConnect';
/**
 * get data from database by ids
 * @param {*} ids ids to fetch data from
 * @param {*} col name of collection defailt 'sellerItems'
 * @param {*} key field to match default 'id'
 */
export const getItemsByIdsFromDb=async(ids,col='sellerItems',key='id')=>{
    let result=[];
    for(let i=0;i<ids.length;i+=10){
    let query= db.collection(col).where(key,'in',ids.slice(i,i+10));
    const res=await getFromDb(query);
        result=result.concat(res);
    }
    return result;
}
/**
 * try to search the product list first for item an then query the database
 * @param {*} ids ids of item to fetch
 * @param {*} products list of prodict to be searched for item
 * @returns Promise with results
 */
export const getItemsByIds=async(ids,products=[],catagory=[])=>{
    let toSearch=[];
    let result=[];
    ids.forEach(id=>{
            const item=products.find(el=>el.id===id);
            if(item)
                result.push(item);
            else
                toSearch.push(id);
    })
    if (toSearch.length>0){

        const fromDb=await getItemsByIdsFromDb(ids,'sellerItems',firebase.firestore.FieldPath.documentId())
        return setCatagory(result.concat(fromDb),catagory)
    }
    else
        return setCatagory(result,catagory);

}

const setCatagory=(items,catagory)=>{
    let result=[];
    if(catagory.length>0){
        result=items.map(item=>{
            const cat=item.catagory.map(cat=>{
               return catagory.find(c=>c.id===cat).name
            });
          
            return {...item,catagory:cat}
        })
    }else
        result=items;
 
    return result;
}
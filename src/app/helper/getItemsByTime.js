import { db } from "../../firebaseConnect"
import { getFromDb } from "./getFromDb";
/**
 * returns Promise with items selected from db
 * @param {1-10} limit number of items to fetch
 */
export const getItemsByTime=(products,limit)=>{
    let promise= new Promise((resolved,reject)=>{
        let mostRecentDate= products.map(function(e) { return e.addedOn.seconds; }).sort().reverse();
         var mostRecentObject =[]
          products.forEach(element => {
            var d = element.addedOn.seconds; 
            mostRecentObject[mostRecentDate.indexOf(d)]=element;
          });
        resolved(mostRecentObject.slice(0,limit))
    });
    return promise;
}
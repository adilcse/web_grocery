import { db } from "../../firebaseConnect"
import { LARAVEL_API_URL } from "../constants";
export const getCatagories=()=>{
    let query=db.collection('catagories');
   return query.get()
        .then(function(querySnapshot) {
            var items=[];
            querySnapshot.forEach(function(doc) {
                items.push({...doc.data(),id:doc.id});
            });
            return items;
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
            return false;
        });  
}

export const getCatagoriesFromAPI=()=>{
   return fetch(`${LARAVEL_API_URL}/getCatagory`)
   .then(res=>{
       return res.json()})
    .then(data=>{
            return data;
        }).catch(err=>{
            console.log(err)
            return [];
        });
}
import { db } from "../../firebaseConnect"

export const getItems=(ids)=>{
    var items=[];
    return db.collection('products').where('id','in',ids).get()
    .then(function(querySnapshot) {
         querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            items.push(doc.data());
            // console.log(items)
        });
        return items;
        // console.log(items)
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
   
}
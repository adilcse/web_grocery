/**
 * takes a firebase query and return a promise with requested data
 * @param {*} query Firebase query
 */
export const getItemFromDb=(query)=>{
    return query.get()
    .then(function(doc) {
            if (doc.exists) {
               return doc.data();            
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                return false; 
            }
           
        }).catch(function(error) {
            console.log("Error getting document:", error);
            return false;
        });
}
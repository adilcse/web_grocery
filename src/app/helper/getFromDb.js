export const getFromDb=(query)=>{
    return query.get()
    .then(function(querySnapshot) {
        var items=[];
        querySnapshot.forEach(function(doc) {
            items.push({id:doc.id,data:doc.data()});
        });
        return items;
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
        return false;
    });  
}
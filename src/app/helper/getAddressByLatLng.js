/**
 * gets address of given location by calling google API
 * @param {{latitude:number,longitude:number}} latLng location to be found
 * @returns address of location
 */
export const getAddressByLatLng=(latLng)=>{
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=
    ${latLng.latitude+','+latLng.longitude}
    &key=${process.env.REACT_APP_MAP_API_KEY}`)
    .then(res=>{
        return res.json();

    }).then(res=>{
        if(res.status==='OK'){
            for(let i=0;i<res.results.length;i++){
                let element=res.results[i];
                if(element.types.includes('street_address')
                ||element.types.includes("point_of_interest")
                ||element.types.includes("route")){
                    return element;
                }
                
            }
        }
    })
    .catch(err=>{
        return false;
    })
}
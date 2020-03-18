/**
 * get tpath coords
 * @param {*} origin cords of starting point
 * @param {*} destination cords of final points
 * @param {*} type mode of path
 */
export const getPath=(origin,destination,type='establishment')=>{
    origin=Object.values(origin).join(",");
    destination=Object.values(destination).join(",");
    let url=`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${process.env.REACT_APP_MAP_API_KEY}`
    console.log(url)
    return fetch(url,{mode:'no-cors'})
        .then(response=>{
            return response.json()
        }).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
}
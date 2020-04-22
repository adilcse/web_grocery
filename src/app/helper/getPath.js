/**
 * get tpath coords
 * @param {*} origin cords of starting point
 * @param {*} destination cords of final points
 * @param {*} type mode of path
 */
export const getPath=async(origin,destination,type='establishment')=>{
    origin=Object.values(origin).join(",");
    destination=Object.values(destination).join(",");
    let res=await getDirections(origin,destination);
    if(res.status==='OK'){
       return res.result.routes[0].overview_path;
    }
}
/**
 * get direction from starting to final points by google api
 * @param {*} startLoc starting location
 * @param {*} destinationLoc final location
 * @param {*} wayPoints 
 */
const getDirections=async(startLoc, destinationLoc, wayPoints = [])=> {
    return new Promise((resolve, reject) => {
      const waypts = [];
      if (wayPoints.length > 0) {
        waypts.push({
          location: new window.google.maps.LatLng(
            wayPoints[0].lat,
            wayPoints[0].lng
          ),
          stopover: true
        });
      }
      const DirectionsService = new window.google.maps.DirectionsService();
      DirectionsService.route(
        {
          origin: startLoc,
          destination: destinationLoc,
          waypoints: waypts,
          optimizeWaypoints: true,
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          resolve({ status, result, wayPoints });
        }
      );
    });
  }
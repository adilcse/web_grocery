import React, { useState } from 'react';
import { GoogleApiWrapper, Map, Marker, InfoWindow, Polyline } from 'google-maps-react';
import { getPath } from '../../app/helper/getPath';
const TrackMap=(props)=>{
    const{user,seller}=props.details;
    const [activeMarker,setActiveMarker]=useState({});
    const [showingInfoWindow,setShowingInfoWindow]=useState(false);
    const [selectedPlace,setSelectedPlace]=useState({});
    const [center,setCenter]=useState({lat:user.latLng.latitude,lng:user.latLng.longitude});
    const [path,setPath]=useState([]);
    const [currentLocation,setCurrentLocation]=useState(center);
    console.log(user , seller[0]._geoloc)
    const onMarkerClick=(props, marker, e)=>{
        console.log(marker.position.lat())
       // drawPolyline({lat:marker.position.lat(),lng:marker.position.lng()});
       setSelectedPlace(props)
       setActiveMarker(marker)
       setShowingInfoWindow(true);
    }
    const drawPolyline=(cord1,cord2=currentLocation)=>{

        console.log(cord1,cord2)
            getPath(cord1,cord2).then(res=>{
                
               setPath(res);
             
            })          

        }
    const mapStyles = {
        width: '100%',
        height: '100%',
        minHeight:'5rem'
      };
      if(!user.latLng || !seller[0]._geoloc){
        return(
            <div>
                Sorry!!! tracking is not available for this order.
            </div>
        )
      }




      if(center && seller[0]._geoloc && path.length===0 ){
        drawPolyline(seller[0]._geoloc);
      }
    if(user.latLng && seller[0]._geoloc){

        return(
              <Map
          google={props.google}
          zoom={15}
          style={mapStyles}
          center={center}
          panControl={true}
          initialCenter={center}
            >
               <Marker  name={user.name} address={user.address} position={currentLocation} onClick={onMarkerClick}  />
            { seller.map((el,i)=>{
                    return <Marker
                            key={i}
                            name={el.name}
                            address={el.address}
                           position={el._geoloc}
                           icon={{
                            url: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
                            anchor: new props.google.maps.Point(25,25),
                            scaledSize: new props.google.maps.Size(50,50)
                          }}
                          onClick={onMarkerClick}
                          
                           />
                          
                            }
            )}
             <InfoWindow
          marker={activeMarker}
          visible={showingInfoWindow}>
            <div>
              <h3>{selectedPlace.name}</h3>
                        <h5>{selectedPlace.address}</h5>
            </div>
        </InfoWindow>
             <Polyline path={path} options={{ strokeColor: "#FF0000 " }} />  
            </Map>
        )
    }
}
export default  GoogleApiWrapper({
    apiKey: process.env.REACT_APP_MAP_API_KEY,
  })(TrackMap);
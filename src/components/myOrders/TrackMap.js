import React, { useState } from 'react';
import { GoogleApiWrapper, Map, Marker, InfoWindow, Polyline } from 'google-maps-react';
import { getPath } from '../../app/helper/getPath';
const TrackMap=(props)=>{
    const{user,seller}=props.details;
    console.log(user,seller)
    const [activeMarker,setActiveMarker]=useState({});
    const [showingInfoWindow,setShowingInfoWindow]=useState(false);
    const [selectedPlace,setSelectedPlace]=useState({});
    const center={lat:user.lat,lng:user.lng};
    const [path,setPath]=useState([]);
    const currentLocation=center;
    if(!seller || !user.lat || !user.lng){
      return(<div> no seller available</div>)
    }
 
    const onMarkerClick=(props, marker, e)=>{

       setSelectedPlace(props)
       setActiveMarker(marker)
       setShowingInfoWindow(true);
    }
    const drawPolyline=(cord1,cord2=currentLocation)=>{

            getPath(cord1,cord2).then(res=>{
                
               setPath(res);
             
            })          

        }
    const mapStyles = {
        width: '100%',
        height: '100%',
        minHeight:'5rem'
      };
      if(!user.lat || !seller.lat){
        return(
            <div>
                Sorry!!! tracking is not available for this order.
            </div>
        )
      }




      if(center && seller.lat && path.length===0 ){
        drawPolyline({lat:seller.lat,lng:seller.lng});
      }
    if(user.lat && seller.lat){

        return(
              <Map
          google={props.google}
          zoom={12}
          style={mapStyles}
          center={center}
          panControl={true}
          initialCenter={center}
            >
               <Marker  name={user.name} address={user.address} position={currentLocation} onClick={onMarkerClick}  />
           <Marker name={seller.name}
                   address={seller.address}
                   position={{lat:seller.lat,lng:seller.lng}}
                  onClick={onMarkerClick}
                  
                    />
    
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
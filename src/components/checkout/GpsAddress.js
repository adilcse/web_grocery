import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Map, GoogleApiWrapper, Marker, Polyline } from 'google-maps-react';
import Loading from '../Loading';
const GpsAddress=(props)=>{
    const [marker,setMarker]=useState(false);
    const [center,setCenter]=useState({ lat: 20.3423744, lng: 85.8161152})
    const buttonStyle={
        minHeight:'200px',
    }
    const mapStyles = {
        width: '100%',
        height: '100%',
      };
    const getLocation=()=>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos=>{
                setCenter( {lat:pos.coords.latitude,
                    lng:pos.coords.longitude});
                setMarker(pos.coords);
            });
          } else { 
           console.log("Geolocation is not supported by this browser.");
          }
    }
   const MyLocation=()=>{
       let pos={
        lat:marker.latitude,
        lng:marker.longitude
       }
       console.log(pos)
    if(marker){
        return(
            <Marker position={pos} />
        )
    }else{
        return <></>
    }
    }
    const path=[{ lat: 20.3423744, lng: 85.8161152},
                { lat: 20.341234, lng: 85.811124}]
   
return(
    <div style={buttonStyle}>
        <Button className='mt-4'onClick={getLocation}>
            Get My Location
        </Button>
        <Map
          google={props.google}
          zoom={15}
          style={mapStyles}
          center={center}
          initialCenter={center}
          panControl={true}
        >
            
            {MyLocation()}

            <Polyline path={path} options={{ strokeColor: "#FF0000 " }} />
            </Map>
    </div>
    
)
}
export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_API_KEY,
  })(GpsAddress);
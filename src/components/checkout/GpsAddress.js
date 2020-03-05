import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
const GpsAddress=(props)=>{
    const [marker,setMarker]=useState(false);
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
                console.log(pos);
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
   
return(
    <div style={buttonStyle}>
        <Button className='mt-4'onClick={getLocation}>
            Get My Location
        </Button>
        <Map
          google={props.google}
          zoom={15}
          style={mapStyles}
          initialCenter={{ lat: 20.3423744, lng: 85.8161152}}
        >
            {MyLocation()}
            </Map>
    </div>
    
)
}
export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_API_KEY
  })(GpsAddress);
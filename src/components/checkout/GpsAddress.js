import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { getAddressByLatLng } from '../../app/helper/getAddressByLatLng';
import { useSelector } from 'react-redux';
let oldLocation=true;
/**
 * get gps address
 * @param {*} props 
 */
const GpsAddress=(props)=>{
    const [marker,setMarker]=useState(false);
   
    const[myAddress,setMyAddress]=useState(false);
    const [fullAddress,setFullAddress]=useState({});
    const myLocation=useSelector(state=>state.UserLocation.location);
    const [center,setCenter]=useState({  lat:22.241497, lng: 84.861948});
    const [gpsEnabled,setGpsEnabled]=useState(myLocation?true:false);
  
    if(oldLocation!==myLocation){
       myLocation?setGpsEnabled(true):setGpsEnabled(false);
       oldLocation=myLocation;
       if(!myLocation)
        return;
        setCenter( {lat:myLocation.latitude,
                     lng:myLocation.longitude})
    }
    
    const buttonStyle={
        minHeight:'500px',
        height:'100%'
       
    }
    const mapStyles = {
        width: '100%',
        height: '100%',
        minHeight:'5rem'
      };
      /**
       * get user's gps address when button is clicked.
       */
    const getLocation=()=>{
        if (myLocation) {
            setCenter({lat:myLocation.latitude,
                lng:myLocation.longitude});
            setMarker(myLocation);
            getAddress(myLocation);
         
          } else { 
           console.log("Geolocation is not supported by this browser.");
          }
    }
    /**
     * get address of given location by calling map api
     * and call set address function
     * @param {*} latLng latitude and longitude of location
     */
    const getAddress=(latLng)=>{
        getAddressByLatLng(latLng).then(address=>{
         setAddress(address);
        })
    }
    /**
     * set fullAddress and display formatted address
     * @param {*} address address by fetch call to map api
     */
    const setAddress=(address)=>{
        let fullAddress={};
        address.address_components.forEach(element => {
            if(element.types.includes('locality')){
                fullAddress.locality=element.long_name;
            }
            else if(element.types.includes('premise')){
                fullAddress.address?
                fullAddress.address+=' '+element.long_name:
                fullAddress.address=element.long_name;
            }
            else if(element.types.includes('neighborhood')|| element.types.includes('route')){
                fullAddress.landmark=element.long_name;
                fullAddress.address?
                fullAddress.address+=' , '+element.long_name:
                fullAddress.address=element.long_name;
            }
            else if(element.types.includes('sublocality')){
                fullAddress.address?
                fullAddress.address+=' , '+element.long_name:
                fullAddress.address=element.long_name;
                }
            else if(element.types.includes('administrative_area_level_2')){
                fullAddress.city=element.long_name;
            }
            else if(element.types.includes('administrative_area_level_1')){
                fullAddress.state=element.long_name;
            }
            else if(element.types.includes('postal_code')){
                fullAddress.pin=element.long_name;
            }
        });
        fullAddress.formatted_address=address.formatted_address;
        setMyAddress(address.formatted_address);
        setFullAddress(fullAddress);
    }
    /**
     * handless marker drag event
     * @param {*} cord cordinate of user's location
     */
    const markerDraged=(cord)=>{
        const latLng={latitude:cord.latLng.lat(),longitude:cord.latLng.lng()}
        setMarker(latLng)
        getAddress(latLng);
    }
    /**
     * dispay address and button
     */
    const ViewAddress=()=>{
      
    return <div>
        <Button variant='info' onClick={()=>props.setAddress({...fullAddress,latLng:marker})}> Delever to this Location</Button>
        <h2>{myAddress}</h2>
    </div>
    
    }
    /**
     * dispay marker in map
     */
   const MyLocation=()=>{
       let pos={
        lat:marker.latitude,
        lng:marker.longitude
       }

    if(marker){
        return(
            <Marker position={pos}
            draggable={true}
            onDragend={(t,map,coord)=>markerDraged(coord)}
             />
        )
    }else{
        return <></>
    }
    }
   
    if(!gpsEnabled){
        return <h2>Gps is not set</h2>
    } 
return(
    <div style={buttonStyle}>
        <Button className='mt-4 mb-3'onClick={getLocation}>
            Get My Location
        </Button>
        <div>
            {myAddress?<ViewAddress/>:<></>}
        </div>
        <Map
          google={props.google}
          zoom={15}
          style={mapStyles}
          center={center}
          initialCenter={center}
          panControl={true}
        >
            
            {MyLocation()}

            {/* <Polyline path={path} options={{ strokeColor: "#FF0000 " }} /> */}
            </Map>
           
    </div>
    
)
}
export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_MAP_API_KEY,
  })(GpsAddress);
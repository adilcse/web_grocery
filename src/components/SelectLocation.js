import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { getAddressByLatLng } from '../app/helper/getAddressByLatLng';
import { HOME } from '../app/constants';
import { useDispatch } from 'react-redux';
import {changeUserLocation} from '../redux/actions/LocationAction'
const SelectLocation=(props)=>{
    const {location,changePage}=props;
    const [marker,setMarker]=useState(location.location);

    const [center,setCenter]=useState({ lat: location.location.latitude, lng:  location.location.longitude});
    const[myAddress,setMyAddress]=useState(location.address);
    const [loaded,setLoaded]=useState(false);
    const dispatch=useDispatch();
    const mapStyles = {
       position:'relative',
       width:'100%',
       height:'100%',
      };
      /**
       * get user's gps address when button is clicked.
       */
    const getLocation=()=>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos=>{
                setCenter( {lat:pos.coords.latitude,
                    lng:pos.coords.longitude});
                setMarker(pos.coords);
                console.log('getting location')
                getAddress({latitude:pos.coords.latitude,longitude:pos.coords.longitude});

               
            });
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
        setMyAddress(address.formatted_address);
    }
    /**
     * handless marker drag event
     * @param {*} cord cordinate of user's location
     */
    const markerDraged=(cord)=>{
        console.log(cord);
        const latLng={latitude:cord.latLng.lat(),longitude:cord.latLng.lng()}
        setMarker(latLng)
        getAddress(latLng);
    }
    /**
     * dispay address and button
     */
    const fireChangeAction=()=>{
        changePage(HOME);
        changeUserLocation(dispatch,myAddress,marker);
    }
    const ViewAddress=()=>{
    return <div>
        <Button variant='info' onClick={fireChangeAction}> Select this Location</Button>
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

    if(!loaded && !location.location){
        getLocation();
        setLoaded(true);
    }
   
   
return(
    <div className='text-center'>
           <Button onClick={()=>changePage(HOME)}>Back</Button>
      
        <div>
            {myAddress?<ViewAddress/>:<></>}
        </div>
        <div>
        <Map
          google={props.google}
          zoom={15}
          style={mapStyles}
          center={center}
          initialCenter={center}
          panControl={true}
        >
            
            {MyLocation()}

            </Map>
            </div>
           
    </div>
    
)
}
export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_MAP_API_KEY,
  })(SelectLocation);
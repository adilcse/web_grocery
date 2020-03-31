import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { getAddressByLatLng } from '../app/helper/getAddressByLatLng';
import { HOME } from '../app/constants';
import { useDispatch } from 'react-redux';
import {changeUserLocation} from '../redux/actions/LocationAction';
import './checkout/EditAddress.css'
const SelectLocation=(props)=>{
    const {location,changePage}=props;
    const [marker,setMarker]=useState(location.location);
    const [locationFetched,setLocationFetched]=useState(false);
    const [viewBounds,setViewBounds]=useState(false);
    const [center,setCenter]=useState({ lat: location.location.latitude, lng:  location.location.longitude});
    const[myAddress,setMyAddress]=useState(location.address);
    const [loaded,setLoaded]=useState(false);
    const dispatch=useDispatch();

       /**
     * add search bar to map
     * @param {*} mapProps 
     * @param {*} map 
     */
   const  fetchPlaces=(mapProps, map)=> {
    getLocation(locationFetched);
    setLocationFetched(true);
     if(viewBounds)
         map.fitBounds(viewBounds);
     const {google} = mapProps;
     const input = document.getElementById('searchbox');
     map.controls[google.maps.ControlPosition.TOP].push(input);
     var circle = new google.maps.Circle(
         {center: center, radius: 50*1000});
       var searchBox = new google.maps.places.SearchBox(input, {
         bounds: circle.getBounds(),
         componentRestrictions: {country: 'in'}
       });
       searchBox.addListener('places_changed', function() {
         var places = searchBox.getPlaces();
         if (places.length === 0) {
           return;
         }
         let bounds = new google.maps.LatLngBounds();
         places.forEach(function(place) {
             if (!place.geometry) {
               console.log("Returned place contains no geometry");
               return;
             }
              setMarker({latitude:place.geometry.location.lat(),longitude:place.geometry.location.lng()});
              setAddress(place);
               if (place.geometry.viewport) {
                 // Only geocodes have viewport.
                 bounds.union(place.geometry.viewport);
               } else {
                 bounds.extend(place.geometry.location);
               }
             });
             setViewBounds(bounds);
             map.fitBounds(bounds);
     })
 }
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
        <input type='text' id='searchbox' className='form-control col-md-4 mt-md-2 col-xs-3 mt-xs-5' size="30" placeholder="Search place in map"/>
        <div>
        <Map
          google={props.google}
          zoom={15}
          style={mapStyles}
          center={center}
          initialCenter={center}
          panControl={true}
          onReady={fetchPlaces}
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
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Map, GoogleApiWrapper, Marker, InfoWindow, Polyline } from 'google-maps-react';
import { getAddressByLatLng } from '../../app/helper/getAddressByLatLng';
import { useSelector } from 'react-redux';
import { getPath } from '../../app/helper/getPath';
import './EditAddress.css'
let oldLocation=true;
/**
 * get gps address
 * @param {*} props 
 */

const GpsAddress=(props)=>{
    const [marker,setMarker]=useState(false);
    const [locationLoaded,setLocationLoaded]=useState(false);
    const[myAddress,setMyAddress]=useState(false);
    const [fullAddress,setFullAddress]=useState({});
    const {location,address}=useSelector(state=>state.UserLocation);
    const [center,setCenter]=useState({  lat:22.241497, lng: 84.861948});
    const [gpsEnabled,setGpsEnabled]=useState(location?true:false);
    const [activeMarker,setActiveMarker]=useState({});
    const [showingInfoWindow,setShowingInfoWindow]=useState(false);
    const [selectedPlace,setSelectedPlace]=useState({});
    const [path,setPath]=useState([]);
    const [currentLocation,setCurrentLocation]=useState(location?{lat:location.latitude,
        lng:location.longitude}:false)
    const [locationFetched,setLocationFetched]=useState(false);
    const [viewBounds,setViewBounds]=useState(false);
    if(oldLocation!==location){
       location?setGpsEnabled(true):setGpsEnabled(false);
       oldLocation=location;
       if(!location)
        return;
        setCenter(currentLocation)
    }
    
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
             setCurrentLocation({lat:place.geometry.location.lat(),lng:place.geometry.location.lng()});
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
    const drawPolyline=(cord1,cord2=currentLocation)=>{

            if(!(cord1.lat===cord2.lat && cord1.lng===cord2.lng))
                getPath(cord1,cord2).then(res=>{
                
                setPath(res);
                setPath(res);
                })          
           
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
        if (location) {
            const latLng={lat:location.latitude,
                lng:location.longitude}
            setCenter(latLng);
            setMarker(location);
            getAddress(location);
       //  drawPolyline(props.sellers[0].position.geopoint,latLng);
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
        const latLng={latitude:cord.latLng.lat(),longitude:cord.latLng.lng()};
        setCurrentLocation({lat:latLng.latitude,lng:latLng.longitude});
        setMarker(latLng);
        getAddress(latLng);
      drawPolyline(props.sellers[0].position.geopoint,{lat:latLng.latitude,lng:latLng.longitude});
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
   
    const onMarkerClick=(props, marker, e)=>{
        drawPolyline({lat:marker.position.lat(),lng:marker.position.lng()});
       setSelectedPlace(props)
       setActiveMarker(marker)
       setShowingInfoWindow(true);
    }
    /**
     * dispay marker in map
     */
   const LocationMarker=()=>{
   
       let pos={
        lat:marker.latitude,
        lng:marker.longitude
       }


    if(marker){
        return(
            <Marker position={pos}
            draggable={true}
            name='My Location'
            address={address}
            onDragend={(t,map,coord)=>markerDraged(coord)}
            onClick={onMarkerClick}
             />
        )
    }else{
        return <></>
    }
    }
   
    if(!gpsEnabled){
        return <h2>Gps is not set</h2>
    } 
    if(!locationLoaded){
        getLocation();
        setLocationLoaded(true);
    }
return(
    <div style={buttonStyle}>
        <Button className='mt-4 mb-3'onClick={()=>drawPolyline(props.sellers[0].position.geopoint)}>
            Get Path
        </Button>
        <div>
            {myAddress?<ViewAddress/>:<></>}
        </div>
        <input type='text' id='searchbox' className='form-control  col-md-4 mt-md-2 col-xs-3 mt-xs-5' size="30" placeholder="Search place in map"/>
        <Map
          google={props.google}
          zoom={13}
          style={mapStyles}
          center={center}
          initialCenter={center}
          panControl={true}
          onReady={fetchPlaces}
        >
            
          { LocationMarker()}
            { props.sellers.map((el,i)=>{
                    return <Marker
                            key={i}
                            name={el.name}
                            address={el.address}
                           position={{
                            lat:el.position.geopoint.latitude,
                            lng:el.position.geopoint.longitude
                           }}
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
           
    </div>
    
)
}
export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_MAP_API_KEY,
  })(GpsAddress);
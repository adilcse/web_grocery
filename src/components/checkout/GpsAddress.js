import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Map, GoogleApiWrapper, Marker, InfoWindow, Polyline } from 'google-maps-react';
import { getAddressByLatLng } from '../../app/helper/getAddressByLatLng';
import { useSelector } from 'react-redux';
import { getPath } from '../../app/helper/getPath';
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
    const [activeMarker,setActiveMarker]=useState({});
    const [showingInfoWindow,setShowingInfoWindow]=useState(false);
    const [selectedPlace,setSelectedPlace]=useState({});
    const [isPath,setIsPath]=useState(false);
    const [path,setPath]=useState([]);
    const [currentLocation,setCurrentLocation]=useState(myLocation?{lat:myLocation.latitude,
        lng:myLocation.longitude}:false)
    if(oldLocation!==myLocation){
       myLocation?setGpsEnabled(true):setGpsEnabled(false);
       oldLocation=myLocation;
       if(!myLocation)
        return;
        setCenter(currentLocation)
    }
    
    const drawPolyline=(cord1,cord2=currentLocation)=>{

        console.log(cord1,cord2)
            getPath(cord1,cord2).then(res=>{
                console.log(res)
               setPath(res);
               setPath(res);
             
            })          
            setIsPath(true);
        }
    
    if(!isPath && marker && currentLocation){
        drawPolyline(props.sellers[0]._geoloc);
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
            const latLng={lat:myLocation.latitude,
                lng:myLocation.longitude}
            setCenter(latLng);
            setMarker(myLocation);
            getAddress(myLocation);
         drawPolyline(props.sellers[0]._geoloc,latLng);
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
      drawPolyline(props.sellers[0]._geoloc,{lat:latLng.latitude,lng:latLng.longitude});
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
        console.log(marker.position.lat())
        drawPolyline({lat:marker.position.lat(),lng:marker.position.lng()});
       setSelectedPlace(props)
       setActiveMarker(marker)
       setShowingInfoWindow(true);
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
            { props.sellers.map((el,i)=>{
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
           
    </div>
    
)
}
export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_MAP_API_KEY,
  })(GpsAddress);
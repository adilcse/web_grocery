import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Map, GoogleApiWrapper, Marker, Polyline } from 'google-maps-react';
import Loading from '../Loading';
const GpsAddress=(props)=>{
    const [marker,setMarker]=useState(false);
    const [center,setCenter]=useState({ lat: 20.3423744, lng: 85.8161152});
    const[myAddress,setMyAddress]=useState(false);
    const [fullAddress,setFullAddress]=useState({});
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
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos=>{
                setCenter( {lat:pos.coords.latitude,
                    lng:pos.coords.longitude});
                setMarker(pos.coords);
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
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=
        ${latLng.latitude+','+latLng.longitude}
        &key=${process.env.REACT_APP_MAP_API_KEY}`)
        .then(res=>{
            return res.json()
        }).then(res=>{
            console.log(res);
            if(res.status==='OK'){
                for(let i=0;i<res.results.length;i++){
                    let element=res.results[i];
                    if(element.types.includes('street_address')
                    ||element.types.includes("point_of_interest")
                    ||element.types.includes("route")){
                        setAddress(element);
                        break;
                    }
                    
                }
            }
        })
    }
    /**
     * set fullAddress and display formatted address
     * @param {*} address address by fetch call to map api
     */
    const setAddress=(address)=>{
        console.log(address)
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
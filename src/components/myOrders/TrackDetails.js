import React from 'react';
import { Button } from 'react-bootstrap';
import { ORDER } from '../../app/constants';
import { useSelector } from 'react-redux';
import TrackMap from './TrackMap';
const TrackDetais=(props)=>{
    const {sellerId}=props.details;
    let sellersDetails={};
    const sellers=useSelector(state=>state.sellers.ids);
    if(sellerId){
        sellersDetails=sellers.find(element=>element.id===sellerId);
    }
    return(
        <>
        <Button className="my-2" onClick={()=>props.changePage(ORDER)}>Back</Button>
        <TrackMap details={{user:props.details.address,seller:sellersDetails}}/>
        </>
    )
}
export default TrackDetais;
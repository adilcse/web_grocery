import React from 'react';
import { Button } from 'react-bootstrap';
import { ORDER } from '../../app/constants';
import { useSelector } from 'react-redux';
import TrackMap from './TrackMap';
const TrackDetais=(props)=>{
    const {seller_id}=props.details;
    let sellersDetails={};
    const sellers=useSelector(state=>state.sellers.ids);
    if(seller_id){
        sellersDetails=sellers.find(element=>element.id===seller_id);
    }
    return(
        <>
        <Button onClick={()=>props.changePage(ORDER)}>Back</Button>
        <TrackMap details={{user:props.details.delivery_address,seller:sellersDetails}}/>
        </>
    )
}
export default TrackDetais;
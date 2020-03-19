import React from 'react';
import { Button } from 'react-bootstrap';
import { ORDER } from '../../app/constants';
import { useSelector } from 'react-redux';
import TrackMap from './TrackMap';
const TrackDetais=(props)=>{
    const {details}=props;
    const sellersIds=new Set();
    const sellersDetails=[];
    const sellers=useSelector(state=>state.sellers.ids);
    if(details.item){
    details.item.forEach(element => {
        sellersIds.add(element.sellerId)
    });
    sellersIds.forEach(el=>{
        sellersDetails.push(sellers.find(element=>element.objectID===el));
    })
    }
   
    return(
        <>
        <Button onClick={()=>props.changePage(ORDER)}>Back</Button>
        <TrackMap details={{user:details.address,seller:sellersDetails}}/>
        </>
    )
}
export default TrackDetais;
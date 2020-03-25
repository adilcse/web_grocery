import React, { useState } from 'react';
import { CardDeck, Card} from 'react-bootstrap';
import ItemCard from './ItemCard';
import StatusCard from './StatusCard';
import { getItemsByIds } from '../../app/helper/getItemsByIds';
import Loading from '../Loading';
import HeaderCard from './HeaderCard';
import {firebase} from '../../firebaseConnect';
import { TRACK } from '../../app/constants';
import { arrayMergeByObject } from '../../app/helper/arrayMergeByObject';

const OrderCard=(props)=>{
    const [displayItems,setDisplayitems]=useState(props.order.items)
    const{order}=props;
    const [loaded,setLoaded]=useState(false);
    const changePage=()=>{
        props.changePage(TRACK,order);
    }
    const getIds=()=>{
        let ids=[];
        order.items.forEach(element => {
        ids.push(element.id)
        });
        return ids;
    }
    if(!loaded ){ 
        let ids=getIds();
        getItemsByIds(ids,'sellerItems',firebase.firestore.FieldPath.documentId()).then((res) => {
             let items=[];
             order.items.forEach((item)=>{
              let data= res.find((element)=>{
               return item.id===element.id
               });
                items.push({...data,...item})
             })   
             return items;
        }).then((items)=>{
            setDisplayitems(items);
            setLoaded(true)});
    }
    if(order && loaded ){
        return (
            <CardDeck className='rounded mb-3'>
            <Card>
                <Card.Header>
                    <HeaderCard orderedOn={order.orderedOn}
                                deleveredOn={order.deleveredOn} 
                                sellerName={order.sellerDetails.name}/>
                </Card.Header>
            <Card.Body>
            <ItemCard items={arrayMergeByObject(displayItems,order.items,'id')} />
            <StatusCard address={order.address} 
                        sellerDetails={order.sellerDetails}
                        paymentMode={order.paymentMode} 
                        total={order.total}
                        status={order.status}   
                        track={changePage}
                        />
            </Card.Body>
            </Card>
        </CardDeck>
        )
       
       }else if(!loaded){
           return(<Loading size={100}/>)
       }
    else{
        return(
            <></>
        )
    }
}
export default OrderCard;
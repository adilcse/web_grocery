import React, { useState } from 'react';
import { CardDeck, Card} from 'react-bootstrap';
import ItemCard from './ItemCard';
import StatusCard from './StatusCard';
import { getItemsByIds } from '../../app/helper/getItemsByIds';
import Loading from '../Loading';
import HeaderCard from './HeaderCard';

import { TRACK } from '../../app/constants';
import { arrayMergeByObject } from '../../app/helper/arrayMergeByObject';
import { useSelector } from 'react-redux';

const OrderCard=(props)=>{
    const{order}=props;
    const sellers=useSelector(state=>state.sellers.ids);
    const [sellerDetails,setSellerDetails]=useState({});
    const [loaded,setLoaded]=useState(false);
    if(sellers.length>0 && !loaded){
        const seller=sellers.find(el=>el.id===order.seller_id);
        if(seller)
            setSellerDetails(seller);
        setLoaded(true);
    }
    const changePage=()=>{
        props.changePage(TRACK,order);
    }
  
    if(order){
        return (
            <CardDeck className='rounded mb-3'>
            <Card>
                <Card.Header>
                    <HeaderCard orderedOn={order.created_at}
                                deleveredOn={order.delivered_at} 
                                sellerName={order.seller_name}
                                />
                </Card.Header>
            <Card.Body>
            <ItemCard items={order.items} />
            <StatusCard address={order.delivery_address} 
                        sellerDetails={sellerDetails}
                        paymentMode={order.payment_mode} 
                            total={{"total": order.total_amount,
                                "refundAmount": order.refund_amount,
                                "deliveryCharges": order.delivery_amount,
                                "total_items": order.total_items,
                                "rejected_items": order.rejected_items}}
                        status={order.status}   
                        track={changePage}
                        />
            </Card.Body>
            </Card>
        </CardDeck>
        )
       
       }
    else{
        return(
            <></>
        )
    }
}
export default OrderCard;
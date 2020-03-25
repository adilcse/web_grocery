import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../redux/actions/OrderAction';
import ErrorMessage from '../app/helper/ErrorMessage';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import OrdersList from '../components/myOrders/OrdersList';
import { ORDER } from '../app/constants';
import TrackDetais from '../components/myOrders/TrackDetails';
const MyOrders=()=>{
    const dispatch=useDispatch();
    const allOrders=useSelector(state=>state.getOrders);
    const user=useSelector(state=>state.userLogin);
    const [currentPage,setCurrentPage]=useState(ORDER);
    const [trackDetails,setTrackDetails]=useState();
    const changePage=(page,details=null)=>{
        setTrackDetails(details);
        setCurrentPage(page);
    }
    if(user.loggedIn){
        if(!allOrders.loaded && !allOrders.loading && !allOrders.isError){
            getOrder(dispatch,user.userId)
        }else if(allOrders.loading){
            return(
                <Loading size={100}/>
            )
        }else if(allOrders.orders.length<=0){
            return(
                <>
                <ErrorMessage isError={true} message={"SORRY!! no Items Found"}/>
                <h2><Link to='/'>Go to home </Link> </h2>
                </>
            )
        }else{
            if(currentPage===ORDER && allOrders.loaded)
           return (
           <OrdersList orders={allOrders.orders} changePage={changePage}/>
           )
           else
            return(<TrackDetais changePage={changePage} details={trackDetails}/>)
        }
    }else if(user.loggingIn){
        return(
            <Loading size={100}/>
        )
    }
    else{
        return(
            <ErrorMessage isError={!user.loggedIn} message={"please login first"}/>
        )
    }

    return(
        <h1>
            My orders
        </h1>
    )

}
export default MyOrders;
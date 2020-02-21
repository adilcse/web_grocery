import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../../redux/actions/CardAction';
import Card from './Card';
const ProductCards =(props)=>{
    const dispatch = useDispatch();
   
    const source = useSelector((state) => (state.addItemsToCart.source))
   
    const onItemAdded = (itemId) => {
        dispatch(addToCart(itemId))
    }
return (
    <div className="container ">
        <div className="row text-center">
       
        {
            source.map((item,id) =>{    
               
                return <Card source={item} key = {id} addItem={onItemAdded} />
            } )
        }
        </div>
    </div>
)
}

export default ProductCards; 
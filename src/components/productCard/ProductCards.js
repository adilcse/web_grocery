import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {AddToCart} from '../../redux/actions/CardAction';
import Card from './Card';

// const mapStateToProps= state =>{
//     console.log(state);
//     return {
//         source : state.source
//     }
// }
// const mapDispatchToProps=(dispatch)=>{
//    return {
//     onItemAdded : (itemId) => dispatch(AddToCart(itemId)) 
//    } 
// }
const ProductCards =(props)=>{
    const dispatch = useDispatch();
    const source = useSelector((state) => (state.source))
    
//    const {source,onItemAdded}=props;
   
    const onItemAdded = (itemId) => {
        dispatch(AddToCart(itemId))
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
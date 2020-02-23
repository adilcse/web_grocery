import React,{useState} from 'react';
import { useDispatch} from 'react-redux';
import {addToCart} from '../../redux/actions/CardAction';
import Card from './Card';
import { db } from '../../firebaseConnect';
import Loading from '../Loading';

let source=[];
const ProductCards =(props)=>{
   


    const dispatch = useDispatch();
    const[loaded,setLoaded]=useState(false);
  
  const onItemAdded = (itemId) => {
    dispatch(addToCart(itemId))
}
    const loadItem=()=>{
        db.collection("products").limit(5).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
               // console.log(doc.id, " => ", doc.data());
               source.push({id:doc.id,data:doc.data()});
               
            });
            setLoaded(true);
        });
    }
   if(!loaded && source.length<1){
    loadItem();
    return(
       <Loading size={120}/>
    )
}
 else{

    return (
        <div className="container ">
            <div className="row text-center">
           
            {
                source.map((item) =>{    
                   
                    return <Card source={item.data} id={item.id} key = {item.id} addItem={onItemAdded} />
                } )
            }
            </div>
        </div>
    )
 }   

}

export default ProductCards; 
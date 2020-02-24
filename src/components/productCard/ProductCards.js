import React,{useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../../redux/actions/CardAction';
import Card from './Card';
import { db } from '../../firebaseConnect';
import Loading from '../Loading';
let called=0;
let source=[];
const ProductCards =(props)=>{
    const dispatch = useDispatch();
    const userid=useSelector(state=>state.userLogin.userId)
    const[loaded,setLoaded]=useState(false);  
  const onItemAdded = (itemId,item) => {
    dispatch(addToCart(itemId,item,userid));
}
let data;
    const loadItem=()=>{
      console.log(++called)
        db.collection("products").limit(5).get().then(function(querySnapshot) {
            console.log(querySnapshot,loaded)
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
console.log(source)
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



export default ProductCards; 
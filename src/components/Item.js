import React from 'react';
const Item =(props)=>{
    const {name,price,description,image}=props.Item;
    return(
        <div className="container">
            <div className="row">
            <div className="col-md-6">
                <img src={props.item.image} style={{width:'100%',height:'100%'}}></img>
            </div>
            <div className="col-md-6">
                <div className="row">
                <h2>{props.item.name}</h2>
                </div>
                <div className="row">
                <h3>Price : Rs.{props.item.price}</h3>
                </div>
            </div>
            </div>
        </div>
    )
}
export default Item;
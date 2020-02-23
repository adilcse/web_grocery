import React from 'react';
const Item =(props)=>{
    const {name,price,description,image,quantity}=props.item;
    return(
        <div className="container">
            <div className="row">
            <div className="col-md-6">
                <img src={image} style={{width:'100%',height:'100%',maxWidth:'500px',maxHeight:'500px'}}></img>
            </div>
            <div className="col-md-6">
                <div className="row">
                <h2>{name} , {quantity}</h2>
                </div>
                <div className="row">
                <h3>Price : Rs.{price}</h3>
                </div>
                <div className="row text-left">
                <p>Description : {description}</p>
                </div>
            </div>
            </div>
        </div>
    )
}
export default Item;
import React from 'react';
import {Button} from 'react-bootstrap';
import './item.css';
import ProductCards from "../../components/productCard/ProductCards";
import '../../assets/images/img2.jpeg';
const Item =(props)=>{
    const {name,price,description,image,quantity}=props.item;
    return(
        <div>
        <div className="container itm">
            <div className="row">
                <div className="col-md-1 bkstyl" ></div>
            <div className="col-md-5">
                <img src={image} style={{width:'100%',height:'100%',maxWidth:'400px',maxHeight:'350px'}}></img>
            </div>
            <div className="col-md-4">
                <div className="row">
                <h2 className="gFont1">{name} , {quantity}</h2>
                </div>
                <div className="row">
                <h3 className="gFont1">Price : Rs.{price}</h3>
                </div>
                <div className="row text-left">
                <p className="gFont2">Description : {description}</p>
                </div>
            </div>
            <div className="col-md-2 buybackground">
                <div className="row"></div>
                <div className="row cntr">
                <div className="col-sm-3"></div>
                <div className="col-sm-6">
                <div className=" btn-group-vertical ">
                <Button variant="primary card-btn ">Buy </Button>
                <Button variant="warning card-btn  ">Add to cart </Button>
                </div>
                </div>
                <div className="col-sm-3"></div>
                </div>
                <div className="row"></div>
                
            </div>
            </div>
        </div>
        <div className="alert alert-dark cntnt"><h3>New arriavals</h3></div>
        <div><i className="dropdown-toggle"></i></div>
            <div className="flexcss">
                <div className="photobanner">
            <img  className="first " src={image} alt="img1" />
            <img  className="sec" src={image} alt="img1" />
            <img  className="sec" src={image} alt="img1" />
            <img  className="sec" src={image} alt="img1" />
            <img  className="sec" src={image} alt="img1" />
            <img  className="sec" src={image} alt="img1" />
            <img  className="sec" src={image} alt="img1" />
            <img  className="sec" src={image} alt="img1" />
            <img  className="sec" src={image} alt="img1" />
            <img  className="sec" src={image} alt="img1" />
            <img  className="sec" src={image} alt="img1" />
            <img  className="sec" src={image} alt="img1" />
            <img  className="sec" src={image} alt="img1" />
            <img  className="sec" src={image} alt="img1" />
            <img  className="sec" src={image} alt="img1" />
            <img  className="sec" src={image} alt="img1" />
            <img  className="sec" src={image} alt="img1" />
            <img  className="sec" src={image} alt="img1" />
            <img  className="sec" src={image} alt="img1" />
        </div>
        </div>
        <div className="alert alert-dark cntnt"><h3>Shop More</h3></div>
        <div><i className="dropdown-toggle"></i></div>
        <ProductCards/>
        </div>
    )
}
export default Item;
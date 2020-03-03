import React from "react";
import { Row, Image } from "react-bootstrap";
const ItemCard=(props)=>{
    const{items}=props;
    console.log(items)
    if(items && items.length>0)
        return(
            <div>
                {items.map((item,index)=>{
                    return(
                        <Row key={index}>
                            {items.name}
                        </Row>
                    )
                })}
            </div>
        )
    else{
        return(<></>)
    }
}
export default ItemCard;
import React from "react";
import { Row } from "react-bootstrap";
const ItemCard=(props)=>{
    const{items}=props;
    if(items && items.length>0)
        return(
            <div>
                {items.map((item,index)=>{
                    return(
                        <Row>
                            data
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
import React from "react";
import { Row,  Media, Col } from "react-bootstrap";
const ItemCard=(props)=>{
    const{items}=props;
    console.log(items)
    if(items && items.length>0)
        return(
            <ul className="list-unstyled">
                {items.map((item,index)=>{
                    
                    return(
                        <Media as="li" className="border-bottom mt-2 pb-1" key={index}>
                            <img
                            width={80}
                            height={80}
                            className="mr-3"
                            src={item.image}
                            alt="Generic placeholder"
                            />
                            <Media.Body className="text-left">
                                <Row>
                                    <Col md='6' xs='12'>
                                    <h5>{item.name}</h5>
                                    <h6 className='text-muted'>Catagory : {item.catagory}</h6>
                                    </Col>
                                    <Col md='3' xs='12'>
                                       
                                       <h5>₹{item.price}</h5>
                                    </Col>
                                    <Col md='3' xs='12'>
                                       
                                    <h6>{item.quantity} ({item.quantity>1?'items':'item'})</h6>
                                    </Col>
                                </Row>
                            </Media.Body>
                        </Media>
                    )
                })}
            </ul>
        )
    else{
        return(<></>)
    }
}
export default ItemCard;
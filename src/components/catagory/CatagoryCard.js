import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
/**
 * display catagory in crd format
 * @param {*} props 
 */
const CatagoryCard=(props)=>{
return(
    <Card style={{ width: '18rem',display:'inline-block' }} className={props.className}>
        <Link to={`/catagories/${props.item.id}`}>
            <Card.Img variant="top" src={props.item.image} />
        </Link>   
    </Card>
)
}
export default CatagoryCard;
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const CatagoryCard=(props)=>{
return(
    <Card style={{ width: '18rem',display:'inline-block' }}>
        <Link to={`/catagories/${props.item.catId}`}>
            <Card.Img variant="top" src={props.item.image} />
        </Link>   
   
  </Card>
)
}
export default CatagoryCard;
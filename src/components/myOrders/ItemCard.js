import React from "react";
import { Row,  Media, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
const ItemCard=(props)=>{
	const{items}=props;
	
	if(items && items.length>0)
		return(
			<ul className="list-unstyled">
				{items.map((item,index)=>{

					return(
						<Media as="li" className={item.accept?'border-bottom mt-2 pb-1':'border-bottom mt-2 pb-1 text-danger'} key={index}>
							<img
							width={80}
							height={80}
							className="mr-3"
							src={item.image}
							alt="Generic placeholder"
							/>
							<Media.Body className="text-left">
								<Row>
									<Col md='5' xs='12'>
									<h5><Link to={`/Product/${item.id}`}>{item.name}</Link></h5>
									<h6 className='text-muted'>Catagory : {item.catagory.join()}</h6>
									</Col>
									<Col md='2' xs='12'>

									   <h5>₹{item.price}</h5>
									</Col>
									<Col md='2' xs='12'>

									<h6>{item.quantity} ({item.quantity>1?'items':'item'})</h6>
									</Col>
									{!item.accept?<Col md='2' xs='12'>
									<h6> Sorry this item can't be delivered</h6>
									</Col>:<></>}
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
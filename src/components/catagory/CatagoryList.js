import React from 'react';
import CatagoryCard from './CatagoryCard';
import { Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
const CatagoryList=(props)=>{
    const cats=useSelector(state=>state.CatagoryReducer.item)
return(
    <Row className='overflow-auto d-inline'>
    {cats.map((item,index)=>{
        return  <CatagoryCard item={item} key={index} className={props.className}/>
    })}
    </Row>
)
}
export default CatagoryList;
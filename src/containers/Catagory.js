import React from 'react';
import ProductCards from '../components/productCard/ProductCards';
import { useParams } from 'react-router';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
const Catagory=()=>{
    const catagory=useSelector(state=>state.CatagoryReducer.item)
    let cat=useParams('cat');
    cat=cat?parseInt(cat.cat):'all';
    const catagories=catagory.length>0?catagory.find(el=>{
        return el.id===cat
    }):cat;
    

return(
    <Container>
        <h1 className='text-left'>Catagory : {catagories.name}</h1>
      <ProductCards catagory={[cat]}/>
    </Container>
)
}
export default Catagory;
import React from 'react';
import ProductCards from '../components/productCard/ProductCards';
import { useParams } from 'react-router';
import { Container } from 'react-bootstrap';
const Catagory=()=>{
    
    let cat=useParams('cat');
    cat=cat?cat.cat:'all';
    document.title='catagory'+cat;
return(
    <Container>
        <h1 className='text-left'>Catagory : {cat}</h1>
      <ProductCards catagory={cat}/>
    </Container>
)
}
export default Catagory;
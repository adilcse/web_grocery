import React, { useState } from 'react'
import { Search, Grid } from 'semantic-ui-react'
import {useHistory} from 'react-router-dom';
import { setSearchResults } from '../redux/actions/SearchAction';
import { useDispatch, useSelector } from 'react-redux';
import { searchProductInDb } from '../app/helper/searchProductInDb';
/**
 * search box component to search different items
 */
const SearchBox=()=>{
   const dispatch=useDispatch();
    let history = useHistory();
   const [value,setValue] = useState('');
   const[isLoading,setIsLoading]=useState(false);
   const[results,setResults]=useState([]);
  const products=useSelector(state=>state.sellers.products);

  const searchChanged=(e,{value})=>{
     setValue(value)
     setIsLoading(true);
     if(products.length<1||value.length<1) return setIsLoading(false);

    let res=searchProductInDb(products,value)
      const items=res.map(element=>{ 
          return{title:element.name,
                description:element.description.slice(0,20).concat('...'),
                image:element.image,
                price:element.price.toString(),
                id:element.id}
              })
    setResults(items);
    setIsLoading(false);
   
    
  }
  const   handleKeyPress = (e)=>{
   
    if(e.key === 'Enter'){
    
      dispatch(setSearchResults(results));

        history.push(`/Search/${value}`)

    }
}
  const handleResultSelect = (e, { result }) =>{
    setValue(result.title)
    history.push(`/Product/${result.id}`);
  };
 
   return(
    <Grid>
        <Grid.Column width={8}>
        <Search
            input={{ icon: 'search', iconPosition: 'left' }}
            loading={isLoading}
            onResultSelect={handleResultSelect}
            onSearchChange={searchChanged}
            results={results}
            onKeyPress={handleKeyPress} 
            value={value}
            
        />
        </Grid.Column>
    
    </Grid>
   )
}
export default SearchBox;
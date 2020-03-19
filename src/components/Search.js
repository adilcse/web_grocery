import React, { useState } from 'react'
import { Search, Grid } from 'semantic-ui-react'
import {useHistory} from 'react-router-dom';
import { setSearchResults } from '../redux/actions/SearchAction';
import { useDispatch, useSelector } from 'react-redux';
import Fuse from 'fuse.js';
const SearchBox=()=>{
   const dispatch=useDispatch();
    let history = useHistory();
   const [value,setValue] = useState('');
   const[isLoading,setIsLoading]=useState(false);
   const[results,setResults]=useState([]);
  const products=useSelector(state=>state.sellers.products);
  const options = {
    shouldSort: true,
    threshold: 0.5,
    location: 0,
    distance: 100,
    minMatchCharLength: 1,
    keys: [
     'name','description'
    ]
  };
  const fuse = new Fuse(products, options);
  const searchChanged=(e,{value})=>{
     setValue(value)
     setIsLoading(true);
     if(products.length<1||value.length<1) return setIsLoading(false);
    let result=fuse.search(value)
    console.log(result);
    let items=[];
    result.forEach(element=>{
      items.push({title:element.item.name,
                  description:element.item.description,
                  image:element.item.image,
                  price:element.item.price.toString(),
                  id:element.item.id});
    })
    console.log(items);
    setResults(items);
    setIsLoading(false);
   
    
  }
  const   handleKeyPress = (e)=>{
   
    if(e.key === 'Enter'){
      console.log(value);
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
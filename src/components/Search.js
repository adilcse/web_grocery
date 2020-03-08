import React, { useState } from 'react'
import { Search, Grid } from 'semantic-ui-react'
import {useHistory} from 'react-router-dom';

import { setSearchResults } from '../redux/actions/SearchAction';
import { useDispatch } from 'react-redux';
import {searchProductInDb} from '../app/helper/searchProductInDb';

const SearchBox=()=>{
   const dispatch=useDispatch();
    let history = useHistory();
   const [value,setValue] = useState('');
   const[isLoading,setIsLoading]=useState(false);
   const[results,setResults]=useState([]);

  const searchChanged=(e,{value})=>{
     
     setValue(value)
     setIsLoading(true);
     searchProductInDb(value).then(result=>{
         if(!result){
            setIsLoading(false);
            return;
         }
        let arr=[];
        result.forEach(item=>{
            arr.push({
                title:item.name,
                price:'₹ '+item.price.toString(),
                image:item.image,
                id:item.objectID
            })
        });
        setResults(arr);
        setIsLoading(false);
     })
   
    
  }
  const   handleKeyPress = (e)=>{
   
    if(e.key === 'Enter'){
      console.log(value);
      dispatch(setSearchResults(results));

        history.push(`/Search/${value}`)

    }
}
  const handleResultSelect = (e, { result }) =>{
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
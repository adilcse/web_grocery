import React from 'react'
import { Search, Grid } from 'semantic-ui-react'
import {useHistory} from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { setSearchField } from "../redux/actions/SearchAction";

const SearchBox=()=>{
    const dispatch = useDispatch();
    let history = useHistory();
   const searchState = useSelector((state) => (state.searchProduct));


  const searchChanged=(e,{value})=>{
      dispatch(setSearchField(value));
  }
  const   handleKeyPress = (e)=>{
   
    if(e.key === 'Enter'){
      console.log(value);
        history.push(`/Search/${value}`)
     

      
    }
}
  const handleResultSelect = (e, { result }) =>  dispatch(setSearchField(result.title));
  const {value,isLoading,results} = searchState;
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
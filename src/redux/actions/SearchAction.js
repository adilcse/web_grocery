import {
    CHANGE_SEARCH_FIELD,
} from '../../app/ActionConstants';

export const setSearchResults=(results)=>({
    type: CHANGE_SEARCH_FIELD,
    payload: results
});



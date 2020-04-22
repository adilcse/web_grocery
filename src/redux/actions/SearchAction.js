import {
    CHANGE_SEARCH_FIELD,
} from '../../app/ActionConstants';
/**
 * store search item in redux store 
 * @param {*} results search result of items
 */
export const setSearchResults=(results)=>({
    type: CHANGE_SEARCH_FIELD,
    payload: results
});



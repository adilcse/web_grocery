
import { LARAVEL_API_URL } from "../constants";

/**
 * get catagories available from database bu calling api
 */
export const getCatagoriesFromAPI=()=>{
    return fetch(`${LARAVEL_API_URL}/getCatagory`)
            .then(res=>{
                return res.json()})
            .then(data=>{
                return data;
            })
            .catch(err=>{
                console.log(err)
                return [];
            });
}
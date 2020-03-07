import{CHANGE_USER_TYPE} from '../../app/ActionConstants';
export const CurrentUser=(dispatch,user)=>{
    dispatch({type:CHANGE_USER_TYPE,payload:user})
}

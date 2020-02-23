import {ADD_TO_CART} from '../../app/ActionConstants';
import vegs from '../../assets/images/vegs.png';
import slideimg1 from '../../assets/images/img2.jpeg';
import slideimg2 from '../../assets/images/img3.jpg';
import slideimg3 from '../../assets/images/img4.jpg';


const initialState={
   cart:new Set()
    
}
export const addItemsToCart = (state=initialState,action={})=>{
    switch(action.type){
        case  ADD_TO_CART:
            // const index = state.source.findIndex(function(element){
            //     return (element.id === action.payload)
            // }) 
            // let Nstate=[...state.source];
            //  Nstate[index]={
            //     ...state.source[index],
            //     inCart:true
            // }

            // console.log(Nstate);
             let Ncart =new Set([...state.cart]);
            // console.log(Ncart)
           Ncart.add(action.payload);
            return {...state,cart:Ncart} ;
        default : 
        return state;
    }
}
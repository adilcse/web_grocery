import {ADD_TO_CART} from '../../app/ActionConstants';
import vegs from '../../assets/images/vegs.png';
import slideimg1 from '../../assets/images/img2.jpeg';
import slideimg2 from '../../assets/images/img3.jpg';
import slideimg3 from '../../assets/images/img4.jpg';


const initialState={
    source : [
        {
            imageurl: vegs,
            name: 'vegs',
            price: '500',
            id : 1,
            inCart : false

           
          }, {
            imageurl: vegs,
            name: 'maggie',
            price: '800',
            id : 2,
            inCart : false
           
          } , {
            imageurl: vegs,
            name: 'maggie',
            price: '800',
            id : 3,
            inCart : false
           
          } , {
            imageurl: vegs,
            name: 'maggie',
            price: '800',
            id : 4,
            inCart : false
           
          } ,
         {
            imageurl: vegs,
            name: 'maggie',
            price: '800',
            id : 5,
            inCart : false
           
          } 
    ],
    slider:[{
      imageurl : slideimg1
    },
    {
      imageurl : slideimg2
    },
    {
      imageurl : slideimg3
    }]
}
export const addItemsToCart = (state=initialState,action={})=>{
    switch(action.type){
        case  ADD_TO_CART:
            const index = state.source.findIndex(function(element){
                return (element.id === action.payload)
            }) 
            let Nstate=[...state.source];
             Nstate[index]={
                ...state.source[index],
                inCart:true
            }

            // console.log(Nstate);
            return {...state,source :Nstate };
        default : 
        return state;
    }
}
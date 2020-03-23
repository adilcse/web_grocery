import { ACCEPT, OUT_FOR_DELIVERY, DELIVERED } from "../constants";

export const changeStatusText=(st)=>{
    switch(st){
        case ACCEPT:
            return ACCEPT;
        case OUT_FOR_DELIVERY:
            return 'OUT FOR DELIVERY';
            
        case DELIVERED:
            return DELIVERED;
        default:
            return st;
    }
}
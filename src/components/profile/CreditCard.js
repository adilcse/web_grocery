import React from 'react';
import chip from '../../assets/images/chip.jpg'
import {paymentStyle} from './CardStyle';
    const CreditCard=(props)=>{
        return(
            <div style={paymentStyle.body} {...props}>
            <span style={paymentStyle.logo}> Visa </span>
            <img alt="chip" style={paymentStyle.chip} src={chip}/>
            <h5 style={paymentStyle.number}>XXXX   XXXX   XXXX   1234</h5>
            <div style={{display:"flex",marginLeft:"70px"}}>
                <span style={paymentStyle.expireText}>VALID  THRU</span>
                <span style={paymentStyle.date}>12 / 24</span>
            </div>
            <span style={paymentStyle.name}>CARD HOLDER NAME</span>
            </div>
        )
    }
export default CreditCard
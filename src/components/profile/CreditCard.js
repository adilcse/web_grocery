import React from 'react';
import chip from '../../assets/images/chip.jpg'
import {paymentStyle} from './CardStyle';
    const CreditCard=(props)=>{
        return(
            <div style={paymentStyle.body} {...props} className="col-lg-12 col-md-10 col-sm-12  h-auto m-auto">
            <span style={paymentStyle.logo}> Visa </span>
            <img alt="chip" style={paymentStyle.chip} src={chip}/>
            <p style={paymentStyle.number} className="h5">XXXX   XXXX   XXXX   1234</p>
            <div style={{display:"flex",marginLeft:"70px"}}>
                <span style={paymentStyle.expireText}>VALID  THRU</span>
                <span style={paymentStyle.date}>12 / 24</span>
            </div>
            <span style={paymentStyle.name}>CARD HOLDER NAME</span>
            </div>
        )
    }
export default CreditCard
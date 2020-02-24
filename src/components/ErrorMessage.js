import React from 'react';
const ErrorMessage=(props)=>{
    return(
        <div className={props.className} role="alert">
            {props.message}
        </div>
    )
}
export default ErrorMessage;
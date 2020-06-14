import React from 'react';
import { connect } from 'react-redux'
import '../../custom.css'

const Alert = ({alerts}) => {
    
    return alerts !==null && 
    alerts.length >0 && 
    alerts.map((alert)=>(
        <div key={alert.id} style={{ 'borderRadius':'10px'  ,'color':'#fff','backgroundColor':`${alert.alertType ==='danger'?`maroon`:`lime`}` }} className={`alert alert-${alert.alertType   }`}>
        {alert.msg}
        </div>
    ));

    
}
 
const zstate = state =>{
    return({
        alerts:state.alert
    })
}
export default connect(zstate)(Alert);
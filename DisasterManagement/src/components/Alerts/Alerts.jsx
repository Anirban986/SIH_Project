import React from 'react'
import './Alerts.css'
import alert from '../../assets/alert.svg'
function Alerts() {
  return (
    <div className='alerts'>
    <div className="alert-top">
      <h1>Alert Center</h1>
      <p>Real-time disaster alerts and warnings for educational institutions</p>
    </div>
    <div className="alert-bottom">
      <div className="alert-img"><img src={alert} alt="" /></div>
      <h1>Login for Real-time Alerts</h1>
      <p>Sign in to receive personalized disaster alerts and notifications.</p>
    </div>
    </div>
  )
}

export default Alerts
import React from 'react'
import './Footer.css'
function Footer() {
  return (
    <div className='footer'>
        <div className='footer-top'>
            <div className='footer-col'>
                <h1>Disastra</h1>
                <p className='footer-p'>Building disaster-resilient educational institutions across India through innovative education and technology.</p>
            </div>
            <div className="footer-col">
                <h1>Features</h1>
                <p>Interactive Learning</p>
                <p>Virtual Drills</p>
                <p>Safety Games</p>
                <p>Admin Dashboard</p>
            </div>
             <div className="footer-col">
                <h1>Emergency</h1>
                <p>All Emergency: 112</p>
                <p>NDMA: 1078</p>
                <p>Disaster Cell: 1070</p>
                <p>Child Helpline: 1098</p>
            </div>
            <div className="footer-col">
                <h1>Partners</h1>
                <p>NDMA</p>
                <p>CBSE</p>
                <p>UGC</p>
                <p>AICTE</p>
                <p>NCERT</p>
            </div>
        </div>
        <hr  />
        <div className='footer-bottom'>
            <p>© 2025 Disastra. Building safer educational institutions for a resilient India.</p>
        </div>
    </div>
  )
}

export default Footer
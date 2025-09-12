import React from 'react'
import './Emergency.css'
import call from '../../assets/call.svg'
import learn from '../../assets/learn.svg'
import download from '../../assets/download.svg'
import { motion } from "framer-motion"
import { easeInOut } from "framer-motion";
function Emergency() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: easeInOut }} 
      className='emergency'>
      <div className="emergency-top">
        <h1>Emergency Contacts</h1>
        <p>Important emergency numbers for India</p>
      </div>
      <div className="emergency-bottom">

        <div className="emergency-bottom-block">
          <div className="block-top">
            <div className="block-top-1">
              <img src={call} alt="" />
            </div>
            <div className="block-top-2">
              <h2>Emergency Services</h2>
              <h1>112</h1>
            </div>

          </div>
          <div className="block-bottom">
            <p >All Emergency Services (Police, Fire, Medical)</p>
            <div className="block-bottom-call">
              <img src={call} alt="" />
              <p>Call Now</p>
            </div>
          </div>
        </div>


        <div className="emergency-bottom-block">
          <div className="block-top">
            <div className="block-top-1">
              <img src={call} alt="" />
            </div>
            <div className="block-top-2">
              <h2>School Safety Helpline</h2>
              <h1>1098</h1>
            </div>

          </div>
          <div className="block-bottom">
            <p>Child helpline for school emergencies</p>
            <div className="block-bottom-call">
              <img src={call} alt="" />
              <p>Call Now</p>
            </div>
          </div>
        </div>


        <div className="emergency-bottom-block">
          <div className="block-top">
            <div className="block-top-1">
              <img src={call} alt="" />
            </div>
            <div className="block-top-2">
              <h2>NDMA Helpline</h2>
              <h1>1078</h1>
            </div>

          </div>
          <div className="block-bottom">
            <p>National Disaster Management Authority</p>
            <div className="block-bottom-call">
              <img src={call} alt="" />
              <p>Call Now</p>
            </div>
          </div>
        </div>


        <div className="emergency-bottom-block">
          <div className="block-top">
            <div className="block-top-1">
              <img src={call} alt="" />
            </div>
            <div className="block-top-2">
              <h2>Disaster Management Cell</h2>
              <h1>1070</h1>
            </div>

          </div>
          <div className="block-bottom">
            <p>State Disaster Response Force</p>
            <div className="block-bottom-call">
              <img src={call} alt="" />
              <p>Call Now</p>
            </div>
          </div>
        </div>
      </div>

      <div className="emergency-foot">
        <div className="emergency-foot-1">
          <img src={learn} alt="" />
          <h2>Educational Resources</h2>
        </div>
        <div className="emergency-foot-block">
          <div className="emergency-foot-blocks">
            <div className="block1">
              <h1>NDMA Guidelines for Schools</h1>
              <div className='brand'>Official</div>
            </div>
            <div className="para"><p>Official disaster management guidelines from National Disaster Management Authority.</p></div>
            <div className="download">
              <img src={download} alt="" />
              <p>Download</p>
            </div>
          </div>

          <div className="emergency-foot-blocks">
            <div className="block1">
              <h1>Earthquake Safety for Students</h1>
              <div className='brand'>Safety</div>
            </div>
            <div className="para"><p>Comprehensive guide for earthquake preparedness in Indian schools.</p></div>
            <div className="download">
              <img src={download} alt="" />
              <p>Download</p>
            </div>
          </div>

          <div className="emergency-foot-blocks">
            <div className="block1">
              <h1>Monsoon Flood Response Plan</h1>
              <div className='brand'>Emergenc</div>
            </div>
            <div className="para"><p>Emergency procedures during monsoon flooding and waterlogging.</p></div>
            <div className="download">
              <img src={download} alt="" />
              <p>Download</p>
            </div>
          </div>

          <div className="emergency-foot-blocks">
            <div className="block1">
              <h1>Fire Safety Protocols</h1>
              <div className='brand'>Fire Safety</div>
            </div>
            <div className="para"><p>Fire prevention and evacuation procedures for educational institutions.</p></div>
            <div className="download">
              <img src={download} alt="" />
              <p>Download</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Emergency
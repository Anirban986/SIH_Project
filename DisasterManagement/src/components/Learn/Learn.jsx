import React from 'react'
import './learn.css'
import achievement from '../../assets/achievement.svg'
import trophy from '../../assets/trophy.svg'
import clock from '../../assets/clock.svg'
import LearningNav from '../learning-folder/learning-nav/LearningNav'
import ChatbotPopup from '../chatbot/ChatbotPopup';
import { useState, useEffect } from 'react'
import { motion } from "framer-motion"
function Learn() {
  const [showBot, setShowBot] = useState(false)
  const [user, setUser] = useState(null);
  // ✅ Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    const role = localStorage.getItem("role");
    if (token && userName && role) {
      setUser({ name: userName, role });
    } else {
      setUser(null);
    }
  }, []);

  //when not logged in
  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className='learn'>
        <div className="learning-top">
          <h1>Learning Center</h1>
          <p>Interactive disaster preparedness modules for Educational Institutions</p>
        </div>

        <div className="learning-top-blocks">
          <div className="learning-top-block">
            <div className="learning-top-block-img">
              <img src={achievement} alt="" />
            </div>
            <div className="learning-top-block-texts">
              <p>Completed Modules</p>
              <h1>1/6</h1>
            </div>
          </div>

          <div className="learning-top-block">
            <div className="learning-top-block-img">
              <img src={trophy} alt="" />
            </div>
            <div className="learning-top-block-texts">
              <p>Overall Progress</p>
              <h1>31%</h1>
            </div>
          </div>




          <div className="learning-top-block">
            <div className="learning-top-block-img">
              <img src={clock} alt="" />
            </div>
            <div className="learning-top-block-texts">
              <p>Learning Hours</p>
              <h1>1h</h1>
            </div>
          </div>

        </div>

        <LearningNav />


      </motion.div>
    )
  }

  // logged in
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className='learn'>
      <div className="learning-top-login">
        <div className="learning-top-login-seg1">
          <h1>Learning Center</h1>
          <p>Interactive disaster preparedness modules for Educational Institutions</p>
        </div>
        <div className='disastrabot'>
          <div onClick={() => setShowBot(true)} className="chatbot-trigger">
            DisastraBot
          </div>
          {showBot && <ChatbotPopup onClose={() => setShowBot(false)} />}

        </div>

      </div>

      <div className="learning-top-blocks">


        <div className="learning-top-block">
          <div className="learning-top-block-img">
            <img src={achievement} alt="" />
          </div>
          <div className="learning-top-block-texts">
            <p>Completed Modules</p>
            <h1>1/6</h1>
          </div>
        </div>

        <div className="learning-top-block">
          <div className="learning-top-block-img">
            <img src={trophy} alt="" />
          </div>
          <div className="learning-top-block-texts">
            <p>Overall Progress</p>
            <h1>31%</h1>
          </div>
        </div>




        <div className="learning-top-block">
          <div className="learning-top-block-img">
            <img src={clock} alt="" />
          </div>
          <div className="learning-top-block-texts">
            <p>Learning Hours</p>
            <h1>1h</h1>
          </div>
        </div>

      </div>

      <LearningNav />


    </motion.div>
  )
}

export default Learn
import React from 'react'
import './learn.css'
import achievement from '../../assets/achievement.svg'
import trophy from '../../assets/trophy.svg'
import clock from '../../assets/clock.svg'
import LearningNav from '../learning-folder/learning-nav/LearningNav'
function Learn() {
  return (
    <div className='learn'>
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
      
      <LearningNav/>

      
    </div>
  )
}

export default Learn
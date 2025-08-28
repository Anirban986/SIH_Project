import React from 'react'
import './Home.css'
import school from '../../assets/school.svg'
import student from '../../assets/student.svg'
import trophy from '../../assets/trophy.svg'
import map from '../../assets/map.svg'
import activity from '../../assets/activity.svg'
import achievement from '../../assets/achievement.svg'
import safty from '../../assets/safty.svg'

import { Link } from 'react-router'
function Home() {
    return (
        <div className='home'>
            <div className="hero">
                <h1>Empowering Schools and Colleges with <span>Disaster Preparedness</span></h1>
                <p>Interactive learning platform for Indian schools and colleges to build disaster resilience through education, virtual drills, and gamified safety training.</p>
            </div>
            <div className="section1">
                <div className="section-items">
                    <img src={school} alt="" />
                    <h1>1234+</h1>
                    <p>Schools enrolled</p>
                </div>
                <div className="section-items">
                    <img src={student} alt="" />
                    <h1>1234+</h1>
                    <p>Students trained</p>
                </div>
                <div className="section-items">
                    <img src={trophy} alt="" />
                    <h1>1234+</h1>
                    <p>Drills completed</p>
                </div>
                <div className="section-items">
                    <img src={achievement} alt="" />
                    <h1>60%</h1>
                    <p>Safty Score</p>
                </div>
            </div>

            <div className="section2">
                <Link className='sec-link' to='/Learn' ><div className="button">Starting learning</div></Link>
                <Link className='sec-link' to='/Vertual' ><div className="button-white">Try Virtual Drills</div></Link>
            </div>

            <div className="section3">
                <div className="section3-items">
                    <img src={map} alt="" />
                    <h1>Interactive Learning</h1>
                    <p>Region-specific disaster education modules</p>
                </div>
                <div className="section3-items">
                    <img src={activity} alt="" />
                    <h1>Virtual Drills</h1>
                    <p>Practice emergency procedures safely</p>
                </div>
                <div className="section3-items">
                    <img src={safty} alt="" />
                    <h1>Safety Games</h1>
                    <p>Learn through engaging gameplay</p>
                </div>
            </div>
        </div>
    )
}

export default Home
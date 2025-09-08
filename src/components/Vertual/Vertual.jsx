import React from 'react'
import './Vertual.css'

import vertual from '../../assets/vertual.svg'
import earth from '../../assets/earth.svg'
import fire from '../../assets/fire.svg'
import water from '../../assets/water.svg'
import peaple from '../../assets/peaple.svg'
import clock from '../../assets/clock.svg'
import score from '../../assets/score.svg'
import achievement from '../../assets/achievement.svg'
import play from '../../assets/play.svg'
import lock from '../../assets/lock.svg'

function Vertual() {
  // ✅ Drill Data Array
  const drills = [
    {
      id: 1,
      title: "Earthquake Emergency Drill",
      tag: "basic",
      description: "Practice drop, cover, and hold procedures during seismic activity.",
      img: earth,
      points: 100,
      players: 100,
      rating: 4.6,
      objectives: [
        "Execute proper drop, cover, and hold technique",
        "Identify safe spots in classrooms and corridors",
      ],
      lastConducted: "8/22/2025",
    },
    {
      id: 2,
      title: "Fire Evacuation Drill",
      tag: "basic",
      description: "Navigate emergency exits and assembly points during fire emergency.",
      img: fire,
      points: 100,
      players: 100,
      rating: 4.6,
      objectives: [
        "Identify nearest emergency exits",
        "Follow evacuation routes safely",
      ],
      lastConducted: "8/22/2025",
    },
    {
      id: 3,
      title: "Flood Safety Drill",
      tag: "basic",
      description: "Respond to sudden flooding and move to higher ground safely.",
      img: water,
      points: 100,
      players: 100,
      rating: 4.6,
      objectives: [
        "Recognize flood warning signs",
        "Navigate to higher floors safely",
      ],
      lastConducted: "8/22/2025",
    },
    {
      id: 4,
      title: "Lockdown Procedure",
      tag: "basic",
      description: "Secure classroom and follow lockdown protocols for security threats.",
      img: lock,
      points: 100,
      players: 100,
      rating: 4.6,
      objectives: [
        "Secure classroom entrances",
        "Maintain silence and calm",
      ],
      lastConducted: "8/22/2025",
    },
  ];

  return (
    <div className='vertual'>
      <div className="vertual-top">
        <h1>Emergency Drills</h1>
        <p>Practice emergency procedures through interactive simulations</p>
      </div>

      {/* Stats Section */}
      <div className="vertual-mid-container">
        <div className="vertual-block-mid-member">
          <img src={vertual} alt="" />
          <h1>10</h1>
          <p>Drills Completed</p>
        </div>
        <div className="vertual-block-mid-member">
          <img src={score} alt="" />
          <h1>79%</h1>
          <p>Average Score</p>
        </div>
        <div className="vertual-block-mid-member">
          <img src={clock} alt="" />
          <h1>4.2m</h1>
          <p>Avg Response Time</p>
        </div>
        <div className="vertual-block-mid-member">
          <img src={achievement} alt="" />
          <h1>5</h1>
          <p>Badges Earned</p>
        </div>
      </div>

      {/* Drill Cards */}
      <div className="vertual-bottom-container">
        {drills.map((drill) => (
          <div className="vertual-block" key={drill.id}>
            <div className="vertual-block-top">
              <div className="vertual-block-top-img">
                <img src={drill.img} alt={drill.title} />
              </div>
              <div className="vertual-block-texts">
                <div className="vertual-block-text">
                  <h1>{drill.title}</h1>
                  <div className="tag">{drill.tag}</div>
                </div>
                <div className="p"><p>{drill.description}</p></div>
              </div>
            </div>

            <div className="vertual-block-mid">
              <div className="vertual-block-mid-members">
                <img src={clock} alt="points" />
                <h1>{drill.points}</h1>
                <p>Points</p>
              </div>
              <div className="vertual-block-mid-members">
                <img src={peaple} alt="players" />
                <h1>{drill.players}</h1>
                <p>Players</p>
              </div>
              <div className="vertual-block-mid-members">
                <img src={score} alt="rating" />
                <h1>{drill.rating}</h1>
                <p>Rating</p>
              </div>
            </div>

            <div className="objective">
              <h1>Learning Objectives:</h1>
              <div className="objectives">
                {drill.objectives.map((obj, index) => (
                  <p key={index}>{index + 1}. {obj}</p>
                ))}
              </div>
              <p>Last conducted: {drill.lastConducted}</p>
            </div>

            <div className="vertual-block-bottom">
              <div className="vertual-play">
                <img src={play} alt="play" />
                <p>Start Drill</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Vertual

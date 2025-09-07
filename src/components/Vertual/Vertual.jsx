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
  return (
    <div className='vertual'>
      <div className="vertual-top">
        <h1>Emergency Drills</h1>
        <p>Practice emergency procedures through interactive simulations</p>
      </div>

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

      <div className="vertual-bottom-container">
        <div className="vertual-block">
          <div className="vertual-block-top">
            <div className="vertual-block-top-img">
              <img src={earth} alt="" />
            </div>
            <div className="vertual-block-texts">
              <div className="vertual-block-text">
                <h1>Earthquake Emergency Drill</h1>
                <div className="tag">basic</div>
              </div>
              <div className="p"><p>Practice drop, cover, and hold procedures during seismic activity.</p></div>
            </div>
          </div>
          <div className="vertual-block-mid">
            <div className="vertual-block-mid-members">
              <img src={clock} alt="" />
              <h1>100</h1>
              <p>Points</p>
            </div>
            <div className="vertual-block-mid-members">
              <img src={peaple} alt="" />
              <h1>100</h1>
              <p>Players</p>
            </div>
            <div className="vertual-block-mid-members">
              <img src={score} alt="" />
              <h1>4.6</h1>
              <p>Rating</p>
            </div>
          </div>

          <div className="objective">
            <h1>Learning Objectives:</h1>
            <div className="objectives">
              <p>1. Execute proper drop, cover, and hold technique</p>
              <p>2. Identify safe spots in classrooms and corridors</p>
            </div>
            <p>Last conducted: 8/22/2025</p>
          </div>

          <div className="vertual-block-bottom">
            <div className="vertual-play">
              <img src={play} alt="" />
              <p>Start Drill</p>
            </div>
          </div>
        </div>


        <div className="vertual-block">
          <div className="vertual-block-top">
            <div className="vertual-block-top-img">
              <img src={fire} alt="" />
            </div>
            <div className="vertual-block-texts">
              <div className="vertual-block-text">
                <h1>Fire Evacuation Drill</h1>
                <div className="tag">basic</div>
              </div>
              <div className="p"><p>Navigate emergency exits and assembly points during fire emergency</p></div>
            </div>
          </div>
          <div className="vertual-block-mid">
            <div className="vertual-block-mid-members">
              <img src={clock} alt="" />
              <h1>100</h1>
              <p>Points</p>
            </div>
            <div className="vertual-block-mid-members">
              <img src={peaple} alt="" />
              <h1>100</h1>
              <p>Players</p>
            </div>
            <div className="vertual-block-mid-members">
              <img src={score} alt="" />
              <h1>4.6</h1>
              <p>Rating</p>
            </div>
          </div>

          <div className="objective">
            <h1>Learning Objectives:</h1>
            <div className="objectives">
              <p>1. Identify nearest emergency exits</p>
              <p>2. Follow evacuation routes safely</p>
            </div>
            <p>Last conducted: 8/22/2025</p>
          </div>

          <div className="vertual-block-bottom">
            <div className="vertual-play">
              <img src={play} alt="" />
              <p>Start Drill</p>
            </div>
          </div>
        </div>


        <div className="vertual-block">
          <div className="vertual-block-top">
            <div className="vertual-block-top-img">
              <img src={water} alt="" />
            </div>
            <div className="vertual-block-texts">
              <div className="vertual-block-text">
                <h1>Earthquake Emergency Drill</h1>
                <div className="tag">basic</div>
              </div>
              <div className="p"><p>Respond to sudden flooding and move to higher ground safely.</p></div>
            </div>
          </div>
          <div className="vertual-block-mid">
            <div className="vertual-block-mid-members">
              <img src={clock} alt="" />
              <h1>100</h1>
              <p>Points</p>
            </div>
            <div className="vertual-block-mid-members">
              <img src={peaple} alt="" />
              <h1>100</h1>
              <p>Players</p>
            </div>
            <div className="vertual-block-mid-members">
              <img src={score} alt="" />
              <h1>4.6</h1>
              <p>Rating</p>
            </div>
          </div>

          <div className="objective">
            <h1>Learning Objectives:</h1>
            <div className="objectives">
              <p>1. Recognize flood warning signs</p>
              <p>2. Navigate to higher floors safely</p>
            </div>
            <p>Last conducted: 8/22/2025</p>
          </div>

          <div className="vertual-block-bottom">
            <div className="vertual-play">
              <img src={play} alt="" />
              <p>Start Drill</p>
            </div>
          </div>
        </div>


        <div className="vertual-block">
          <div className="vertual-block-top">
            <div className="vertual-block-top-img">
              <img src={lock} alt="" />
            </div>
            <div className="vertual-block-texts">
              <div className="vertual-block-text">
                <h1>Lockdown Procedure</h1>
                <div className="tag">basic</div>
              </div>
              <div className="p"><p>Secure classroom and follow lockdown protocols for security threats.</p></div>
            </div>
          </div>
          <div className="vertual-block-mid">
            <div className="vertual-block-mid-members">
              <img src={clock} alt="" />
              <h1>100</h1>
              <p>Points</p>
            </div>
            <div className="vertual-block-mid-members">
              <img src={peaple} alt="" />
              <h1>100</h1>
              <p>Players</p>
            </div>
            <div className="vertual-block-mid-members">
              <img src={score} alt="" />
              <h1>4.6</h1>
              <p>Rating</p>
            </div>
          </div>

          <div className="objective">
            <h1>Learning Objectives:</h1>
            <div className="objectives">
              <p>1. Secure classroom entrances</p>
              <p>2. Maintain silence and calm</p>
            </div>
            <p>Last conducted: 8/22/2025</p>
          </div>

          <div className="vertual-block-bottom">
            <div className="vertual-play">
              <img src={play} alt="" />
              <p>Start Drill</p>
            </div>
          </div>
        </div>



      </div>
    </div>
  )
}

export default Vertual
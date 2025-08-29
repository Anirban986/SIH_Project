import React from 'react'
import './Safty.css'
import cyclone from '../../assets/cyclone.svg'
import earth from '../../assets/earth.svg'
import fire from '../../assets/fire.svg'
import water from '../../assets/water.svg'
import peaple from '../../assets/peaple.svg'
import trophy from '../../assets/trophy.svg'
import game from '../../assets/game.svg'
import achievement from '../../assets/achievement.svg'
function Safty() {
  return (
    <div className='safty'>
      <div className="safty-top">
        <h1>Safety Games</h1>
        <p>Learn disaster preparedness through fun and engaging games</p>
      </div>

      <div className="safty-container">
        <div className="safty-block">
          <div className="safty-block-top">
            <div className="safty-block-top-img">
              <img src={earth} alt="" />
            </div>
            <div className="safty-block-texts">
              <div className="safty-block-text">
                <h1>Earthquake Hero</h1>
                <div className="tag">Easy</div>
              </div>
              <div className="p"><p>Navigate through different scenarios during an earthquake and make the right choices.</p></div>
            </div>
          </div>
          <div className="safty-block-mid">
            <div className="safty-block-mid-members">
              <img src={trophy} alt="" />
              <h1>100</h1>
              <p>Points</p>
            </div>
            <div className="safty-block-mid-members">
              <img src={peaple} alt="" />
              <h1>100</h1>
              <p>Players</p>
            </div>
            <div className="safty-block-mid-members">
              <img src={achievement} alt="" />
              <h1>4.6</h1>
              <p>Rating</p>
            </div>
          </div>
          <div className="safty-block-bottom">
            <div className="safty-play">
              <img src={game} alt="" />
              <p>Play Game</p>
            </div>
          </div>
        </div>


       <div className="safty-block">
          <div className="safty-block-top">
            <div className="safty-block-top-img">
              <img src={fire} alt="" />
            </div>
            <div className="safty-block-texts">
              <div className="safty-block-text">
                <h1>Fire Safety Champion</h1>
                <div className="tag">Medium</div>
              </div>
              <div className="p"><p>Help students evacuate safely from a burning building.</p></div>
            </div>
          </div>
          <div className="safty-block-mid">
            <div className="safty-block-mid-members">
              <img src={trophy} alt="" />
              <h1>100</h1>
              <p>Points</p>
            </div>
            <div className="safty-block-mid-members">
              <img src={peaple} alt="" />
              <h1>100</h1>
              <p>Players</p>
            </div>
            <div className="safty-block-mid-members">
              <img src={achievement} alt="" />
              <h1>4.6</h1>
              <p>Rating</p>
            </div>
          </div>
          <div className="safty-block-bottom">
            <div className="safty-play">
              <img src={game} alt="" />
              <p>Play Game</p>
            </div>
          </div>
        </div>


       <div className="safty-block">
          <div className="safty-block-top">
            <div className="safty-block-top-img">
              <img src={water} alt="" />
            </div>
            <div className="safty-block-texts">
              <div className="safty-block-text">
                <h1>Flood Rescue Mission</h1>
                <div className="tag">Hard</div>
              </div>
              <div className="p"><p>Coordinate rescue operations during flooding in your city.</p></div>
            </div>
          </div>
          <div className="safty-block-mid">
            <div className="safty-block-mid-members">
              <img src={trophy} alt="" />
              <h1>100</h1>
              <p>Points</p>
            </div>
            <div className="safty-block-mid-members">
              <img src={peaple} alt="" />
              <h1>100</h1>
              <p>Players</p>
            </div>
            <div className="safty-block-mid-members">
              <img src={achievement} alt="" />
              <h1>4.6</h1>
              <p>Rating</p>
            </div>
          </div>
          <div className="safty-block-bottom">
            <div className="safty-play">
              <img src={game} alt="" />
              <p>Play Game</p>
            </div>
          </div>
        </div>


       <div className="safty-block">
          <div className="safty-block-top">
            <div className="safty-block-top-img">
              <img src={cyclone} alt="" />
            </div>
            <div className="safty-block-texts">
              <div className="safty-block-text">
                <h1>Cyclone Preparedness</h1>
                <div className="tag">Medium</div>
              </div>
              <div className="p"><p>Prepare your coastal community for an incoming cyclone.</p></div>
            </div>
          </div>
          <div className="safty-block-mid">
            <div className="safty-block-mid-members">
              <img src={trophy} alt="" />
              <h1>100</h1>
              <p>Points</p>
            </div>
            <div className="safty-block-mid-members">
              <img src={peaple} alt="" />
              <h1>100</h1>
              <p>Players</p>
            </div>
            <div className="safty-block-mid-members">
              <img src={achievement} alt="" />
              <h1>4.6</h1>
              <p>Rating</p>
            </div>
          </div>
          <div className="safty-block-bottom">
            <div className="safty-play">
              <img src={game} alt="" />
              <p>Play Game</p>
            </div>
          </div>
        </div>


      
      </div>
    </div>
  )
}

export default Safty
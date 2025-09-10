import React, { useState } from 'react'
import './Safty.css'
import trophy from '../../assets/trophy.svg'
import peaple from '../../assets/peaple.svg'
import achievement from '../../assets/achievement.svg'
import gameIcon from '../../assets/game.svg'
import gamesData from './gameData'
import QuizPanel from './QuizPanel'

function Safty() {
  const [selectedGame, setSelectedGame] = useState(null)
  const [gameScores, setGameScores] = useState({})

  const handleQuizFinish = (gameId, score) => {
    setGameScores(prev => ({
      ...prev,
      [gameId]: score 
    }))
    setSelectedGame(null)
  }

  return (
    <div className='safty'>
      <div className="safty-top">
        <h1>Safety Games</h1>
        <p>Learn disaster preparedness through fun and engaging games</p>
      </div>

      <div className="safty-container">
        {gamesData.map((g) => {
          const score = gameScores[g.id] || 0
          const points = score * 10
          const hasPlayed = score > 0

          return (
            <div className="safty-block" key={g.id}>
              <div className="safty-block-top">
                <div className="safty-block-top-img">
                  <img src={g.img} alt={g.title} />
                </div>
                <div className="safty-block-texts">
                  <div className="safty-block-text">
                    <h1>{g.title}</h1>
                    <div className={`tag ${g.level.toLowerCase()}`}>{g.level}</div>
                  </div>
                  <div className="p"><p>{g.description}</p></div>
                </div>
              </div>

              <div className="safty-block-mid">
                <div className="safty-block-mid-members">
                  <img src={trophy} alt="Points" />
                  <h1>{points}</h1>
                  <p>Points</p>
                </div>
                <div className="safty-block-mid-members">
                  <img src={peaple} alt="Players" />
                  <h1>{g.players}</h1>
                  <p>Players</p>
                </div>
                <div className="safty-block-mid-members">
                  <img src={achievement} alt="Rating" />
                  <h1>{g.rating}</h1>
                  <p>Rating</p>
                </div>
              </div>

              <div className="safty-block-bottom">
                <div className="safty-play" onClick={() => setSelectedGame(g)}>
                  <img src={gameIcon} alt="Play" />
                  <p>{hasPlayed ? "Play Again" : "Play Game"}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {selectedGame && (
        <QuizPanel
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
          onFinish={handleQuizFinish}
        />
      )}
    </div>
  )
}

export default Safty

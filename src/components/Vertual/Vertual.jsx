import React, { useState } from 'react'
import './Vertual.css'
import earthquakeGame from './earthquakeGame.json'

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
  // ✅ Drill Data
  const drills = [
    {
      id: 1,
      title: "Earthquake Emergency Drill",
      tag: "basic",
      description: "Practice drop, cover, and hold procedures during seismic activity.",
      img: earth,
      rating: 4.6,
      objectives: [
        "Execute proper drop, cover, and hold technique",
        "Identify safe spots in classrooms and corridors",
      ],
    },
    {
      id: 2,
      title: "Fire Evacuation Drill",
      tag: "basic",
      description: "Navigate emergency exits and assembly points during fire emergency.",
      img: fire,
      rating: 4.6,
      objectives: [
        "Identify nearest emergency exits",
        "Follow evacuation routes safely",
      ],
    },
    {
      id: 3,
      title: "Flood Safety Drill",
      tag: "basic",
      description: "Respond to sudden flooding and move to higher ground safely.",
      img: water,
      rating: 4.6,
      objectives: [
        "Recognize flood warning signs",
        "Navigate to higher floors safely",
      ],
    },
    {
      id: 4,
      title: "Lockdown Procedure",
      tag: "basic",
      description: "Secure classroom and follow lockdown protocols for security threats.",
      img: lock,
      rating: 4.6,
      objectives: [
        "Secure classroom entrances",
        "Maintain silence and calm",
      ],
    },
  ];

  // ✅ Game State
  const [showGame, setShowGame] = useState(false);
  const [player, setPlayer] = useState(earthquakeGame.player);
  const [currentScene, setCurrentScene] = useState("1");

  const scene = earthquakeGame.scenes[currentScene];

  // Handle choices
  const handleChoice = (choice) => {
    setPlayer((prev) => ({
      health: Math.max(0, prev.health + (choice.effects.health || 0)),
      trust: prev.trust + (choice.effects.trust || 0),
      supplies: Math.max(0, prev.supplies + (choice.effects.supplies || 0)),
    }));

    if (choice.nextScene) {
      setCurrentScene(choice.nextScene);
    }
  };

  // Reset game
  const resetGame = () => {
    setPlayer(earthquakeGame.player);
    setCurrentScene("1");
    setShowGame(true);
  };

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
          <h1>{Math.round((player.health + player.trust + player.supplies) / 3)}%</h1>
          <p>Current Score</p>
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
                <h1>{player.health}</h1>
                <p>Health</p>
              </div>
              <div className="vertual-block-mid-members">
                <img src={peaple} alt="players" />
                <h1>{player.trust}</h1>
                <p>Trust</p>
              </div>
              <div className="vertual-block-mid-members">
                <img src={score} alt="supplies" />
                <h1>{player.supplies}</h1>
                <p>Supplies</p>
              </div>
            </div>

            <div className="objective">
              <h1>Learning Objectives:</h1>
              <div className="objectives">
                {drill.objectives.map((obj, index) => (
                  <p key={index}>{index + 1}. {obj}</p>
                ))}
              </div>
            </div>

            <div className="vertual-block-bottom">
              <div
                className="vertual-play"
                onClick={() => drill.id === 1 ? resetGame() : alert("This drill is not interactive yet.")}
              >
                <img src={play} alt="play" />
                <p>Start Drill</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Game Panel */}
      {showGame && (
        <div className="game-panel">
          <div className="game-content">
            {/* Player Stats */}
            <div className="stats">
              <p>❤️ Health: {player.health}</p>
              <p>🤝 Trust: {player.trust}</p>
              <p>🎒 Supplies: {player.supplies}</p>
            </div>

            {/* Current Scene */}
            {scene.choices ? (
              <>
                <p className='description'>{scene.description}</p>
                <div className="options">
                  {scene.choices.map((choice, idx) => (
                    <button key={idx} onClick={() => handleChoice(choice)}>
                      {choice.text}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="ending">
                <h3>Ending</h3>
                <p>{scene.description}</p>
                <div className='ending-btn' onClick={() => setShowGame(false)}>Close</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Vertual

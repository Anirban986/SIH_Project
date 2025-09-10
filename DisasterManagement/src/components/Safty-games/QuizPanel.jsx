import React, { useState, useEffect } from 'react'
import './Safty.css'

function QuizPanel({ game, onClose, onFinish }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [showSolution, setShowSolution] = useState(false)

  useEffect(() => {
    if (timeLeft <= 0) return
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  const handleAnswer = () => {
    const correctIndex = game.questions[currentQuestion].correctAnswer
    if (selectedAnswer === correctIndex) {
      setScore(score + 1)
    }
    setShowSolution(true)
  }

  const nextQuestion = () => {
    setShowSolution(false)
    setSelectedAnswer(null)
    if (currentQuestion < game.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setTimeLeft(30)
    }
  }

  const finishQuiz = () => {
    onFinish(game.id, score)
  }

  return (
    <div className="quiz-overlay">
      <div className="quiz-panel">
        <h2>{game.title} Quiz</h2>
        <p>Time left: {timeLeft}s</p>
        <p>Score: {score}/{game.questions.length}</p>

        <h3>{game.questions[currentQuestion].question}</h3>
        <ul>
          {game.questions[currentQuestion].options.map((opt, idx) => {
            let optionClass = "option"
            if (showSolution) {
              if (idx === game.questions[currentQuestion].correctAnswer) {
                optionClass += " correct"
              } else if (idx === selectedAnswer) {
                optionClass += " wrong"
              }
            } else if (selectedAnswer === idx) {
              optionClass += " selected"
            }
            return (
              <li
                key={idx}
                className={optionClass}
                onClick={() => !showSolution && setSelectedAnswer(idx)}
              >
                {opt}
              </li>
            )
          })}
        </ul>

        {!showSolution ? (
          <button className='submit_btn' onClick={handleAnswer} disabled={selectedAnswer === null}>
            Submit
          </button>
        ) : (
          <div>
            {currentQuestion < game.questions.length - 1 ? (
              <button className='submit_btn' onClick={nextQuestion}>Next Question</button>
            ) : (
              <button className='submit_btn' onClick={finishQuiz}>Finish Quiz</button>
            )}
          </div>
        )}

        <button className="close-btn" onClick={onClose}>X</button>
      </div>
    </div>
  )
}

export default QuizPanel

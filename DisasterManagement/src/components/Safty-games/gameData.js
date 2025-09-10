import earth from '../../assets/earth.svg'
import fire from '../../assets/fire.svg'
import water from '../../assets/water.svg'
import cyclone from '../../assets/cyclone.svg'

const gamesData = [
  {
    id: 1,
    img: earth,
    title: "Earthquake Hero",
    level: "Easy",
    description: "Navigate through different scenarios during an earthquake and make the right choices.",
    points: 100,
    players: 100,
    rating: 4.6,
    questions: [
      {
        question: "What should you do first during an earthquake?",
        options: ["Run outside immediately", "Stay under a table", "Use the elevator", "Stand near windows"],
        correctAnswer: 1
      },
      {
        question: "What is the safest place in a building during an earthquake?",
        options: ["Near heavy furniture", "In the middle of the room", "Under sturdy furniture", "On the balcony"],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 2,
    img: fire,
    title: "Fire Safety Champion",
    level: "Easy",
    description: "Help students evacuate safely from a burning building.",
    points: 100,
    players: 100,
    rating: 4.6,
    questions: [
         {
        question: " What should you do first when you discover a fire in your classroom?",
        options: ["Try to gather your belongings", "Call a friend for help", " Raise the alarm and alert others", "Wait for your teacher to act"],
        correctAnswer: 2
         },
         {
        question: " The emergency fire service number in India is:",
        options: [" 101", "108", " 911", "112"],
        correctAnswer: 0
         }
    ]
  },
  {
    id: 3,
    img: water,
    title: "Flood Rescue Mission",
    level: "Easy",
    description: "Coordinate rescue operations during flooding in your city.",
    points: 100,
    players: 100,
    rating: 4.6,
    questions: [
          {
        question: " What is the first thing you should do before a flood?",
        options: ["  Ignore weather warnings", "Prepare an emergency kit with essentials like water, food, and medicines", " Go swimming in nearby water bodies", " Leave all doors and windows open"],
        correctAnswer: 1
         }
    ]
  },
  {
    id: 4,
    img: cyclone,
    title: "Cyclone Preparedness",
    level: "Easy",
    description: "Prepare your coastal community for an incoming cyclone.",
    points: 100,
    players: 100,
    rating: 4.6,
    questions: [
        {
        question: "What should fishermen do when a cyclone warning is issued?",
        options: ["Continue fishing as usual", "Return to shore immediately", "Ignore the warning", "Go deeper into the sea"],
        correctAnswer: 1
      },
       {
        question: "Before a cyclone strikes, which of the following is important?",
        options: ["Secure loose objects around the house", " Go out for a picnic", "Leave the house without any preparation", "Ignore weather updates"],
        correctAnswer: 0
      },
      {
        question: "Where is the safest place to stay during a cyclone?",
        options: ["Outdoors in an open field", " Indoors, away from windows", "On the roof of the house", "Near trees"],
        correctAnswer: 1
      },
      {
        question: "What is a common sign that a cyclone is approaching?",
        options: ["Clear skies", " Sudden strong winds and dark clouds", "Calm sea", "Bright sunshine"],
        correctAnswer: 1
      },
    ]
  }
]

export default gamesData

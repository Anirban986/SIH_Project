import { useState } from 'react'
import './App.css'
import { Route,Routes } from 'react-router'
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import Learn from './components/Learn/Learn'
import Vertual from './components/Vertual/Vertual'
import Alerts from './components/Alerts/Alerts'
import Emergency from './components/Emergency/Emergency'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
    <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Learn' element={<Learn/>}/>
      <Route path='/Vertual' element={<Vertual/>}/>
      <Route path='/Alerts' element={<Alerts/>}/>
      <Route path='/Emergency' element={<Emergency/>}/>
     </Routes>
      
    </>
  )
}

export default App

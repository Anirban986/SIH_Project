import { useState } from 'react'
import './App.css'
import { Route,Routes } from 'react-router'
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import Learn from './components/Learn/Learn'
import Vertual from './components/Vertual/Vertual'
import Alerts from './components/Alerts/Alerts'
import Emergency from './components/Emergency/Emergency'
import Footer from './components/Footer/Footer'
import Safty from './components/Safty-games/Safty'
import Signup from './components/Signup/Signup'
import Dashboard from './components/DashBoard/Dashboard/Dashboard'
import Community from './components/communtiy/Community'
import LoginParent from './components/Signup/LoginParent'
import LoginStudent from './components/Signup/LoginStudent'
import LoginTeacher from './components/Signup/LoginTeacher'
function App() {
  const [count, setCount] = useState(0)
   const [showSignup, setShowSignup] = useState(false)
  return (
    <>
   <Navbar onSignupClick={() => setShowSignup(true)} />
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Learn' element={<Learn/>}/>
      <Route path='/Vertual' element={<Vertual/>}/>
      <Route path='/Alerts' element={<Alerts/>}/>
      <Route path='/Safty' element={<Safty/>}/>
      <Route path='/Emergency' element={<Emergency/>}/>
      <Route path='/Dashboard' element={<Dashboard/>}/>
      <Route path='/Community' element={<Community/>}/>
      <Route path='/loginstudent' element={<LoginStudent/>}/>
       <Route path='/Loginparent' element={<LoginParent/>}/>
        <Route path='/Loginteacher' element={<LoginTeacher/>}/>
     </Routes>
       {/* Only show footer if modal is closed */}
      {!showSignup && <Footer />}
      {showSignup && <Signup onClose={() => setShowSignup(false)} />}
    </>
  )
}

export default App

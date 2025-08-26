import React from 'react'
import './Navbar.css'
import home from '../../assets/home.svg'
import alerts from '../../assets/alerts.svg'
import emergency from '../../assets/emergency.svg'
import learn from '../../assets/learn.svg'
import vertual from '../../assets/vertual.svg'
function Navbar() {
  return (
    <div className='navbar'>
     <img src="" alt="" />
     <ul className='navmenu'>
        <li className='list-items'>
            <div className='navmenu-list'>
            <img className='navmenu-img'src={home} alt="" />
            <div className='navmenu-text'>Home</div>
            </div>
        </li>
        <li className='list-items' >
            <div className='navmenu-list'>
             <img className='navmenu-img' src={learn} alt="" />
             <div className='navmenu-text'>Learn</div>
            </div>
        </li>
        <li  className='list-items'>
            <div className='navmenu-list'>
                <img className='navmenu-img' src={vertual} alt="" />
                <div className='navmenu-text'>Vertual drills</div>
            </div>
        </li>
        <li className='list-items'>
            <div  className='navmenu-list'>
                <img className='navmenu-img' src={alerts} alt="" />
                <div className='navmenu-text'>Alerts</div>
            </div>
        </li>
        <li className='list-items' >
            <div className='navmenu-list'>
                <img className='navmenu-img' src={emergency} alt="" />
                <div className='navmenu-text'>Emergency</div>
            </div>
        </li>
     </ul>
     <div className='signup'>Sign up</div>
    </div>
  )
}

export default Navbar
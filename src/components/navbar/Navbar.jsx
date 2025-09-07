import React from 'react'
import './Navbar.css'
import home from '../../assets/home.svg'
import alerts from '../../assets/alerts.svg'
import emergency from '../../assets/emergency.svg'
import learn from '../../assets/learn.svg'
import vertual from '../../assets/vertual.svg'
import game from '../../assets/game.svg'
import dashboard from '../../assets/dashboard.svg'
import { Link } from 'react-router'
import { NavLink } from 'react-router'


function Navbar({ onSignupClick }) {
    return (
        <div className='navbar'>
            <div className="logo"><img src="" alt="" /></div>
            <ul className='navmenu'>
                <NavLink
                    to='/'
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                    <li className='list-items'>
                        <div className='navmenu-list'>
                            <img className='navmenu-img' src={home} alt="" />
                            <h1>Home</h1>
                        </div>
                    </li>
                </NavLink>


                <NavLink
                    to='/learn'
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                    <li className='list-items' >
                        <div className='navmenu-list'>
                            <img className='navmenu-img' src={learn} alt="" />
                            <h1>Learn</h1>
                        </div>
                    </li>
                </NavLink>


                <NavLink
                    to='/vertual'
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                    <li className='list-items' >
                        <div className='navmenu-list'>
                            <img className='navmenu-img' src={vertual} alt="" />
                            <h1>Emergency Drills</h1>
                        </div>
                    </li>
                </NavLink>


                <NavLink
                    to='/Alerts'
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                    <li className='list-items' >
                        <div className='navmenu-list'>
                            <img className='navmenu-img' src={alerts} alt="" />
                            <h1>Alerts</h1>
                        </div>
                    </li>
                </NavLink>


                <NavLink
                    to='/safty'
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                    <li className='list-items' >
                        <div className='navmenu-list'>
                            <img className='navmenu-img' src={game} alt="" />
                            <h1>Safty games</h1>
                        </div>
                    </li>
                </NavLink>



                <NavLink
                    to='/Emergency'
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                    <li className='list-items' >
                        <div className='navmenu-list'>
                            <img className='navmenu-img' src={emergency} alt="" />
                            <h1>Emergency Contacts</h1>
                        </div>
                    </li>
                </NavLink>

                <NavLink
                    to='/Dashboard'
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                    <li className='list-items' >
                        <div className='navmenu-list'>
                            <img className='navmenu-img' src={dashboard} alt="" />
                            <h1>Dashboard</h1>
                        </div>
                    </li>
                </NavLink>



            </ul>

            <div className='signup' onClick={onSignupClick}>Sign up</div>


        </div>
    )
}

export default Navbar
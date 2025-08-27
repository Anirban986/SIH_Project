import React from 'react'
import './Navbar.css'
import home from '../../assets/home.svg'
import alerts from '../../assets/alerts.svg'
import emergency from '../../assets/emergency.svg'
import learn from '../../assets/learn.svg'
import vertual from '../../assets/vertual.svg'
import game from '../../assets/game.svg'
import { Link } from 'react-router'
function Navbar() {
    return (
        <div className='navbar'>
            <img src="" alt="" />
            <ul className='navmenu'>
                <Link className='nav-link' to='/'>
                    <li className='list-items'>
                        <div className='navmenu-list'>
                            <img className='navmenu-img' src={home} alt="" />
                            <h1 >Home</h1>
                        </div>
                    </li>
                </Link>

                <Link className='nav-link' to='/Learn'>
                    <li className='list-items' >
                        <div className='navmenu-list'>
                            <img className='navmenu-img' src={learn} alt="" />
                            <h1>Learn</h1>
                        </div>
                    </li>
                </Link>


                <Link className='nav-link' to='/Vertual'>
                    <li className='list-items'>
                        <div className='navmenu-list'>
                            <img className='navmenu-img' src={vertual} alt="" />
                            <h1 >Vertual drills</h1>
                        </div>
                    </li>
                </Link>


                <Link className='nav-link' to='/Alerts' >
                    <li className='list-items'>
                        <div className='navmenu-list'>
                            <img className='navmenu-img' src={alerts} alt="" />
                            <h1>Alerts</h1>
                        </div>
                    </li>
                </Link>


                <Link className='nav-link' to='/Safty' >
                    <li className='list-items'>
                        <div className='navmenu-list'>
                            <img className='navmenu-img' src={game} alt="" />
                            <h1>Safty games</h1>
                        </div>
                    </li>
                </Link>



                <Link className='nav-link' to='/Emergency'>  <li className='list-items' >
                    <div className='navmenu-list'>
                        <img className='navmenu-img' src={emergency} alt="" />
                        <h1>Emergency</h1>
                    </div>
                </li>
                </Link>



            </ul>
            <div className='signup'>Sign up</div>
        </div>
    )
}

export default Navbar
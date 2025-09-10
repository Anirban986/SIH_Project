import React, { useState } from 'react';
import './Navbar.css';
import home from '../../assets/home.svg';
import alerts from '../../assets/alerts.svg';
import emergency from '../../assets/emergency.svg';
import learn from '../../assets/learn.svg';
import vertual from '../../assets/vertual.svg';
import game from '../../assets/game.svg';
import dashboard from '../../assets/dashboard.svg';
import { NavLink } from 'react-router';
import SignUp from '../Signup/Signup'; // adjust path

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="navbar">
      <div className="logo">
        <img src="" alt="Logo" />
      </div>

      <ul className="navmenu">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <li className="list-items">
            <div className="navmenu-list">
              <img className="navmenu-img" src={home} alt="" />
              <h1>Home</h1>
            </div>
          </li>
        </NavLink>

        <NavLink to="/learn" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <li className="list-items">
            <div className="navmenu-list">
              <img className="navmenu-img" src={learn} alt="" />
              <h1>Learn</h1>
            </div>
          </li>
        </NavLink>

        <NavLink to="/vertual" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <li className="list-items">
            <div className="navmenu-list">
              <img className="navmenu-img" src={vertual} alt="" />
              <h1>Virtual Drills</h1>
            </div>
          </li>
        </NavLink>

        <NavLink to="/alerts" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <li className="list-items">
            <div className="navmenu-list">
              <img className="navmenu-img" src={alerts} alt="" />
              <h1>Alerts</h1>
            </div>
          </li>
        </NavLink>

        <NavLink to="/safty" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <li className="list-items">
            <div className="navmenu-list">
              <img className="navmenu-img" src={game} alt="" />
              <h1>Safety Games</h1>
            </div>
          </li>
        </NavLink>

        <NavLink to="/emergency" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <li className="list-items">
            <div className="navmenu-list">
              <img className="navmenu-img" src={emergency} alt="" />
              <h1>Emergency Contacts</h1>
            </div>
          </li>
        </NavLink>

        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <li className="list-items">
            <div className="navmenu-list">
              <img className="navmenu-img" src={dashboard} alt="" />
              <h1>Dashboard</h1>
            </div>
          </li>
        </NavLink>
      </ul>

      {/* Sign Up button opens modal */}
      <div className="signup" onClick={() => setIsModalOpen(true)}>Sign up</div>

      {/* The SignUp modal */}
      <SignUp isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default Navbar;

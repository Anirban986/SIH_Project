import React, { useState , useEffect} from 'react';
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
import logo2 from '../../assets/logo2.svg';
function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
   const [user, setUser] = useState(null); // store logged-in user info

  // Check localStorage on mount
 useEffect(() => {
  const checkUser = () => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    const role = localStorage.getItem("role"); // ✅ get role
    if (token && userName && role) {
      setUser({ name: userName , role });
    } else {
      setUser(null);
    }
  };

  // Run on mount
  checkUser();

  // Listen for login/logout events
  window.addEventListener("login", checkUser);
  window.addEventListener("logout", checkUser);

  // Clean up
  return () => {
    window.removeEventListener("login", checkUser);
    window.removeEventListener("logout", checkUser);
  };
}, []);

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  localStorage.removeItem("role"); // ✅ clear role
  setUser(null);
  window.dispatchEvent(new Event("logout")); // notify navbar
  window.location.href = "/";
};


  return (
    <div className="navbar">
      <div className="logo">
        <img src="" alt="" />
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
              <h1>Survival Quizes</h1>
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


       {user?.role==="admin" && (
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          <li className="list-items">
            <div className="navmenu-list">
              <img className="navmenu-img" src={dashboard} alt="" />
              <h1>Dashboard</h1>
            </div>
          </li>
        </NavLink>
       )}     
       
      </ul>

      <div className="navbar-right">
        {user && <span className="user-name"> {user.name}</span>}
        {user ? (
          <div className="btn logout-btn" onClick={handleLogout}>Log Out</div>
        ) : (
          <div className="signup" onClick={() => setIsModalOpen(true)}>Sign Up</div>
        )}
      </div>
      {/* The SignUp modal */}
      <SignUp isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default Navbar;

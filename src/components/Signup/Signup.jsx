import React, { useEffect } from 'react'
import './Signup.css'
import close from '../../assets/close.svg'
function Signup({ onClose }) {   
  useEffect(() => {
    document.body.classList.add("blurred");
    return () => {
      document.body.classList.remove("blurred");
    };
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create Account</h2>
        <form className="signup-form">
          <input type="text" placeholder="Enter your username" />
          <input type="email" placeholder="Enter your email" />
          <input type="password" placeholder="Enter your password" />
          <button type="submit" className="submit-btn">Sign up</button>
        </form>
        <div className="close-btn" onClick={onClose}>
          x
        </div>
        <div className="more">
            <div className="login">Already have account? <span>Login</span></div>
            <div className="forgot-password">Forgot password?</div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

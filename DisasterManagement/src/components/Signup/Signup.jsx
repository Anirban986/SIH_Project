import React, { useState } from "react";
import RegisterStudent from "./RegisterStudent";
import RegisterParent from "./RegisterParent";
import RegisterTeacher from "./RegisterTeacher";
import "./SignUp.css";

function SignUp({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("student");

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="tab-buttons">
          <button onClick={() => setActiveTab("student")} className={activeTab === "student" ? "active" : ""}>Register as Student</button>
          <button onClick={() => setActiveTab("parent")} className={activeTab === "parent" ? "active" : ""}>Register as Parent</button>
          <button onClick={() => setActiveTab("teacher")} className={activeTab === "teacher" ? "active" : ""}>Register as Teacher</button>
         
        </div>

        <div className="tab-content">
          {activeTab === "student" && <RegisterStudent />}
          {activeTab === "parent" && <RegisterParent />}
          {activeTab === "teacher" && <RegisterTeacher />}
        </div>
      </div>
    </div>
  );
}

export default SignUp;

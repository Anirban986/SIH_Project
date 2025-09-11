import React, { useState } from "react";
import RegisterStudent from "./RegisterStudent";
import RegisterParent from "./RegisterParent";
import RegisterTeacher from "./RegisterTeacher";
import LoginStudent from "./LoginStudent";
import LoginParent from "./LoginParent";
import LoginTeacher from "./LoginTeacher";
import "./SignUp.css";
import AdminRegister from "./AdminRegister";
import AdminLogin from "./AdminLogin";

function SignUp({ isOpen, onClose }) {
  const [mainTab, setMainTab] = useState("register"); // "register" or "login"
  const [activeTab, setActiveTab] = useState("student"); // student/parent/teacher

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-btn" onClick={onClose}>×</button>

        {/* Main Tabs: Register / Login */}
        <div className="tab-buttons">
          <button
            onClick={() => { setMainTab("register"); setActiveTab("student"); }}
            className={mainTab === "register" ? "active" : ""}
          >
            Register
          </button>
          <button
            onClick={() => { setMainTab("login"); setActiveTab("student"); }}
            className={mainTab === "login" ? "active" : ""}
          >
            Login
          </button>
        </div>

        {/* Sub Tabs: Student / Parent / Teacher */}
        <div className="tab-buttons">
          <button onClick={() => setActiveTab("student")} className={activeTab === "student" ? "active" : ""}>
            Student
          </button>
          <button onClick={() => setActiveTab("parent")} className={activeTab === "parent" ? "active" : ""}>
            Parent
          </button>
          <button onClick={() => setActiveTab("teacher")} className={activeTab === "teacher" ? "active" : ""}>
            Teacher
          </button>
          <button onClick={() => setActiveTab("admin")} className={activeTab === "admin" ? "active" : ""}>
            Admin
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {mainTab === "register" && activeTab === "student" && <RegisterStudent />}
          {mainTab === "register" && activeTab === "parent" && <RegisterParent />}
          {mainTab === "register" && activeTab === "teacher" && <RegisterTeacher />}
          {mainTab === "register" && activeTab === "admin" &&   <AdminRegister/>}
          {mainTab === "login" && activeTab === "student" && <LoginStudent />}
          {mainTab === "login" && activeTab === "parent" && <LoginParent />}
          {mainTab === "login" && activeTab === "teacher" && <LoginTeacher />}
          {mainTab === "login" && activeTab === "admin" && <AdminLogin/>}
        </div>
      </div>
    </div>
  );
}

export default SignUp;

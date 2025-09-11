import React, { useState, useEffect } from 'react';
import './Home.css';
import school from '../../assets/school.svg';
import student from '../../assets/student.svg';
import trophy from '../../assets/trophy.svg';
import map from '../../assets/map.svg';
import activity from '../../assets/activity.svg';
import achievement from '../../assets/achievement.svg';
import safty from '../../assets/safty.svg';
import peaple from '../../assets/peaple.svg';
import { Link } from 'react-router';
import IndiaDisasterMap from '../intaractiveMap/IndiaDisasterMap';
import Weather from '../weather/Weather';

function Home() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkUser = () => {
            const token = localStorage.getItem("token");
            const userName = localStorage.getItem("userName");
            const role = localStorage.getItem("role"); // get role
            if (token && userName && role) {
                setUser({ name: userName, role });
            } else {
                setUser(null);
            }
        };

        checkUser();

        window.addEventListener("login", checkUser);
        window.addEventListener("logout", checkUser);

        return () => {
            window.removeEventListener("login", checkUser);
            window.removeEventListener("logout", checkUser);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("role");
        setUser(null);
        window.dispatchEvent(new Event("logout"));
        window.location.href = "/";
    };

    const isStudentParentTeacher = ["student", "parent", "teacher"].includes(user?.role);
    const isStudentParentTeacheradmin = ["student", "parent", "teacher","admin"].includes(user?.role);
    return (
        <div className='home'>
            <div className="hero">
                <h1>Empowering Schools and Colleges with <span>Disaster Preparedness</span></h1>
                <p>Interactive learning platform for Indian schools and colleges to build disaster resilience through education, virtual drills, and gamified safety training.</p>
            </div>

            <div className="section1">
                <div className="section-items">
                    <img src={school} alt="" />
                    <h1>1234+</h1>
                    <p>Schools enrolled</p>
                </div>
                <div className="section-items">
                    <img src={student} alt="" />
                    <h1>1234+</h1>
                    <p>Students trained</p>
                </div>
                <div className="section-items">
                    <img src={trophy} alt="" />
                    <h1>1234+</h1>
                    <p>Drills completed</p>
                </div>
                <div className="section-items">
                    <img src={achievement} alt="" />
                    <h1>60%</h1>
                    <p>Safety Score</p>
                </div>
            </div>

            <div className="section3">
                <Link className='sec-link' to='/learn'>
                    <div className="section3-items">
                        <img src={map} alt="" />
                        <h1>Interactive Learning</h1>
                        <p>Region-specific disaster education modules</p>
                    </div>
                </Link>

                <Link className='sec-link' to='/vertual'>
                    <div className="section3-items">
                        <img src={activity} alt="" />
                        <h1>Virtual Drills</h1>
                        <p>Practice emergency procedures safely</p>
                    </div>
                </Link>
                {isStudentParentTeacheradmin && (
                    <Link className='sec-link' to='/Community'>
                        <div className="section3-items">
                            <img src={peaple} alt="" />
                            <h1>Community</h1>
                            <p>Communicate with peers</p>
                        </div>
                    </Link>

                )}

                <Link className='sec-link' to='/safty'>
                    <div className="section3-items">
                        <img src={safty} alt="" />
                        <h1>Safety Games</h1>
                        <p>Learn through engaging gameplay</p>
                    </div>
                </Link>
            </div>

            {/* Only show map and weather for student, parent, teacher */}
            {isStudentParentTeacher && (
                <div className="map">
                    <IndiaDisasterMap />
                    <Weather />
                </div>
            )}
        </div>
    );
}

export default Home;

import React, { useState } from "react";
import modules from "./data";
import "./LearningNav.css";
import play from '../../../assets/play.svg'
function LearningNav() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    { name: "All", icon: "📚" },
    ...Array.from(
      new Map(
        modules.map((m) => [m.category, { name: m.category, icon: m.icon }])
      ).values()
    ),
  ];

  const filtered =
    activeCategory === "All"
      ? modules
      : modules.filter((m) => m.category === activeCategory);

  return (
    <div className="dashboard">
      {/* Navigation */}
      <nav className="nav">
        <ul>
          {categories.map((cat) => (
            <li
              key={cat.name}
              className={activeCategory === cat.name ? "active" : ""}
              onClick={() => setActiveCategory(cat.name)}
            >
              <span className="icon">{cat.icon}</span>
              <span>{cat.name}</span>
              <small>
                {cat.name === "All"
                  ? modules.length
                  : modules.filter((m) => m.category === cat.name).length}
              </small>
            </li>
          ))}
        </ul>
      </nav>

      {/* Cards */}
      <div className="cards-learn">
        {filtered.map((m) => (
          <div className="learning-card" key={m.id}>
            <h3>{m.title}</h3>
            <p>{m.description}</p>
             <small>Progress: {m.progress}%</small>
            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: `${m.progress}%` }}
              ></div>
            </div>
           
            <div className="meta">
              <span>⏱ {m.duration}</span>
              <span>📘 {m.lessons} Lessons</span>
              <span>👥 {m.users}</span>
              <span>⭐ {m.rating}</span>
            </div>
            <span className={`level ${m.level.toLowerCase()}`}>{m.level}</span>
            <div className="action">
              <img src={play} alt="" />
              <div className="action-para">Start Learning</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LearningNav;

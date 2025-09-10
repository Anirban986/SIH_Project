import React, { useState, useEffect } from "react";
import modules from "./data";
import "./LearningNav.css";
import play from '../../../assets/play.svg'

function LearningNav() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isMobile, setIsMobile] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Handle category selection
  const handleCategorySelect = (categoryName) => {
    setActiveCategory(categoryName);
    setDropdownOpen(false); // Close dropdown after selection on mobile
  };

  // Get active category object
  const activeCategoryObj = categories.find(cat => cat.name === activeCategory);

  return (
    <div className="dashboard">
      {/* Navigation */}
      <nav className="nav">
        {isMobile ? (
          // Mobile Dropdown
          <div className="mobile-filter-dropdown">
            <button 
              className="dropdown-toggle"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="icon">{activeCategoryObj?.icon}</span>
              <span>{activeCategory}</span>
              <small>
                {activeCategory === "All"
                  ? modules.length
                  : modules.filter((m) => m.category === activeCategory).length}
              </small>
              <span className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`}>▼</span>
            </button>
            
            {dropdownOpen && (
              <div className="dropdown-menu">
                {categories.map((cat) => (
                  <div
                    key={cat.name}
                    className={`dropdown-item ${activeCategory === cat.name ? "active" : ""}`}
                    onClick={() => handleCategorySelect(cat.name)}
                  >
                    <span className="icon">{cat.icon}</span>
                    <span>{cat.name}</span>
                    <small>
                      {cat.name === "All"
                        ? modules.length
                        : modules.filter((m) => m.category === cat.name).length}
                    </small>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          // Desktop Navigation
          <ul>
            {categories.map((cat) => (
              <li
                key={cat.name}
                className={activeCategory === cat.name ? "active" : ""}
                onClick={() => handleCategorySelect(cat.name)}
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
        )}
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
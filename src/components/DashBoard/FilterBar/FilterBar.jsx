import { useState } from "react";
import "./FilterBar.css";
import filter from '../../../assets/filter.svg'
export default function FilterBar({ onFilterChange }) {
  const [filters, setFilters] = useState({
    state: "All States",
    type: "All",
    period: "6 Months",
  });

  const handleChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="filter-bar">
    <div className="filter-item1">
        <img src={filter} alt="" />
        <p>Filter</p>
    </div>
      <div className="filter-item">
        <div className="item"><label>State:</label></div>

        
        <select
          value={filters.state}
          onChange={(e) => handleChange("state", e.target.value)}
        >
         <div className="options">
          <option>All States</option>
          <option>Maharashtra</option>
          <option>Karnataka</option>
          <option>Delhi</option>
         </div>
         
        </select>

        
        
      </div>

      <div className="filter-item">
        <label>Institution:</label>
        <select
          value={filters.type}
          onChange={(e) => handleChange("type", e.target.value)}
        >
          <option>All</option>
          <option>College</option>
          <option>School</option>
          <option>University</option>
        </select>
      </div>

      <div className="filter-item">
        <label>Period:</label>
        <select
          value={filters.period}
          onChange={(e) => handleChange("period", e.target.value)}
        >
          <option>1 Month</option>
          <option>6 Months</option>
          <option>1 Year</option>
        </select>
      </div>
    </div>
  );
}

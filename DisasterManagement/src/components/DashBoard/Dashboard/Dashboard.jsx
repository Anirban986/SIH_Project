import { useState, useMemo } from "react";
import CountUp from "react-countup";
import FilterBar from "../FilterBar/FilterBar";
import "./Dashboard.css";
import download from '../../../assets/download.svg';
import schedule from '../../../assets/schedule.svg';
import TrendChart from "../TrendChart/TrendChart";
import DrillPerformancePie from "../DrillPerformancePie/DrillPerformancePie";
import BarChart from "../BarChart/BarChart";
import DataTable from "../DataTable/DataTable"
export default function Dashboard() {
  const [showPortal, setShowPortal] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("low");
  const mockData = [
    { id: 1, state: "Maharashtra", type: "College", students: 1200, drills: 2, preparedness: 92 },
    { id: 2, state: "Maharashtra", type: "School", students: 800, drills: 1, preparedness: 88 },
    { id: 3, state: "Delhi", type: "College", students: 600, drills: 1, preparedness: 96 },
    { id: 4, state: "Delhi", type: "School", students: 500, drills: 0, preparedness: 85 },
    { id: 5, state: "Karnataka", type: "University", students: 1500, drills: 3, preparedness: 97 },
    { id: 6, state: "Karnataka", type: "College", students: 900, drills: 1, preparedness: 91 },
  ];

  const [filters, setFilters] = useState({
    state: "All States",
    type: "All",
    period: "6 Months",
  });


  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };


  const filteredData = useMemo(() => {
    return mockData.filter((item) => {
      return (
        (filters.state === "All States" || item.state === filters.state) &&
        (filters.type === "All" || item.type === filters.type)
      );
    });
  }, [filters]);
  const handleSend = async () => {
    if (!message) return alert("Message cannot be empty");
    try {
      const res = await fetch("http://localhost:5000/api/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, severity }),
      });
      const data = await res.json();
      console.log("✅ Alert sent:", data);
      setMessage("");
      setSeverity("low");
      setShowPortal(false);
    } catch (err) {
      console.error("❌ Error sending alert:", err);
    }
  };

  const totalInstitutions = filteredData.length;
  const totalStudents = filteredData.reduce((sum, i) => sum + i.students, 0);
  const totalDrills = filteredData.reduce((sum, i) => sum + i.drills, 0);
  const avgPreparedness = filteredData.length
    ? (filteredData.reduce((sum, i) => sum + i.preparedness, 0) / filteredData.length).toFixed(1)
    : 0;

  return (
    <div className="dashboard">
      <div className="dashboard-top">
        <div className="dashboard-top-segment1">
          <h1>Admin Dashboard</h1>
          <p>Monitor school disaster preparedness across institutions</p>
        </div>
        <div className="dashboard-top-segment2">
          <div className="export">
            <img src={download} alt="" />
            <p>Export Report</p>
          </div>
          <div className="schedule-drill">
            <img src={schedule} alt="" />
            <p>Schedule Drill</p>
          </div>

          <div className="send-alert-button" onClick={() => setShowPortal(true)}>
            Send Alert
          </div>
          {showPortal && (
            <div className="alert-portal-overlay">
              <div className="alert-portal">
                <h2>Send Alert</h2>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your alert..."
                />
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <div className="portal-buttons">
                  <button onClick={handleSend}>Send</button>
                  <button onClick={() => setShowPortal(false)}>Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <FilterBar onFilterChange={handleFilterChange} />

      <div className="cards">
        <div className="card blue">
          <span>Total Institutions</span>
          <CountUp end={totalInstitutions} duration={1.2} />
        </div>
        <div className="card green">
          <span>Total Students</span>
          <CountUp end={totalStudents} duration={1.5} separator="," />
        </div>
        <div className="card purple">
          <span>Avg Preparedness</span>
          <CountUp end={avgPreparedness} duration={1.8} decimals={1} suffix="%" />
        </div>
        <div className="card yellow">
          <span>Recent Drills</span>
          <CountUp end={totalDrills} duration={1.2} />
        </div>
      </div>

      <div className="charts">
        <div className="chart-card">
          <TrendChart />
        </div>
        <div className="chart-card">
          <DrillPerformancePie />
        </div>
      </div>
      <div className="barchart">
        <BarChart />
      </div>
      <div>
        <DataTable filters={filters} />
      </div>
    </div>
  );
}

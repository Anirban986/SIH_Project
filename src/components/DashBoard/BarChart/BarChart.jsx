import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./BarChart.css";

// Updated mock data
const data = [
  { drill: "Earthquake", conducted: 20, completed: 17 },
  { drill: "Fire Safety", conducted: 18, completed: 14 },
  { drill: "Cyclone", conducted: 15, completed: 10 },
  { drill: "Heat Waves", conducted: 12, completed: 9 },
  { drill: "Flood Preparedness", conducted: 22, completed: 18 },
];

// Custom tooltip to show drill details
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { conducted, completed } = payload[0].payload;
    const percentage = ((completed / conducted) * 100).toFixed(1);
    return (
      <div className="custom-tooltip">
        <p className="tooltip-title">{label}</p>
        <p>Conducted: <span>{conducted}</span></p>
        <p>Completed: <span>{completed}</span></p>
        <p>Completion Rate: <span>{percentage}%</span></p>
      </div>
    );
  }
  return null;
};

const DisasterCompletionChart = () => {
  // Add percentage field for bars
  const chartData = data.map(d => ({
    ...d,
    completion: ((d.completed / d.conducted) * 100).toFixed(1),
  }));

  return (
    <div className="chart-container">
      <h2 className="chart-title">Disaster Drill Completion Rates</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis dataKey="drill" tick={{ fontSize: 14, fill: "#555" }} />
          <YAxis tick={{ fontSize: 14, fill: "#555" }} domain={[0, 100]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="completion" fill="#3498db" barSize={50} radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DisasterCompletionChart;

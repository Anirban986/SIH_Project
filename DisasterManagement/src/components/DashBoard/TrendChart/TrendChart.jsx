import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./TrendChart.css";


const data = [
  { month: "Jan", earthquake: 75, fire: 60, flood: 50 },
  { month: "Feb", earthquake: 82, fire: 65, flood: 55 },
  { month: "Mar", earthquake: 78, fire: 70, flood: 60 },
  { month: "Apr", earthquake: 85, fire: 72, flood: 68 },
  { month: "May", earthquake: 90, fire: 80, flood: 70 },
  { month: "Jun", earthquake: 88, fire: 82, flood: 75 },
  { month: "Jul", earthquake: 92, fire: 85, flood: 80 },
  { month: "Aug", earthquake: 95, fire: 88, flood: 82 },
  { month: "Sep", earthquake: 91, fire: 83, flood: 78 },
  { month: "Oct", earthquake: 87, fire: 79, flood: 73 },
  { month: "Nov", earthquake: 89, fire: 81, flood: 76 },
  { month: "Dec", earthquake: 93, fire: 86, flood: 79 },
];

function TrendChart() {
  return (
    <div className="trend-chart-container">
      <h2 className="trend-chart-title">Disaster Drill Completion Rates (%)</h2>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[0, 100]} tickFormatter={(val) => `${val}%`} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
          <Line type="monotone" dataKey="earthquake" stroke="#FF4C4C" strokeWidth={3} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="fire" stroke="#FFA500" strokeWidth={3} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="flood" stroke="#4C9AFF" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TrendChart;

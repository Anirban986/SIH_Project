import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./DrillPerformancePie.css";


const data = [
  { name: "Excellent", value: 45 },
  { name: "Good", value: 30 },
  { name: "Medium", value: 15 },
  { name: "Bad", value: 7 },
  { name: "Needs Improvement", value: 3 },
];


const COLORS = ["#28a745", "#17a2b8", "#ffc107", "#fd7e14", "#dc3545"];

function DrillPerformancePie() {
  // total drills for percentage calculation
  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div className="pie-chart-container">
      <h2 className="pie-chart-title">Overall Drill Performance</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={140}
            dataKey="value"
            label={({ value }) => `${((value / total) * 100).toFixed(1)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value} drills`} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DrillPerformancePie;

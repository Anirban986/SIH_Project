import React from "react";
import './DataTable.css'

const data = [
  { institution: "Mumbai College", type: "College", state: "Maharashtra", students: 1200, preparedness: 85, lastDrill: "2025-07-15" },
  { institution: "Delhi Public School", type: "School", state: "Delhi", students: 800, preparedness: 72, lastDrill: "2025-06-20" },
  { institution: "Karnataka University", type: "University", state: "Karnataka", students: 5000, preparedness: 90, lastDrill: "2025-08-05" },
  { institution: "Pune International School", type: "School", state: "Maharashtra", students: 600, preparedness: 65, lastDrill: "2025-05-28" },
  { institution: "Delhi Technical University", type: "University", state: "Delhi", students: 3500, preparedness: 78, lastDrill: "2025-07-30" },
];

export default function DataTable({ filters }) {
  const now = new Date();

  const filteredData = data.filter((item) => {
    const stateMatch =
      filters.state === "All States" || item.state === filters.state;
    const typeMatch = filters.type === "All" || item.type === filters.type;

    const drillDate = new Date(item.lastDrill);
    const diffMonths =
      (now.getFullYear() - drillDate.getFullYear()) * 12 +
      (now.getMonth() - drillDate.getMonth());

    let periodMatch = true;
    if (filters.period === "3 Months") periodMatch = diffMonths <= 3;
    if (filters.period === "6 Months") periodMatch = diffMonths <= 6;
    if (filters.period === "1 Year") periodMatch = diffMonths <= 12;

    return stateMatch && typeMatch && periodMatch;
  });

  return (
    <div>
    <table className="institution-table">
      <thead>
        <tr>
          <th>Institution</th>
          <th>Type</th>
          <th>State</th>
          <th>No. of Students</th>
          <th>Preparedness %</th>
          <th>Last Drill</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.length > 0 ? (
          filteredData.map((row, i) => (
            <tr key={i}>
              <td>{row.institution}</td>
              <td>{row.type}</td>
              <td>{row.state}</td>
              <td>{row.students}</td>
              <td
                style={{
                  color:
                    row.preparedness >= 80
                      ? "green"
                      : row.preparedness >= 70
                      ? "orange"
                      : "red",
                  fontWeight: "bold",
                }}
              >
                {row.preparedness}%
              </td>
              <td>{row.lastDrill}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" style={{ textAlign: "center" }}>
              No records found
            </td>
          </tr>
        )}
      </tbody>
    </table>
    </div>
  );
}

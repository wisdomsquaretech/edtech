import React from "react";

const ReportsPanel = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Reports</h3>
      <ul className="space-y-2 text-sm">
        <li><a href="#" className="text-blue-600 hover:underline">Monthly Attendance</a></li>
        <li><a href="#" className="text-blue-600 hover:underline">Performance Reports</a></li>
        <li><a href="#" className="text-blue-600 hover:underline">Session Summaries</a></li>
      </ul>
    </div>
  );
};

export default ReportsPanel;

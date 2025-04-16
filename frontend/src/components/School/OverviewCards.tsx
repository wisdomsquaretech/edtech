import React from "react";

const data = [
  { label: "Total Students", value: 210, icon: "fa-users", color: "bg-blue-100 text-blue-700" },
  { label: "Today’s Sessions", value: 12, icon: "fa-chalkboard", color: "bg-green-100 text-green-700" },
  { label: "Attendance Rate", value: "93%", icon: "fa-user-check", color: "bg-yellow-100 text-yellow-700" },
];

const OverviewCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {data.map((item, index) => (
        <div key={index} className="bg-white p-5 rounded-lg shadow flex items-center space-x-4">
          <div className={`p-3 rounded-full ${item.color}`}>
            <i className={`fas ${item.icon}`}></i>
          </div>
          <div>
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="text-lg font-bold">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;

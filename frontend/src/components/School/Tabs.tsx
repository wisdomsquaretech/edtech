import React, { useState } from "react";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = ["all", "class A", "class B", "class C"];

  return (
    <div className="bg-white p-4 rounded-lg shadow flex space-x-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            activeTab === tab
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;

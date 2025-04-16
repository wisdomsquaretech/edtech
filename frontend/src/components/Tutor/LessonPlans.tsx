import React, { useState } from "react";

const LessonPlans = () => {
  const [tab, setTab] = useState("beginner");

  const lessons = [
    { title: "Introductions", type: "PDF", icon: "fa-file-pdf", color: "text-red-500" },
    { title: "Friends", type: "Video", icon: "fa-file-video", color: "text-blue-500" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Lesson Plans</h2>

      <div className="flex border-b border-gray-200 mb-4">
        {["beginner", "intermediate", "advanced"].map((level) => (
          <button
            key={level}
            onClick={() => setTab(level)}
            className={`px-4 py-2 text-sm font-medium border-b-2 ${
              tab === level ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500"
            }`}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {lessons.map((lesson, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center">
              <div className={`mr-3 ${lesson.color}`}>
                <i className={`fas ${lesson.icon}`}></i>
              </div>
              <div>
                <h4 className="text-sm font-medium">{lesson.title}</h4>
                <p className="text-xs text-gray-500">{lesson.type} • 25 min</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="text-gray-500 hover:text-indigo-600">
                <i className="fas fa-download"></i>
              </button>
              <button className="text-gray-500 hover:text-indigo-600">
                <i className="fas fa-eye"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonPlans;

import React from "react";

const UpcomingSessions = () => {
  const sessions = [
    {
      title: "English with Maria",
      level: "Beginner • Introductions",
      time: "3:00 PM - 4:00 PM (EDT)",
      dateLabel: "Today",
    },
    {
      title: "English with Carlos",
      level: "Intermediate • Past Tense",
      time: "Tomorrow, 2:00 PM - 3:00 PM (EDT)",
    },
    {
      title: "English with Mei",
      level: "Advanced • Idioms",
      time: "Monday, 5:00 PM - 6:00 PM (EDT)",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Upcoming Sessions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sessions.map((session, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4 border relative overflow-hidden">
            {session.dateLabel && (
              <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 text-xs font-semibold">
                {session.dateLabel}
              </div>
            )}
            <h3 className="font-semibold text-gray-800">{session.title}</h3>
            <p className="text-sm text-gray-600">{session.level}</p>
            <div className="mt-3 flex items-center text-sm text-gray-500">
              <i className="fas fa-clock mr-2"></i>
              {session.time}
            </div>
            <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded text-sm transition-colors duration-200">
              <i className="fas fa-video mr-1"></i> Join Session
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingSessions;

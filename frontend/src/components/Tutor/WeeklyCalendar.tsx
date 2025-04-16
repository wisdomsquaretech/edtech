import React from "react";

const WeeklyCalendar = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dates = [7, 8, 9, 10, 11, 12, 13];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Weekly Calendar</h2>
      <div className="flex justify-between items-center mb-4">
        <button className="text-gray-500 hover:text-indigo-600">
          <i className="fas fa-chevron-left"></i>
        </button>
        <h3 className="font-medium">April 7 - 13, 2025</h3>
        <button className="text-gray-500 hover:text-indigo-600">
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-1">{day}</div>
        ))}
        {dates.map((date) => (
          <div
            key={date}
            className={`text-center py-3 border rounded-lg ${
              date === 11 ? 'bg-indigo-50 border-indigo-200' : 'border-gray-100'
            }`}
          >
            <div className={`text-sm font-medium ${date === 11 ? 'text-indigo-700' : 'text-gray-700'}`}>
              {date}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-xs text-gray-500 flex items-center justify-end">
        <span className="flex items-center mr-3">
          <span className="w-2 h-2 rounded-full bg-indigo-500 mr-1"></span>Today's Session
        </span>
        <span className="flex items-center mr-3">
          <span className="w-2 h-2 rounded-full bg-purple-500 mr-1"></span>Completed
        </span>
        <span className="flex items-center">
          <span className="w-2 h-2 rounded-full bg-gray-300 mr-1"></span>Upcoming
        </span>
      </div>
    </div>
  );
};

export default WeeklyCalendar;

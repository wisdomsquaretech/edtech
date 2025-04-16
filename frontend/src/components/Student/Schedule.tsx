import React from "react";

const Schedule = () => {
  const sessionDays = [12, 15];
  const today = 11;

  return (
    <section className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Your Schedule</h3>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <i className="fas fa-plus"></i><span>Book New Session</span>
        </button>
      </div>
      <div className="p-6">
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-7 gap-1 text-center mb-2 text-sm font-medium text-gray-500">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => <div key={d}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {Array.from({ length: 30 }, (_, i) => {
              const date = i + 1;
              const isToday = date === today;
              const hasSession = sessionDays.includes(date);
              return (
                <div
                  key={date}
                  className={`
                    py-2 rounded-full text-sm cursor-pointer
                    ${isToday ? 'bg-blue-600 text-white' : ''}
                    ${hasSession && !isToday ? 'bg-purple-100 text-purple-700' : ''}
                    ${!hasSession && !isToday ? 'text-gray-700 hover:bg-gray-100' : ''}
                  `}
                >
                  {date}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;

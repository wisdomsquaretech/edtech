import React from "react";

const Notifications = () => {
  return (
    <div className="absolute right-4 top-20 w-80 bg-white rounded-lg shadow-xl z-10 border border-gray-100">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-semibold">Notifications</h3>
        <button className="text-xs text-indigo-600 hover:text-indigo-800">Mark all as read</button>
      </div>
      <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
        {/* Example notification */}
        <div className="p-4 bg-indigo-50">
          <div className="flex items-start">
            <div className="bg-indigo-100 p-2 rounded-full text-indigo-600 mr-3">
              <i className="fas fa-calendar-check"></i>
            </div>
            <div>
              <p className="text-sm font-medium">Upcoming Session</p>
              <p className="text-xs text-gray-600">English with Maria in 2 hours</p>
              <p className="text-xs text-gray-500 mt-1">Today at 3:00 PM</p>
            </div>
          </div>
        </div>
        {/* Add more notifications here */}
      </div>
      <div className="p-3 border-t border-gray-100 bg-gray-50 rounded-b-lg flex justify-between items-center">
        <span className="text-xs text-gray-500">Notification Settings</span>
        <div className="flex space-x-2">
          <button className="text-xs text-gray-500 hover:text-indigo-600">
            <i className="fas fa-envelope"></i>
          </button>
          <button className="text-xs text-gray-500 hover:text-indigo-600">
            <i className="fas fa-sms"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;

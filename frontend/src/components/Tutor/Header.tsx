import React from "react";

interface HeaderProps {
  setNotificationsOpen: (open: boolean) => void;
  notificationsOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ setNotificationsOpen, notificationsOpen }) => {
  return (
    <header className="bg-white shadow-sm px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Good morning, John!</h1>
          <p className="text-gray-600">Friday, April 11, 2025</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
            <i className="fas fa-clock mr-2"></i>126 Hours Volunteered
          </div>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 text-gray-600 hover:text-indigo-600"
          >
            <i className="fas fa-bell"></i>
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-sm">
            <i className="fas fa-video mr-2"></i> Join Live Session
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

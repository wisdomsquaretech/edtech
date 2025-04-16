import React from "react";

const Header = () => {
  return (
    <header className="bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
      <h1 className="text-2xl font-bold">School Dashboard</h1>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-2 rounded-lg text-sm"
        />
        <button className="text-gray-600 hover:text-blue-600">
          <i className="fas fa-bell"></i>
        </button>
        <img
          src="https://i.pravatar.cc/40"
          alt="User"
          className="rounded-full w-8 h-8"
        />
      </div>
    </header>
  );
};

export default Header;

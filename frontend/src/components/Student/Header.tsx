"use client";
import React, { useState } from "react";

const Header: React.FC = () => {
  const [language, setLanguage] = useState("EN");
  const userImage = "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20teenage%20student%20with%20a%20friendly%20smile%2C%20diverse%20background%2C%20high%20quality%20professional%20headshot%20on%20simple%20light%20blue%20background%2C%20looking%20at%20camera&width=100&height=100&seq=profile1&orientation=squarish";

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <h1 className="text-2xl font-bold text-blue-600">EduConnect</h1>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <i className="fas fa-globe text-blue-600"></i>
              <span className="font-medium">{language}</span>
              <i className="fas fa-chevron-down text-xs"></i>
            </button>
            <button className="flex items-center space-x-2 cursor-pointer">
              <img src={userImage} alt="Profile" className="h-8 w-8 rounded-full object-cover" />
              <i className="fas fa-chevron-down text-xs text-gray-500"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

"use client";
import React from 'react';

type Props = {
  language: string;
  onToggleNotifications: () => void;
};

const Header: React.FC<Props> = ({ language, onToggleNotifications }) => (
  <header className="bg-white shadow-sm z-10">
    <div className="px-6 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800">School Dashboard</h1>
      <div className="flex items-center space-x-4">
        <button className="bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2 flex items-center space-x-2">
          <span>{language}</span>
          <i className="fas fa-chevron-down text-xs"></i>
        </button>
        <button onClick={onToggleNotifications} className="relative p-2 text-gray-600 hover:text-gray-900">
          <i className="fas fa-bell text-xl"></i>
          <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">4</span>
        </button>
        <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white cursor-pointer">SJ</div>
      </div>
    </div>
  </header>
);

export default Header;

"use client";
import LogoutButton from "@/utils/logout";
import React, { useState } from "react";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    { icon: "fa-home", label: "Dashboard" },
    { icon: "fa-calendar", label: "Schedule" },
    { icon: "fa-book", label: "Lessons" },
    { icon: "fa-file-alt", label: "Materials" },
    { icon: "fa-chart-line", label: "Progress" },
    { icon: "fa-cog", label: "Settings" },
  ];

  return (
    <aside className={`bg-white shadow-lg h-screen sticky top-0 transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center justify-between mb-8">
          <h1 className={`text-2xl font-bold text-blue-600 transition-opacity duration-300 ${isOpen ? '' : 'opacity-0 hidden'}`}>
            EduConnect
          </h1>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-500 hover:text-blue-600"
          >
            <i className={`fas ${isOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
          </button>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className={`flex items-center p-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-50`}
                >
                  <i className={`fas ${item.icon} ${isOpen ? 'mr-3' : 'mx-auto'}`}></i>
                  <span className={`${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-gray-100 pt-4">
          <div className={`flex items-center p-3 text-gray-600 hover:bg-gray-50 cursor-pointer ${isOpen ? '' : 'justify-center'}`}>
            <i className="fas fa-sign-out-alt"></i>
            <span className={`ml-3 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
              <LogoutButton/>
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

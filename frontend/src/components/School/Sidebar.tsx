"use client";
import React from 'react';

type Props = {
  collapsed: boolean;
  activeTab: string;
  onToggle: () => void;
  onChangeTab: (tab: string) => void;
};

const Sidebar: React.FC<Props> = ({ collapsed, activeTab, onToggle, onChangeTab }) => {
  return (
    <div className={`${collapsed ? 'w-20' : 'w-64'} transition-all duration-300 ease-in-out bg-[#2A2B6B] text-white flex flex-col`}>
      <div className="p-4 flex items-center justify-between border-b border-indigo-800">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <i className="fas fa-graduation-cap text-2xl"></i>
            <span className="font-bold text-lg">EduConnect</span>
          </div>
        )}
        {collapsed && <i className="fas fa-graduation-cap text-2xl mx-auto"></i>}
        <button onClick={onToggle} className="text-white hover:text-gray-300">
          <i className={`fas ${collapsed ? 'fa-chevron-right' : 'fa-chevron-left'} text-sm`}></i>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-2 p-4">
          {['dashboard', 'students', 'sessions', 'reports', 'tutors'].map((tab) => (
            <li key={tab}>
              <button
                onClick={() => onChangeTab(tab)}
                className={`w-full text-left flex items-center p-2 rounded-lg hover:bg-indigo-800 ${
                  activeTab === tab ? 'bg-indigo-800' : ''
                }`}
              >
                <i className={`fas fa-${{
                  dashboard: 'tachometer-alt',
                  students: 'user-graduate',
                  sessions: 'calendar-alt',
                  reports: 'chart-bar',
                  tutors: 'chalkboard-teacher'
                }[tab]} text-lg`}></i>
                {!collapsed && <span className="ml-3 capitalize">{tab}</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

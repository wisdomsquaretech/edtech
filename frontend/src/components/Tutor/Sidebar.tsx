import React, { useState } from "react";
import LogoutButton from "@/utils/logout";

interface SidebarProps {
  collapsed: boolean;
  toggleCollapse: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
  user: any;
}

const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  toggleCollapse,
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  user,
}) => {

  const [isOpen, setIsOpen] = useState(true); 

  const menuItems = [
    { id: 'dashboard', icon: 'fa-home', label: 'Dashboard' },
    { id: 'calendar', icon: 'fa-calendar-alt', label: 'Calendar' },
    { id: 'lessons', icon: 'fa-book', label: 'Lesson Plans' },
    { id: 'availability', icon: 'fa-clock', label: 'Availability' },
    // { id: 'analytics', icon: 'fa-chart-bar', label: 'Analytics' },
    { id: 'settings', icon: 'fa-cog', label: 'Settings' },
  ];

  return (
    <aside className={`bg-white shadow-lg transition-all duration-300 flex flex-col ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
              JD
            </div>
            <div>
              <h3 className="font-semibold">{user?.name}</h3>
              <p className="text-xs text-gray-500">Volunteer Tutor</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 mx-auto rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
            JD
          </div>
        )}
        <button onClick={toggleCollapse} className="text-gray-500 hover:text-indigo-600 cursor-pointer">
          <i className={`fas ${collapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
        </button>
      </div>

      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center w-full px-4 py-3 ${activeTab === item.id ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'
                  } transition-colors duration-200`}
              >
                <i className={`fas ${item.icon}`}></i>
                {!collapsed && <span className="ml-3">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="border-t border-gray-100 pt-4">
            <div className={`flex items-center p-3 text-gray-600 hover:bg-gray-50 cursor-pointer ${isOpen ? '' : 'justify-center'}`}>
              <i className="fas fa-sign-out-alt"></i>
              <span className={`ml-3 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
                <LogoutButton />
              </span>
            </div>
          </div>
          <i className="fas fa-globe text-gray-500"></i>
          {!collapsed && (
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="text-sm text-gray-600 bg-transparent border-none focus:ring-0 cursor-pointer"
            >
              <option value="english">English</option>
              <option value="spanish">Español</option>
              <option value="korean">한국어</option>
            </select>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

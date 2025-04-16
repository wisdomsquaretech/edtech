import React from "react";

const Sidebar = () => {
  const menuItems = [
    "Dashboard",
    "Students",
    "Sessions",
    "Attendance",
    "Reports",
    "Settings",
  ];

  return (
    <aside className="bg-white w-64 shadow h-screen sticky top-0 p-6">
      <h2 className="text-xl font-bold text-blue-600 mb-8">SchoolPanel</h2>
      <nav>
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                <i className="fas fa-angle-right mr-2"></i>{item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

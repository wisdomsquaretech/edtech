import React from "react";

const Notifications = () => {
  const notifications = [
    { id: 1, type: "reminder", message: "Upcoming session tomorrow at 4 PM", time: "1h ago" },
    { id: 2, type: "announcement", message: "New materials available", time: "3h ago" },
    { id: 3, type: "achievement", message: "You completed 10 lessons!", time: "1 day ago" },
  ];

  return (
    <section className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Notifications</h3>
        <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">{notifications.length}</span>
      </div>
      <div className="p-6 space-y-4">
        {notifications.map((n) => (
          <div key={n.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
            <div className={`p-2 rounded-full ${n.type === "reminder" ? "bg-blue-100 text-blue-600" : n.type === "announcement" ? "bg-purple-100 text-purple-600" : "bg-green-100 text-green-600"}`}>
              <i className={`fas ${n.type === "reminder" ? "fa-bell" : n.type === "announcement" ? "fa-bullhorn" : "fa-trophy"}`}></i>
            </div>
            <div className="flex-1">
              <p className="text-gray-900">{n.message}</p>
              <p className="text-xs text-gray-500">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Notifications;

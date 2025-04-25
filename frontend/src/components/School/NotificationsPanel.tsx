"use client";
import React from 'react';

type Notification = {
  id: number;
  type: 'approval' | 'alert' | 'info';
  message: string;
  time: string;
};

type Props = {
  notifications: Notification[];
};

const NotificationsPanel: React.FC<Props> = ({ notifications }) => (
  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-20 border border-gray-200">
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">Notifications</h3>
        <button className="text-blue-600 text-sm hover:text-blue-800">Mark all as read</button>
      </div>
    </div>
    <div className="max-h-96 overflow-y-auto">
      {notifications.map((n) => (
        <div key={n.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
          <div className="flex">
            <div className="mr-3">
              <i className={`fas ${
                n.type === 'approval' ? 'fa-user-plus text-blue-500' :
                n.type === 'alert' ? 'fa-exclamation-triangle text-yellow-500' :
                'fa-info-circle text-green-500'
              }`}></i>
            </div>
            <div>
              <p className="text-sm">{n.message}</p>
              <p className="text-xs text-gray-500 mt-1">{n.time}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="p-3 text-center border-t border-gray-200">
      <button className="text-blue-600 text-sm hover:text-blue-800">View all notifications</button>
    </div>
  </div>
);

export default NotificationsPanel;

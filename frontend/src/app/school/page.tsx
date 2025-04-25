"use client";
import React, { useState } from 'react';
import Sidebar from '@/components/School/Sidebar';
import Header from '@/components/School/Header';
import NotificationsPanel from '@/components/School/NotificationsPanel';
import Students from '@/components/School/Students';
import Tutors from '@/components/School/Tutors';
import SessionLogs from '@/components/School/SessionLogs';
import Reports from '@/components/School/Reports';

const SchoolDashboard: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('students');
  const [selectedLanguage] = useState('English');
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications: { id: number; type: 'approval' | 'alert' | 'info'; message: string; time: string }[] = [
    { id: 1, type: 'approval', message: 'New student registration: Sophia Chen', time: '2 hours ago' },
    { id: 2, type: 'alert', message: 'Noah Garcia missed 2 consecutive sessions', time: '1 day ago' },
    { id: 3, type: 'info', message: 'New tutor available for assignment', time: '2 days ago' },
    { id: 4, type: 'approval', message: 'New student registration: Ava Patel', time: '3 days ago' },
  ];
  

  const renderTabContent = () => {
    switch (activeTab) {
      case 'students':
        return <Students />;
      case 'tutors':
        return <Tutors />;
      case 'sessions':
        return <SessionLogs />;
      case 'reports':
        return <Reports />;
      default:
        return <div>Select a tab from the sidebar</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        collapsed={sidebarCollapsed}
        activeTab={activeTab}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onChangeTab={setActiveTab}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          language={selectedLanguage}
          onToggleNotifications={() => setShowNotifications(!showNotifications)}
        />

        {showNotifications && <NotificationsPanel notifications={notifications} />}

        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default SchoolDashboard;

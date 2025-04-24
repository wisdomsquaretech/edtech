"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Tutor/Sidebar";
import Header from "@/components/Tutor/Header";
import Notifications from "@/components/Tutor/Notifications";
import UpcomingSessions from "@/components/Tutor/UpcomingSessions";
import WeeklyCalendar from "@/components/Tutor/WeeklyCalendar";
import Availability from "@/components/Tutor/Availability";
import LessonPlans from "@/components/Tutor/LessonPlans";
import AnalyticsChart from "@/components/Tutor/AnalyticsChart";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import GreetingComponent from "@/utils/greeting";

const TutorDashboard: React.FC = () => {
  const user = useCurrentUser();
  const [greeting, setGreeting] = useState('');
  const [dateString, setDateString] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [language, setLanguage] = useState("english");
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 overflow-hidden">
      <Sidebar
        collapsed={isSidebarCollapsed}
        toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        user={user} 
        
      />
      <main className="flex-1 overflow-y-auto">
        <GreetingComponent 
          onGreetingChange={(greeting, date) => {
            setGreeting(greeting);
            setDateString(date);
          }}
        />
        <Header
          setNotificationsOpen={setNotificationsOpen}
          notificationsOpen={notificationsOpen}
          // user={user}
          greeting={greeting}
          dateString={dateString}
        />
        {notificationsOpen && <Notifications />}
        <div className="p-6">
          <UpcomingSessions />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <WeeklyCalendar />
            <Availability/>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LessonPlans />
            <AnalyticsChart />
          </div>
        </div>
      </main>
    </div>
  );
};

export default TutorDashboard;
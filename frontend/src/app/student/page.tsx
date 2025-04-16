// File: app/student/page.tsx
"use client";
import React from "react";
import StudentHeader from "@/components/Student/Header";
import StudentSchedule from "@/components/Student/Schedule";
import StudentLessons from "@/components/Student/Lessons";
import StudentProgress from "@/components/Student/Progress";
import StudentNotifications from "@/components/Student/Notifications";
import StudentFooter from "@/components/Student/Footer";
import Sidebar from "@/components/Student/Sidebar";
import WelcomeBanner from "@/components/Student/WelcomeBanner";

const StudentDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex">
      <Sidebar/>
      <div className="flex-1">
        <StudentHeader />
        <WelcomeBanner/>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <StudentSchedule />
              <StudentLessons />
            </div>
            <div className="space-y-8">
              <StudentProgress />
              <StudentNotifications />
            </div>
          </div>
        </main>
        <StudentFooter />
      </div>
    </div>
  );
};

export default StudentDashboard;

"use client";
import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import OverviewCards from "./OverviewCards";
import Tabs from "./Tabs";
import StudentTable from "./StudentTable";
import SessionCalendar from "./SessionCalendar";
import ReportsPanel from "./ReportsPanel";
import AttendanceChart from "./AttendanceChart";

const SchoolDashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      <Sidebar/>
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 space-y-6">
          <OverviewCards />
          <Tabs />
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              <StudentTable />
              <SessionCalendar />
            </div>
            <div className="space-y-6">
              <ReportsPanel />
              <AttendanceChart />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SchoolDashboard;

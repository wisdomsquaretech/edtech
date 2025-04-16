// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
"use client";
import React, { useState } from 'react';
import Sidebar from '@/component/student-dashboard/Sidebar';
import Header from '@/component/student-dashboard/Header';
import WelcomeSection from '@/component/student-dashboard/WecomeSection';
import ScheduleSection from '@/component/student-dashboard/ScheduleSection';
import LessonsSection from '@/component/student-dashboard/LessonsSection';
import ProgressSummarySection from '@/component/student-dashboard/ProgressSummarySection';
import Footer from '@/component/student-dashboard/Footer';
import Notifications from '@/component/student-dashboard/Notifications';
const Student2: React.FC = () => {
    
    // Mock user data
    // const userData = {
    //     name: 'Alex Johnson',
    //     profileImage: 'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20teenage%20student%20with%20a%20friendly%20smile%2C%20diverse%20background%2C%20high%20quality%20professional%20headshot%20on%20simple%20light%20blue%20background%2C%20looking%20at%20camera&width=100&height=100&seq=profile1&orientation=squarish',
    //     streak: 15,
    //     credits: 45,
    //     completedLessons: 12,
    // };
   
    return (
        <div className="min-h-screen bg-gray-50 font-sans flex">
            {/* Sidebar */}
            <Sidebar/>
            
            <div className="flex-1">
                {/* Header */}
                <Header/>
                {/* Welcome Banner */}
                <WelcomeSection/>
                
                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Schedule & Lessons */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Schedule Section */}
                            <ScheduleSection />
                            {/* Lessons Section */}
                            <LessonsSection/>
                        </div>
                        {/* Right Column - Progress & Notifications */}
                        <div className="space-y-8">
                            {/* Progress Summary */}
                            <ProgressSummarySection/>
                            {/* Notifications */}
                            <Notifications/>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <Footer/>
            </div>
        </div>
    );
};
export default Student2;

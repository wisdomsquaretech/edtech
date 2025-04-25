// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
"use client"
import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
const TutorDashboardCalendar: React.FC = () => {
    const [view, setView] = useState<'week' | 'month'>('week');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [selectedSession, setSelectedSession] = useState<any>(null);
    const [modalMode, setModalMode] = useState<'add' | 'edit' | 'cancel'>('add');
    // Mock data for sessions
    const [sessions, setSessions] = useState([
        {
            id: 1,
            title: "English Conversation",
            studentName: "Alex Johnson",
            level: "Intermediate",
            startTime: new Date(2025, 3, 23, 10, 0),
            endTime: new Date(2025, 3, 23, 11, 0),
            platform: "Zoom",
            meetingLink: "https://zoom.us/j/123456789",
            status: "upcoming"
        },
        {
            id: 2,
            title: "Spanish Grammar",
            studentName: "Maria Garcia",
            level: "Advanced",
            startTime: new Date(2025, 3, 23, 14, 0),
            endTime: new Date(2025, 3, 23, 15, 0),
            platform: "Jitsi",
            meetingLink: "https://meet.jit.si/SpanishClass123",
            status: "upcoming"
        },
        {
            id: 3,
            title: "French Basics",
            studentName: "Thomas Wilson",
            level: "Beginner",
            startTime: new Date(2025, 3, 24, 9, 0),
            endTime: new Date(2025, 3, 24, 10, 0),
            platform: "Zoom",
            meetingLink: "https://zoom.us/j/987654321",
            status: "upcoming"
        },
        {
            id: 4,
            title: "German Conversation",
            studentName: "Emma Schmidt",
            level: "Intermediate",
            startTime: new Date(2025, 3, 25, 16, 0),
            endTime: new Date(2025, 3, 25, 17, 0),
            platform: "Jitsi",
            meetingLink: "https://meet.jit.si/GermanClass456",
            status: "upcoming"
        },
        {
            id: 5,
            title: "Japanese Kanji",
            studentName: "Ryan Tanaka",
            level: "Advanced",
            startTime: new Date(2025, 3, 26, 11, 0),
            endTime: new Date(2025, 3, 26, 12, 30),
            platform: "Zoom",
            meetingLink: "https://zoom.us/j/567891234",
            status: "upcoming"
        }
    ]);
    // Time zone handling
    const [timezone, setTimezone] = useState("UTC");
    const timezones = [
        "UTC",
        "America/New_York",
        "America/Los_Angeles",
        "Europe/London",
        "Europe/Paris",
        "Asia/Tokyo",
        "Australia/Sydney"
    ];
    // Generate dates for the current week or month
    const getDates = () => {
        const dates = [];
        const startDate = new Date(currentDate);
        if (view === 'week') {
            // Set to the beginning of the week (Sunday)
            const day = startDate.getDay();
            startDate.setDate(startDate.getDate() - day);
            // Generate 7 days
            for (let i = 0; i < 7; i++) {
                const date = new Date(startDate);
                date.setDate(date.getDate() + i);
                dates.push(date);
            }
        } else {
            // Set to the beginning of the month
            startDate.setDate(1);
            // Set to the beginning of the week containing the first day
            const day = startDate.getDay();
            startDate.setDate(startDate.getDate() - day);
            // Generate up to 42 days (6 weeks) to ensure we cover the full month
            for (let i = 0; i < 42; i++) {
                const date = new Date(startDate);
                date.setDate(date.getDate() + i);
                dates.push(date);
                // Stop if we've gone past the end of the month and completed the week
                if (date.getMonth() !== currentDate.getMonth() && date.getDay() === 6 && i >= 28) {
                    break;
                }
            }
        }
        return dates;
    };
    // Get sessions for a specific date
    const getSessionsForDate = (date: Date) => {
        return sessions.filter(session => {
            const sessionDate = new Date(session.startTime);
            return sessionDate.getDate() === date.getDate() &&
                sessionDate.getMonth() === date.getMonth() &&
                sessionDate.getFullYear() === date.getFullYear();
        });
    };
    // Get upcoming sessions (sorted by date)
    const getUpcomingSessions = () => {
        const now = new Date();
        return [...sessions]
            .filter(session => new Date(session.startTime) > now)
            .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
            .slice(0, 5); // Limit to 5 upcoming sessions
    };
    // Navigate to previous week/month
    const goToPrevious = () => {
        const newDate = new Date(currentDate);
        if (view === 'week') {
            newDate.setDate(newDate.getDate() - 7);
        } else {
            newDate.setMonth(newDate.getMonth() - 1);
        }
        setCurrentDate(newDate);
    };
    // Navigate to next week/month
    const goToNext = () => {
        const newDate = new Date(currentDate);
        if (view === 'week') {
            newDate.setDate(newDate.getDate() + 7);
        } else {
            newDate.setMonth(newDate.getMonth() + 1);
        }
        setCurrentDate(newDate);
    };
    // Go to today
    const goToToday = () => {
        setCurrentDate(new Date());
    };
    // Format date for display
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };
    // Format time for display
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };
    // Handle session click
    const handleSessionClick = (session: any) => {
        setSelectedSession(session);
        setModalMode('edit');
        setShowModal(true);
    };
    // Handle add new session
    const handleAddSession = (date: Date) => {
        const newSession = {
            id: null,
            title: "",
            studentName: "",
            level: "Beginner",
            startTime: new Date(date),
            endTime: new Date(date.getTime() + 60 * 60 * 1000), // 1 hour later
            platform: "Zoom",
            meetingLink: "",
            status: "upcoming"
        };
        setSelectedSession(newSession);
        setModalMode('add');
        setShowModal(true);
    };
    // Handle reschedule session
    const handleReschedule = (session: any) => {
        setSelectedSession(session);
        setModalMode('edit');
        setShowModal(true);
    };
    // Handle cancel session
    const handleCancel = (session: any) => {
        setSelectedSession(session);
        setModalMode('cancel');
        setShowModal(true);
    };
    // Save session (add or edit)
    const saveSession = () => {
        if (modalMode === 'add') {
            // Add new session
            const newSession = {
                ...selectedSession,
                id: Math.max(...sessions.map(s => s.id), 0) + 1
            };
            setSessions([...sessions, newSession]);
        } else if (modalMode === 'edit') {
            // Update existing session
            if (!selectedSession.rescheduleReason) {
                alert('Please provide a reason for rescheduling');
                return;
            }
            setSessions(sessions.map(s => s.id === selectedSession.id ? selectedSession : s));
        } else if (modalMode === 'cancel') {
            // Remove session
            if (!selectedSession.cancelReason) {
                alert('Please provide a reason for cancellation');
                return;
            }
            setSessions(sessions.filter(s => s.id !== selectedSession.id));
        }
        setShowModal(false);
    };
    // Render time slots for week view
    const renderTimeSlots = () => {
        const timeSlots = [];
        for (let hour = 8; hour < 20; hour++) {
            timeSlots.push(
                <div key={hour} className="flex">
                    <div className="w-16 pr-2 text-right text-xs text-gray-500">
                        {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                    </div>
                    <div className="flex-grow border-t border-gray-200 mt-3"></div>
                </div>
            );
        }
        return timeSlots;
    };
    // Get session color based on level
    const getSessionColor = (level: string) => {
        switch (level.toLowerCase()) {
            case 'beginner':
                return 'bg-blue-100 border-blue-300 text-blue-800';
            case 'intermediate':
                return 'bg-green-100 border-green-300 text-green-800';
            case 'advanced':
                return 'bg-purple-100 border-purple-300 text-purple-800';
            default:
                return 'bg-gray-100 border-gray-300 text-gray-800';
        }
    };
    // Initialize chart for session statistics
    useEffect(() => {
        const chartDom = document.getElementById('sessionsChart');
        if (chartDom) {
            const myChart = echarts.init(chartDom);
            // Count sessions by day of week
            const dayCount = [0, 0, 0, 0, 0, 0, 0]; // Sun to Sat
            sessions.forEach(session => {
                const day = new Date(session.startTime).getDay();
                dayCount[day]++;
            });
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const option = {
                animation: false,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: days,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        minInterval: 1
                    }
                ],
                series: [
                    {
                        name: 'Sessions',
                        type: 'bar',
                        barWidth: '60%',
                        data: dayCount,
                        itemStyle: {
                            color: '#4F46E5'
                        }
                    }
                ]
            };
            myChart.setOption(option);
            return () => {
                myChart.dispose();
            };
        }
    }, [sessions]);
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Dashboard Header */}
            {/* <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-gray-900">Tutor Dashboard</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <button className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none !rounded-button whitespace-nowrap">
                                    <span className="mr-1">
                                        <i className="fas fa-bell"></i>
                                    </span>
                                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                                </button>
                            </div>
                            <div className="flex items-center">
                                <img
                                    src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20female%20tutor%20with%20glasses%20and%20a%20friendly%20smile%2C%20high%20quality%20portrait%20photo%20with%20neutral%20background%2C%20professional%20looking&width=40&height=40&seq=avatar1&orientation=squarish"
                                    alt="User avatar"
                                    className="h-10 w-10 rounded-full object-cover"
                                />
                                <span className="ml-2 text-gray-700">Sarah Johnson</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header> */}
            {/* Dashboard Content */}
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-4 py-4">
                <div className="flex flex-col md:flex-row">
                    {/* Sidebar */}
                    {/* <div className="w-full md:w-64 flex-shrink-0 mb-6 md:mb-0">
                        <div className="bg-white rounded-lg shadow-sm p-4">
                            <div className="flex items-center mb-6">
                                <img
                                    src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20female%20tutor%20with%20glasses%20and%20a%20friendly%20smile%2C%20high%20quality%20portrait%20photo%20with%20neutral%20background%2C%20professional%20looking&width=64&height=64&seq=avatar2&orientation=squarish"
                                    alt="User profile"
                                    className="h-16 w-16 rounded-full object-cover"
                                />
                                <div className="ml-3">
                                    <h2 className="text-lg font-semibold">Sarah Johnson</h2>
                                    <p className="text-sm text-gray-600">Language Tutor</p>
                                </div>
                            </div>
                            <nav className="space-y-1">
                                <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                                    <i className="fas fa-home w-5 h-5 mr-2 text-gray-500"></i>
                                    Dashboard
                                </a>
                                <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-indigo-50 text-indigo-700">
                                    <i className="fas fa-calendar-alt w-5 h-5 mr-2 text-indigo-500"></i>
                                    Calendar
                                </a>
                                <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                                    <i className="fas fa-users w-5 h-5 mr-2 text-gray-500"></i>
                                    Students
                                </a>
                                <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                                    <i className="fas fa-book w-5 h-5 mr-2 text-gray-500"></i>
                                    Resources
                                </a>
                                <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                                    <i className="fas fa-chart-bar w-5 h-5 mr-2 text-gray-500"></i>
                                    Analytics
                                </a>
                                <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                                    <i className="fas fa-cog w-5 h-5 mr-2 text-gray-500"></i>
                                    Settings
                                </a>
                            </nav>
                        </div>
                    </div> */}
                    {/* Main Content */}
                    <div className="flex-1 md:ml-8">
                        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
                            {/* Calendar Area */}
                            <div className="flex-1 bg-white rounded-lg shadow-sm">
                                {/* Calendar Header */}
                                <div className="p-4 border-b border-gray-200">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex items-center mb-4 sm:mb-0">
                                            <h2 className="text-xl font-semibold text-gray-900">
                                                {view === 'week' ? 'Weekly Calendar' : 'Monthly Calendar'}
                                            </h2>
                                            <div className="ml-4 flex">
                                                <button
                                                    onClick={() => setView('week')}
                                                    className={`px-3 py-1.5 text-sm font-medium ${view === 'week' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'} rounded-l-md !rounded-button whitespace-nowrap cursor-pointer`}
                                                >
                                                    Week
                                                </button>
                                                <button
                                                    onClick={() => setView('month')}
                                                    className={`px-3 py-1.5 text-sm font-medium ${view === 'month' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'} rounded-r-md !rounded-button whitespace-nowrap cursor-pointer`}
                                                >
                                                    Month
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="mr-4">
                                                <select
                                                    value={timezone}
                                                    onChange={(e) => setTimezone(e.target.value)}
                                                    className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                >
                                                    {timezones.map((tz) => (
                                                        <option key={tz} value={tz}>{tz}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={goToPrevious}
                                                    className="p-2 rounded-full hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer"
                                                >
                                                    <i className="fas fa-chevron-left text-gray-600"></i>
                                                </button>
                                                <button
                                                    onClick={goToToday}
                                                    className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md !rounded-button whitespace-nowrap cursor-pointer"
                                                >
                                                    Today
                                                </button>
                                                <button
                                                    onClick={goToNext}
                                                    className="p-2 rounded-full hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer"
                                                >
                                                    <i className="fas fa-chevron-right text-gray-600"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-2 text-sm text-gray-500">
                                        {view === 'week'
                                            ? `Week of ${currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
                                            : currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                                        }
                                    </div>
                                </div>
                                {/* Calendar Body */}
                                <div className="p-4">
                                    {view === 'week' ? (
                                        <div className="grid grid-cols-7 gap-2">
                                            {/* Day headers */}
                                            {getDates().map((date, index) => (
                                                <div key={index} className="text-center">
                                                    <div className={`text-sm font-medium ${date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth() ? 'text-indigo-600' : 'text-gray-900'}`}>
                                                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                                                    </div>
                                                    <div className={`text-sm mt-1 ${date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth() ? 'bg-indigo-600 text-white' : 'text-gray-600'} rounded-full w-7 h-7 flex items-center justify-center mx-auto`}>
                                                        {date.getDate()}
                                                    </div>
                                                </div>
                                            ))}
                                            {/* Time slots and sessions */}
                                            {getDates().map((date, dateIndex) => (
                                                <div key={dateIndex} className="relative min-h-[600px] border-r border-gray-200 last:border-r-0">
                                                    {/* Time grid lines */}
                                                    {Array.from({ length: 12 }).map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className="absolute w-full border-t border-gray-100"
                                                            style={{ top: `${(i * 50) + 10}px` }}
                                                        ></div>
                                                    ))}
                                                    {/* Time labels */}
                                                    {dateIndex === 0 && Array.from({ length: 12 }).map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className="absolute -left-16 text-xs text-gray-500"
                                                            style={{ top: `${(i * 50) + 2}px` }}
                                                        >
                                                            {i + 8 > 12 ? `${i + 8 - 12} PM` : i + 8 === 12 ? '12 PM' : `${i + 8} AM`}
                                                        </div>
                                                    ))}
                                                    {/* Sessions */}
                                                    {getSessionsForDate(date).map((session) => {
                                                        const startHour = session.startTime.getHours();
                                                        const startMinute = session.startTime.getMinutes();
                                                        const endHour = session.endTime.getHours();
                                                        const endMinute = session.endTime.getMinutes();
                                                        const topPosition = ((startHour - 8) * 50) + (startMinute / 60 * 50) + 10;
                                                        const height = ((endHour - startHour) * 50) + ((endMinute - startMinute) / 60 * 50);
                                                        return (
                                                            <div
                                                                key={session.id}
                                                                className={`absolute left-1 right-1 rounded-md p-2 border shadow-sm cursor-pointer ${getSessionColor(session.level)}`}
                                                                style={{
                                                                    top: `${topPosition}px`,
                                                                    height: `${height}px`
                                                                }}
                                                                onClick={() => handleSessionClick(session)}
                                                            >
                                                                <div className="text-xs font-semibold truncate">{session.title}</div>
                                                                <div className="text-xs truncate">{session.studentName}</div>
                                                                <div className="text-xs truncate">
                                                                    {formatTime(session.startTime)} - {formatTime(session.endTime)}
                                                                </div>
                                                                <div className="text-xs mt-1">
                                                                    <span className="inline-flex items-center">
                                                                        <i className={`fas fa-${session.platform.toLowerCase() === 'zoom' ? 'video' : 'phone-alt'} mr-1`}></i>
                                                                        {session.platform}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                    {/* Empty space for adding new sessions */}
                                                    <div
                                                        className="absolute inset-0 cursor-pointer"
                                                        onClick={() => handleAddSession(date)}
                                                    ></div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div>
                                            {/* Month view */}
                                            <div className="grid grid-cols-7 gap-px bg-gray-200">
                                                {/* Day headers */}
                                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                                    <div key={day} className="bg-gray-100 p-2 text-center text-sm font-medium text-gray-700">
                                                        {day}
                                                    </div>
                                                ))}
                                                {/* Calendar days */}
                                                {getDates().map((date, index) => {
                                                    const isCurrentMonth = date.getMonth() === currentDate.getMonth();
                                                    const isToday = date.getDate() === new Date().getDate() &&
                                                        date.getMonth() === new Date().getMonth() &&
                                                        date.getFullYear() === new Date().getFullYear();
                                                    const sessions = getSessionsForDate(date);
                                                    return (
                                                        <div
                                                            key={index}
                                                            className={`bg-white min-h-[100px] p-1 ${isCurrentMonth ? '' : 'bg-gray-50'}`}
                                                        >
                                                            <div
                                                                className={`text-right p-1 ${isToday ? 'bg-indigo-600 text-white rounded-full w-7 h-7 flex items-center justify-center ml-auto' : isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}`}
                                                            >
                                                                {date.getDate()}
                                                            </div>
                                                            <div className="mt-1">
                                                                {sessions.slice(0, 3).map((session) => (
                                                                    <div
                                                                        key={session.id}
                                                                        className={`mb-1 px-2 py-1 text-xs rounded truncate cursor-pointer ${getSessionColor(session.level)}`}
                                                                        onClick={() => handleSessionClick(session)}
                                                                    >
                                                                        {formatTime(session.startTime)} {session.title}
                                                                    </div>
                                                                ))}
                                                                {sessions.length > 3 && (
                                                                    <div className="text-xs text-gray-500 px-2">
                                                                        +{sessions.length - 3} more
                                                                    </div>
                                                                )}
                                                                {sessions.length === 0 && (
                                                                    <div
                                                                        className="h-16 w-full cursor-pointer"
                                                                        onClick={() => handleAddSession(date)}
                                                                    ></div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Right Panel */}
                            <div className="w-full lg:w-80 flex-shrink-0 space-y-6">
                                {/* Upcoming Sessions */}
                                <div className="bg-white rounded-lg shadow-sm">
                                    <div className="p-4 border-b border-gray-200">
                                        <h3 className="text-lg font-medium text-gray-900">Upcoming Sessions</h3>
                                    </div>
                                    <div className="p-4">
                                        {getUpcomingSessions().length > 0 ? (
                                            <div className="space-y-4">
                                                {getUpcomingSessions().map((session) => (
                                                    <div key={session.id} className="border rounded-lg p-3 hover:bg-gray-50">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h4 className="font-medium text-gray-900">{session.title}</h4>
                                                                <p className="text-sm text-gray-600">{session.studentName}</p>
                                                                <div className="mt-1 flex items-center text-sm text-gray-500">
                                                                    <i className="fas fa-calendar-day mr-1"></i>
                                                                    <span>{formatDate(session.startTime)}</span>
                                                                </div>
                                                                <div className="flex items-center text-sm text-gray-500">
                                                                    <i className="fas fa-clock mr-1"></i>
                                                                    <span>{formatTime(session.startTime)} - {formatTime(session.endTime)}</span>
                                                                </div>
                                                                <div className="mt-1 flex items-center">
                                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${session.level === 'Beginner' ? 'bg-blue-100 text-blue-800' :
                                                                            session.level === 'Intermediate' ? 'bg-green-100 text-green-800' :
                                                                                'bg-purple-100 text-purple-800'
                                                                        }`}>
                                                                        {session.level}
                                                                    </span>
                                                                    <span className="ml-2 inline-flex items-center text-xs text-gray-500">
                                                                        <i className={`fas fa-${session.platform.toLowerCase() === 'zoom' ? 'video' : 'phone-alt'} mr-1`}></i>
                                                                        {session.platform}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-3 flex space-x-2">
                                                            <a
                                                                href={session.meetingLink}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex-1 bg-indigo-600 text-white px-3 py-1.5 text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 !rounded-button whitespace-nowrap cursor-pointer"
                                                            >
                                                                Join Session
                                                            </a>
                                                            <button
                                                                onClick={() => handleReschedule(session)}
                                                                className="flex-1 bg-white text-gray-700 px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 !rounded-button whitespace-nowrap cursor-pointer"
                                                            >
                                                                Reschedule
                                                            </button>
                                                            <button
                                                                onClick={() => handleCancel(session)}
                                                                className="text-gray-700 px-2 py-1.5 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 !rounded-button whitespace-nowrap cursor-pointer"
                                                            >
                                                                <i className="fas fa-times"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-6">
                                                <i className="fas fa-calendar-check text-gray-400 text-4xl mb-2"></i>
                                                <p className="text-gray-500">No upcoming sessions</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* Session Statistics */}
                                <div className="bg-white rounded-lg shadow-sm">
                                    <div className="p-4 border-b border-gray-200">
                                        <h3 className="text-lg font-medium text-gray-900">Weekly Statistics</h3>
                                    </div>
                                    <div className="p-4">
                                        <div id="sessionsChart" className="h-64"></div>
                                    </div>
                                </div>
                                {/* Quick Actions */}
                                <div className="bg-white rounded-lg shadow-sm">
                                    <div className="p-4 border-b border-gray-200">
                                        <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
                                    </div>
                                    <div className="p-4 space-y-3">
                                        <button
                                            onClick={() => {
                                                setSelectedSession({
                                                    id: null,
                                                    title: "",
                                                    studentName: "",
                                                    level: "Beginner",
                                                    startTime: new Date(),
                                                    endTime: new Date(new Date().getTime() + 60 * 60 * 1000),
                                                    platform: "Zoom",
                                                    meetingLink: "",
                                                    status: "upcoming"
                                                });
                                                setModalMode('add');
                                                setShowModal(true);
                                            }}
                                            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 !rounded-button whitespace-nowrap cursor-pointer"
                                        >
                                            <i className="fas fa-plus mr-2"></i>
                                            Add New Session
                                        </button>
                                        <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 !rounded-button whitespace-nowrap cursor-pointer">
                                            <i className="fas fa-calendar-alt mr-2"></i>
                                            Set Availability
                                        </button>
                                        <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 !rounded-button whitespace-nowrap cursor-pointer">
                                            <i className="fab fa-google mr-2"></i>
                                            Sync with Google Calendar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Session Modal */}
            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            {modalMode === 'add' ? 'Add New Session' :
                                                modalMode === 'edit' ? 'Edit Session' :
                                                    'Cancel Session'}
                                        </h3>
                                        {modalMode !== 'cancel' ? (
                                            <div className="mt-4 space-y-4">
                                                <div>
                                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                                        Session Title
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="title"
                                                        value={selectedSession?.title || ''}
                                                        onChange={(e) => setSelectedSession({ ...selectedSession, title: e.target.value })}
                                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="student" className="block text-sm font-medium text-gray-700">
                                                        Student Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="student"
                                                        value={selectedSession?.studentName || ''}
                                                        onChange={(e) => setSelectedSession({ ...selectedSession, studentName: e.target.value })}
                                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                                                            Start Time
                                                        </label>
                                                        <input
                                                            type="datetime-local"
                                                            id="startTime"
                                                            value={selectedSession?.startTime.toISOString().slice(0, 16)}
                                                            onChange={(e) => {
                                                                const newStartTime = new Date(e.target.value);
                                                                setSelectedSession({
                                                                    ...selectedSession,
                                                                    startTime: newStartTime,
                                                                    endTime: new Date(newStartTime.getTime() + (selectedSession.endTime - selectedSession.startTime))
                                                                });
                                                            }}
                                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                                                            End Time
                                                        </label>
                                                        <input
                                                            type="datetime-local"
                                                            id="endTime"
                                                            value={selectedSession?.endTime.toISOString().slice(0, 16)}
                                                            onChange={(e) => setSelectedSession({ ...selectedSession, endTime: new Date(e.target.value) })}
                                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                                                            Level
                                                        </label>
                                                        <select
                                                            id="level"
                                                            value={selectedSession?.level || 'Beginner'}
                                                            onChange={(e) => setSelectedSession({ ...selectedSession, level: e.target.value })}
                                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        >
                                                            <option value="Beginner">Beginner</option>
                                                            <option value="Intermediate">Intermediate</option>
                                                            <option value="Advanced">Advanced</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="platform" className="block text-sm font-medium text-gray-700">
                                                            Platform
                                                        </label>
                                                        <select
                                                            id="platform"
                                                            value={selectedSession?.platform || 'Zoom'}
                                                            onChange={(e) => setSelectedSession({ ...selectedSession, platform: e.target.value })}
                                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        >
                                                            <option value="Zoom">Zoom</option>
                                                            <option value="Jitsi">Jitsi</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="meetingLink" className="block text-sm font-medium text-gray-700">
                                                        Meeting Link
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="meetingLink"
                                                        value={selectedSession?.meetingLink || ''}
                                                        onChange={(e) => setSelectedSession({ ...selectedSession, meetingLink: e.target.value })}
                                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    />
                                                </div>
                                                {modalMode === 'edit' && (
                                                    <div>
                                                        <label htmlFor="rescheduleReason" className="block text-sm font-medium text-gray-700 mt-4">
                                                            Reason for Reschedule <span className="text-red-500">*</span>
                                                        </label>
                                                        <textarea
                                                            id="rescheduleReason"
                                                            required
                                                            value={selectedSession?.rescheduleReason || ''}
                                                            onChange={(e) => setSelectedSession({ ...selectedSession, rescheduleReason: e.target.value })}
                                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            rows={3}
                                                            placeholder="Please provide a reason for rescheduling"
                                                        ></textarea>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="mt-4">
                                                <p className="text-sm text-gray-500">
                                                    Are you sure you want to cancel this session? This action cannot be undone.
                                                </p>
                                                <div className="mt-4 bg-gray-50 p-4 rounded-md">
                                                    <h4 className="font-medium text-gray-900">{selectedSession?.title}</h4>
                                                    <p className="text-sm text-gray-600">Student: {selectedSession?.studentName}</p>
                                                    <p className="text-sm text-gray-600">
                                                        {formatDate(selectedSession?.startTime)}, {formatTime(selectedSession?.startTime)} - {formatTime(selectedSession?.endTime)}
                                                    </p>
                                                </div>
                                                <div className="mt-4">
                                                    <label htmlFor="cancelReason" className="block text-sm font-medium text-gray-700">
                                                        Reason for Cancellation <span className="text-red-500">*</span>
                                                    </label>
                                                    <textarea
                                                        id="cancelReason"
                                                        required
                                                        value={selectedSession?.cancelReason || ''}
                                                        onChange={(e) => setSelectedSession({ ...selectedSession, cancelReason: e.target.value })}
                                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        rows={3}
                                                        placeholder="Please provide a reason for cancellation"
                                                    ></textarea>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    onClick={saveSession}
                                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm !rounded-button whitespace-nowrap cursor-pointer ${modalMode === 'cancel' ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
                                        }`}
                                >
                                    {modalMode === 'add' ? 'Add Session' :
                                        modalMode === 'edit' ? 'Save Changes' :
                                            'Confirm Cancellation'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm !rounded-button whitespace-nowrap cursor-pointer"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default TutorDashboardCalendar;

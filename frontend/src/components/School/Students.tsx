"use client";
import React, {useState} from 'react';
import * as echarts from 'echarts';

const Students: React.FC = () => {
        const [activeTab, setActiveTab] = useState('students');


        const students = [
            { id: 1, name: 'Emma Wilson', status: 'active', lastSession: '2025-04-08', attendance: '92%', progress: 'Good' },
            { id: 2, name: 'James Miller', status: 'active', lastSession: '2025-04-10', attendance: '88%', progress: 'Excellent' },
            { id: 3, name: 'Sophia Chen', status: 'pending', lastSession: '-', attendance: '-', progress: 'Pending' },
            { id: 4, name: 'Noah Garcia', status: 'active', lastSession: '2025-04-05', attendance: '75%', progress: 'Needs Improvement' },
            { id: 5, name: 'Olivia Kim', status: 'active', lastSession: '2025-04-09', attendance: '95%', progress: 'Excellent' },
            { id: 6, name: 'William Lee', status: 'active', lastSession: '2025-04-11', attendance: '90%', progress: 'Good' },
            { id: 7, name: 'Ava Patel', status: 'pending', lastSession: '-', attendance: '-', progress: 'Pending' },
            { id: 8, name: 'Ethan Johnson', status: 'active', lastSession: '2025-04-07', attendance: '82%', progress: 'Good' },
          ];
        
          // Mock notifications
          const notifications = [
            { id: 1, type: 'approval', message: 'New student registration: Sophia Chen', time: '2 hours ago' },
            { id: 2, type: 'alert', message: 'Noah Garcia missed 2 consecutive sessions', time: '1 day ago' },
            { id: 3, type: 'info', message: 'New tutor available for assignment', time: '2 days ago' },
            { id: 4, type: 'approval', message: 'New student registration: Ava Patel', time: '3 days ago' },
          ];   
    // Initialize and render the chart
      React.useEffect(() => {
        if (activeTab === 'students') {
          const chartDom = document.getElementById('attendance-chart');
          if (chartDom) {
            const myChart = echarts.init(chartDom);
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
                  data: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                  axisTick: {
                    alignWithLabel: true
                  }
                }
              ],
              yAxis: [
                {
                  type: 'value',
                  max: 100
                }
              ],
              series: [
                {
                  name: 'Attendance Rate',
                  type: 'bar',
                  barWidth: '60%',
                  data: [85, 88, 92, 90],
                  itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: '#6B2A5C' },
                      { offset: 1, color: '#4A90E2' }
                    ])
                  }
                }
              ]
            };
            myChart.setOption(option);
    
            // Resize chart when window resizes
            window.addEventListener('resize', () => {
              myChart.resize();
            });
    
            return () => {
              window.removeEventListener('resize', () => {
                myChart.resize();
              });
              myChart.dispose();
            };
          }
        }
      }, [activeTab]);
    
  return (
    <div>
      <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">Total Students</p>
                  <h3 className="text-3xl font-bold mt-1">248</h3>
                  <p className="text-green-500 text-sm mt-2 flex items-center">
                    <i className="fas fa-arrow-up mr-1"></i> 12% from last month
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <i className="fas fa-user-graduate text-blue-600 text-xl"></i>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">Active Tutors</p>
                  <h3 className="text-3xl font-bold mt-1">36</h3>
                  <p className="text-green-500 text-sm mt-2 flex items-center">
                    <i className="fas fa-arrow-up mr-1"></i> 5% from last month
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <i className="fas fa-chalkboard-teacher text-purple-600 text-xl"></i>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">Total Session Hours</p>
                  <h3 className="text-3xl font-bold mt-1">1,254</h3>
                  <p className="text-green-500 text-sm mt-2 flex items-center">
                    <i className="fas fa-arrow-up mr-1"></i> 8% from last month
                  </p>
                </div>
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <i className="fas fa-clock text-indigo-600 text-xl"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm mb-6 border border-gray-100">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button 
                  onClick={() => setActiveTab('students')} 
                  className={`py-4 px-6 font-medium text-sm cursor-pointer !rounded-button whitespace-nowrap ${activeTab === 'students' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Student Roster
                </button>
                <button 
                  onClick={() => setActiveTab('sessions')} 
                  className={`py-4 px-6 font-medium text-sm cursor-pointer !rounded-button whitespace-nowrap ${activeTab === 'sessions' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Session Logs
                </button>
                <button 
                  onClick={() => setActiveTab('reports')} 
                  className={`py-4 px-6 font-medium text-sm cursor-pointer !rounded-button whitespace-nowrap ${activeTab === 'reports' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Reports
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'students' && (
                <div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div className="mb-4 md:mb-0">
                      <h2 className="text-xl font-bold text-gray-800">Student Roster</h2>
                      <p className="text-gray-500 text-sm">Manage and monitor your students</p>
                    </div>
                    <div className="flex space-x-3">
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Search students..." 
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                        />
                        <div className="absolute left-3 top-2.5 text-gray-400">
                          <i className="fas fa-search"></i>
                        </div>
                      </div>
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center cursor-pointer !rounded-button whitespace-nowrap">
                        <i className="fas fa-plus mr-2"></i>
                        <span>Add Student</span>
                      </button>
                    </div>
                  </div>

                  {/* Students Table */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                      <thead>
                        <tr className="bg-gray-50 text-gray-600 text-sm leading-normal">
                          <th className="py-3 px-6 text-left">Student Name</th>
                          <th className="py-3 px-6 text-left">Status</th>
                          <th className="py-3 px-6 text-left">Last Session</th>
                          <th className="py-3 px-6 text-left">Attendance</th>
                          <th className="py-3 px-6 text-left">Progress</th>
                          <th className="py-3 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-sm">
                        {students.map(student => (
                          <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-3 px-6 text-left">
                              <div className="flex items-center">
                                <div className="mr-2">
                                  <div className="h-8 w-8 rounded-full bg-indigo-200 flex items-center justify-center">
                                    <span className="text-indigo-600 font-medium">{student.name.charAt(0)}</span>
                                  </div>
                                </div>
                                <span>{student.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-left">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                student.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {student.status === 'active' ? 'Active' : 'Pending'}
                              </span>
                            </td>
                            <td className="py-3 px-6 text-left">{student.lastSession}</td>
                            <td className="py-3 px-6 text-left">{student.attendance}</td>
                            <td className="py-3 px-6 text-left">{student.progress}</td>
                            <td className="py-3 px-6 text-right">
                              <div className="flex item-center justify-end space-x-2">
                                <button className="text-gray-500 hover:text-indigo-600 cursor-pointer !rounded-button whitespace-nowrap">
                                  <i className="fas fa-eye"></i>
                                </button>
                                <button className="text-gray-500 hover:text-indigo-600 cursor-pointer !rounded-button whitespace-nowrap">
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button className="text-gray-500 hover:text-red-600 cursor-pointer !rounded-button whitespace-nowrap">
                                  <i className="fas fa-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-gray-500">
                      Showing 1 to 8 of 248 entries
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap">
                        Previous
                      </button>
                      <button className="px-3 py-1 rounded bg-indigo-600 text-white cursor-pointer !rounded-button whitespace-nowrap">
                        1
                      </button>
                      <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap">
                        2
                      </button>
                      <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap">
                        3
                      </button>
                      <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap">
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'sessions' && (
                <div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">Session Logs</h2>
                      <p className="text-gray-500 text-sm">View and manage all tutoring sessions</p>
                    </div>
                    <div className="flex space-x-3 mt-4 md:mt-0">
                      <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center cursor-pointer !rounded-button whitespace-nowrap">
                        <i className="fas fa-filter mr-2"></i>
                        <span>Filter</span>
                      </button>
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center cursor-pointer !rounded-button whitespace-nowrap">
                        <i className="fas fa-calendar-plus mr-2"></i>
                        <span>Schedule Session</span>
                      </button>
                    </div>
                  </div>

                  {/* Calendar View (Placeholder) */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="font-bold text-lg">April 2025</h3>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer !rounded-button whitespace-nowrap">
                          <i className="fas fa-chevron-left"></i>
                        </button>
                        <button className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer !rounded-button whitespace-nowrap">
                          <i className="fas fa-chevron-right"></i>
                        </button>
                      </div>
                    </div>
                    
                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-2 text-center">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="font-medium text-gray-500 py-2">{day}</div>
                      ))}
                      
                      {/* Calendar days - would be generated dynamically */}
                      {Array.from({ length: 30 }, (_, i) => (
                        <div 
                          key={i} 
                          className={`p-2 rounded-lg ${i + 1 === 11 ? 'bg-indigo-100 border border-indigo-200' : 'hover:bg-gray-50'} cursor-pointer`}
                        >
                          <div className="font-medium">{i + 1}</div>
                          {i + 1 === 11 && (
                            <div className="mt-1 text-xs bg-indigo-500 text-white rounded px-1 py-0.5">
                              4 sessions
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Sessions */}
                  <div>
                    <h3 className="font-bold text-lg mb-4">Recent Sessions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">English Conversation Practice</h4>
                            <p className="text-sm text-gray-500">Emma Wilson with Tutor Mark</p>
                          </div>
                          <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                            Completed
                          </div>
                        </div>
                        <div className="mt-3 text-sm text-gray-600">
                          <div className="flex items-center">
                            <i className="fas fa-calendar-day mr-2 text-gray-400"></i>
                            <span>April 10, 2025</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <i className="fas fa-clock mr-2 text-gray-400"></i>
                            <span>3:00 PM - 4:00 PM</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">Grammar Review</h4>
                            <p className="text-sm text-gray-500">William Lee with Tutor Sarah</p>
                          </div>
                          <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                            Completed
                          </div>
                        </div>
                        <div className="mt-3 text-sm text-gray-600">
                          <div className="flex items-center">
                            <i className="fas fa-calendar-day mr-2 text-gray-400"></i>
                            <span>April 11, 2025</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <i className="fas fa-clock mr-2 text-gray-400"></i>
                            <span>4:30 PM - 5:30 PM</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">Reading Comprehension</h4>
                            <p className="text-sm text-gray-500">Olivia Kim with Tutor John</p>
                          </div>
                          <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                            Upcoming
                          </div>
                        </div>
                        <div className="mt-3 text-sm text-gray-600">
                          <div className="flex items-center">
                            <i className="fas fa-calendar-day mr-2 text-gray-400"></i>
                            <span>April 12, 2025</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <i className="fas fa-clock mr-2 text-gray-400"></i>
                            <span>2:00 PM - 3:00 PM</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">Vocabulary Building</h4>
                            <p className="text-sm text-gray-500">Noah Garcia with Tutor Lisa</p>
                          </div>
                          <div className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full flex items-center">
                            Missed
                          </div>
                        </div>
                        <div className="mt-3 text-sm text-gray-600">
                          <div className="flex items-center">
                            <i className="fas fa-calendar-day mr-2 text-gray-400"></i>
                            <span>April 5, 2025</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <i className="fas fa-clock mr-2 text-gray-400"></i>
                            <span>1:00 PM - 2:00 PM</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reports' && (
                <div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">Reports</h2>
                      <p className="text-gray-500 text-sm">Generate and export reports</p>
                    </div>
                    <div className="flex space-x-3 mt-4 md:mt-0">
                      <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center cursor-pointer !rounded-button whitespace-nowrap">
                        <i className="fas fa-file-csv mr-2"></i>
                        <span>Export CSV</span>
                      </button>
                      <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center cursor-pointer !rounded-button whitespace-nowrap">
                        <i className="fas fa-file-pdf mr-2"></i>
                        <span>Export PDF</span>
                      </button>
                    </div>
                  </div>

                  {/* Report Types */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <i className="fas fa-user-graduate text-blue-600 text-xl"></i>
                      </div>
                      <h3 className="font-bold text-lg mb-2">Student Progress</h3>
                      <p className="text-gray-600 text-sm">Track individual student progress and performance over time.</p>
                      <button className="mt-4 text-blue-600 text-sm hover:text-blue-800 flex items-center cursor-pointer !rounded-button whitespace-nowrap">
                        <span>Generate Report</span>
                        <i className="fas fa-arrow-right ml-2"></i>
                      </button>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <i className="fas fa-chart-line text-purple-600 text-xl"></i>
                      </div>
                      <h3 className="font-bold text-lg mb-2">Attendance Summary</h3>
                      <p className="text-gray-600 text-sm">View attendance rates and patterns across all students.</p>
                      <button className="mt-4 text-blue-600 text-sm hover:text-blue-800 flex items-center cursor-pointer !rounded-button whitespace-nowrap">
                        <span>Generate Report</span>
                        <i className="fas fa-arrow-right ml-2"></i>
                      </button>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <i className="fas fa-calendar-check text-indigo-600 text-xl"></i>
                      </div>
                      <h3 className="font-bold text-lg mb-2">Session Analysis</h3>
                      <p className="text-gray-600 text-sm">Analyze tutoring session effectiveness and outcomes.</p>
                      <button className="mt-4 text-blue-600 text-sm hover:text-blue-800 flex items-center cursor-pointer !rounded-button whitespace-nowrap">
                        <span>Generate Report</span>
                        <i className="fas fa-arrow-right ml-2"></i>
                      </button>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
                    <h3 className="font-bold text-lg mb-4">Attendance Overview</h3>
                    <div id="attendance-chart" className="h-80 w-full"></div>
                  </div>

                  {/* Recent Reports */}
                  <div>
                    <h3 className="font-bold text-lg mb-4">Recent Reports</h3>
                    <div className="bg-white rounded-lg border border-gray-200">
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr className="bg-gray-50 text-gray-600 text-sm leading-normal">
                              <th className="py-3 px-6 text-left">Report Name</th>
                              <th className="py-3 px-6 text-left">Generated Date</th>
                              <th className="py-3 px-6 text-left">Type</th>
                              <th className="py-3 px-6 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-600 text-sm">
                            <tr className="border-b border-gray-200 hover:bg-gray-50">
                              <td className="py-3 px-6 text-left">Monthly Attendance Report</td>
                              <td className="py-3 px-6 text-left">April 10, 2025</td>
                              <td className="py-3 px-6 text-left">
                                <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">PDF</span>
                              </td>
                              <td className="py-3 px-6 text-right">
                                <button className="text-blue-600 hover:text-blue-800 cursor-pointer !rounded-button whitespace-nowrap">
                                  <i className="fas fa-download"></i>
                                </button>
                              </td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-50">
                              <td className="py-3 px-6 text-left">Student Progress Q1</td>
                              <td className="py-3 px-6 text-left">March 31, 2025</td>
                              <td className="py-3 px-6 text-left">
                                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">CSV</span>
                              </td>
                              <td className="py-3 px-6 text-right">
                                <button className="text-blue-600 hover:text-blue-800 cursor-pointer !rounded-button whitespace-nowrap">
                                  <i className="fas fa-download"></i>
                                </button>
                              </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                              <td className="py-3 px-6 text-left">Tutor Performance Summary</td>
                              <td className="py-3 px-6 text-left">March 15, 2025</td>
                              <td className="py-3 px-6 text-left">
                                <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">PDF</span>
                              </td>
                              <td className="py-3 px-6 text-right">
                                <button className="text-blue-600 hover:text-blue-800 cursor-pointer !rounded-button whitespace-nowrap">
                                  <i className="fas fa-download"></i>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
    </div>
  );
};

export default Students;
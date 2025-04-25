"use client";
import React, {useState} from 'react';

const Reports: React.FC = () => {

  const [activeTab, setActiveTab] = useState('reports'); 
          // Initialize and render the chart
            React.useEffect(() => {
              if (activeTab === 'reports') {
                
              }
            }, [activeTab]);

  return (
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
        
                  {/* Tab Content */}
                  <div className="p-6">
                          
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
                
              </main>
    );
};

export default Reports;
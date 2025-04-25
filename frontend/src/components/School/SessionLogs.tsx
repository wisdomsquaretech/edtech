      "use client";
      import React, {useState} from 'react';
      import * as echarts from 'echarts'; 
      
      const SessionLogs: React.FC = () => {
              const [activeTab, setActiveTab] = useState('sessions');
      
          // Initialize and render the chart
            React.useEffect(() => {
              if (activeTab === 'students') {
                
              }
            }, [activeTab]);
          
        return (
          
            <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500 text-sm">Total Session</p>
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
                        <p className="text-gray-500 text-sm">Upcoming Session</p>
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
                        <p className="text-gray-500 text-sm">Completed Session</p>
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
      
                    
                  </div>
               
              </main>
         
  );
};

export default SessionLogs;
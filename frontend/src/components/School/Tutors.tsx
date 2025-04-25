"use client";
import React , {useState} from 'react';

const Tutors: React.FC = () => {
    const [activeTab, setActiveTab] = useState('tutors');
      
              const tutors = [
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
                { id: 1, type: 'approval', message: 'New tutor registration: Sophia Chen', time: '2 hours ago' },
                { id: 2, type: 'alert', message: 'Noah Garcia missed 2 consecutive sessions', time: '1 day ago' },
                { id: 3, type: 'info', message: 'New tutor available for assignment', time: '2 days ago' },
                { id: 4, type: 'approval', message: 'New tutor registration: Ava Patel', time: '3 days ago' },
              ];   
        // Initialize and render the chart
          React.useEffect(() => {
            if (activeTab === 'tutors') {
              
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
                        <p className="text-gray-500 text-sm">Total Tutors</p>
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
                  
      
                  {/* Tab Content */}
                  <div className="p-6">
                    {activeTab === 'tutors' && (
                      <div>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                          <div className="mb-4 md:mb-0">
                            <h2 className="text-xl font-bold text-gray-800">Tutor Roster</h2>
                            <p className="text-gray-500 text-sm">Manage and monitor your tutors</p>
                          </div>
                          <div className="flex space-x-3">
                            <div className="relative">
                              <input 
                                type="text" 
                                placeholder="Search tutors..." 
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                              />
                              <div className="absolute left-3 top-2.5 text-gray-400">
                                <i className="fas fa-search"></i>
                              </div>
                            </div>
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center cursor-pointer !rounded-button whitespace-nowrap">
                              <i className="fas fa-plus mr-2"></i>
                              <span>Add Tutor</span>
                            </button>
                          </div>
                        </div>
      
                        {/* tutors Table */}
                        <div className="overflow-x-auto">
                          <table className="min-w-full bg-white">
                            <thead>
                              <tr className="bg-gray-50 text-gray-600 text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Tutor Name</th>
                                <th className="py-3 px-6 text-left">Status</th>
                                <th className="py-3 px-6 text-left">Last Session</th>
                                <th className="py-3 px-6 text-left">Attendance</th>
                                <th className="py-3 px-6 text-left">Progress</th>
                                <th className="py-3 px-6 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm">
                              {tutors.map(tutor => (
                                <tr key={tutor.id} className="border-b border-gray-200 hover:bg-gray-50">
                                  <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                      <div className="mr-2">
                                        <div className="h-8 w-8 rounded-full bg-indigo-200 flex items-center justify-center">
                                          <span className="text-indigo-600 font-medium">{tutor.name.charAt(0)}</span>
                                        </div>
                                      </div>
                                      <span>{tutor.name}</span>
                                    </div>
                                  </td>
                                  <td className="py-3 px-6 text-left">
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                      tutor.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                      {tutor.status === 'active' ? 'Active' : 'Pending'}
                                    </span>
                                  </td>
                                  <td className="py-3 px-6 text-left">{tutor.lastSession}</td>
                                  <td className="py-3 px-6 text-left">{tutor.attendance}</td>
                                  <td className="py-3 px-6 text-left">{tutor.progress}</td>
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
                  </div>
                </div>
              </main>
    </div>
  );
};

export default Tutors;
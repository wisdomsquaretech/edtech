// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from 'react';

const TutorDashboardAvailability: React.FC = () => {
  const [isAvailabilityView, setIsAvailabilityView] = useState<boolean>(true);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('17:00');
  const [selectedTimezone, setSelectedTimezone] = useState<string>('');
  const [timeError, setTimeError] = useState<string>('');
  const [availabilityList, setAvailabilityList] = useState<Array<{
    id: number;
    day: string;
    startTime: string;
    endTime: string;
    data1: string;
    data2: string;
  }>>([
    { id: 1, day: 'Mon', startTime: '11:00', endTime: '12:00', data1: 'Meeting', data2: 'Weekly' },
    { id: 2, day: 'Mon', startTime: '15:00', endTime: '17:00', data1: 'Team Call', data2: 'Project X' },
    { id: 3, day: 'Wed', startTime: '09:00', endTime: '11:00', data1: 'Planning', data2: 'Sprint' }
  ]);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const toggleView = () => {
    setIsAvailabilityView(!isAvailabilityView);
  };

  const toggleDaySelection = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
    validateTimeRange(e.target.value, endTime);
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
    validateTimeRange(startTime, e.target.value);
  };

  const validateTimeRange = (start: string, end: string) => {
    if (start && end) {
      const startMinutes = convertTimeToMinutes(start);
      const endMinutes = convertTimeToMinutes(end);
      
      if (endMinutes <= startMinutes) {
        setTimeError('End time must be after start time');
        return false;
      } else {
        setTimeError('');
        return true;
      }
    }
    return false;
  };

  const convertTimeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimezone(e.target.value);
  };

  const saveAvailability = () => {
    if (!validateTimeRange(startTime, endTime)) {
      return;
    }
    
    if (selectedDays.length === 0) {
      alert('Please select at least one day');
      return;
    }

    const newEntries = selectedDays.map((day, index) => ({
      id: availabilityList.length + index + 1,
      day: day.substring(0, 3),
      startTime,
      endTime,
      data1: 'New Entry',
      data2: 'Available'
    }));

    setAvailabilityList([...availabilityList, ...newEntries]);
    setSelectedDays([]);
  };

  const handleReschedule = (id: number) => {
    const item = availabilityList.find(item => item.id === id);
    if (item) {
      setSelectedDays([daysOfWeek.find(day => day.substring(0, 3) === item.day) || '']);
      setStartTime(item.startTime);
      setEndTime(item.endTime);
      setIsAvailabilityView(true);
      setAvailabilityList(availabilityList.filter(item => item.id !== id));
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this availability?')) {
      setAvailabilityList(availabilityList.filter(item => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex p-1">
      <div className="w-full max-w-8xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {isAvailabilityView ? 'Set Your Availability' : 'Confirm Availability'}
            </h1>
            <button 
              onClick={toggleView}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-button cursor-pointer whitespace-nowrap transition-colors duration-200"
            >
              {isAvailabilityView ? 'Confirm Availability' : 'Set Your Availability'}
            </button>
          </div>

          <div className="transition-all duration-500 ease-in-out transform" style={{
            transform: isAvailabilityView ? 'rotateY(0deg)' : 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            display: isAvailabilityView ? 'block' : 'none'
          }}>
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-700 mb-3">Days Available</h2>
              <div className="flex flex-wrap gap-2">
                {daysOfWeek.map((day) => (
                  <button
                    key={day}
                    onClick={() => toggleDaySelection(day)}
                    className={`py-2 px-4 rounded-full cursor-pointer whitespace-nowrap transition-colors duration-200 ${
                      selectedDays.includes(day)
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h2 className="text-lg font-medium text-gray-700 mb-3">Start Time</h2>
                <div className="relative">
                  <input
                    type="time"
                    value={startTime}
                    onChange={handleStartTimeChange}
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <i className="fas fa-clock absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-700 mb-3">End Time</h2>
                <div className="relative">
                  <input
                    type="time"
                    value={endTime}
                    onChange={handleEndTimeChange}
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <i className="fas fa-clock absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
              </div>
            </div>

            {timeError && (
              <div className="mb-4 text-red-500 text-sm">
                <i className="fas fa-exclamation-circle mr-1"></i> {timeError}
              </div>
            )}

            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-700 mb-3">Time Zone</h2>
              <select
                value={selectedTimezone}
                onChange={handleTimezoneChange}
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Timezone</option>
                <option value="UTC-12:00">(UTC-12:00) International Date Line West</option>
                <option value="UTC-11:00">(UTC-11:00) Samoa</option>
                <option value="UTC-10:00">(UTC-10:00) Hawaii</option>
                <option value="UTC-09:00">(UTC-09:00) Alaska</option>
                <option value="UTC-08:00">(UTC-08:00) Pacific Time (US & Canada)</option>
                <option value="UTC-07:00">(UTC-07:00) Mountain Time (US & Canada)</option>
                <option value="UTC-06:00">(UTC-06:00) Central Time (US & Canada)</option>
                <option value="UTC-05:00">(UTC-05:00) Eastern Time (US & Canada)</option>
                <option value="UTC-04:00">(UTC-04:00) Atlantic Time (Canada)</option>
                <option value="UTC-03:00">(UTC-03:00) Brasilia</option>
                <option value="UTC-02:00">(UTC-02:00) Mid-Atlantic</option>
                <option value="UTC-01:00">(UTC-01:00) Azores</option>
                <option value="UTC+00:00">(UTC+00:00) London, Dublin, Lisbon</option>
                <option value="UTC+01:00">(UTC+01:00) Berlin, Paris, Rome, Madrid</option>
                <option value="UTC+02:00">(UTC+02:00) Athens, Istanbul, Cairo</option>
                <option value="UTC+03:00">(UTC+03:00) Moscow, Baghdad, Riyadh</option>
                <option value="UTC+04:00">(UTC+04:00) Dubai, Baku</option>
                <option value="UTC+05:00">(UTC+05:00) Karachi, Islamabad</option>
                <option value="UTC+05:30">(UTC+05:30) New Delhi, Mumbai</option>
                <option value="UTC+06:00">(UTC+06:00) Dhaka, Almaty</option>
                <option value="UTC+07:00">(UTC+07:00) Bangkok, Jakarta</option>
                <option value="UTC+08:00">(UTC+08:00) Beijing, Singapore, Hong Kong</option>
                <option value="UTC+09:00">(UTC+09:00) Tokyo, Seoul</option>
                <option value="UTC+10:00">(UTC+10:00) Sydney, Melbourne</option>
                <option value="UTC+11:00">(UTC+11:00) Noumea, Solomon Islands</option>
                <option value="UTC+12:00">(UTC+12:00) Auckland, Fiji</option>
              </select>
            </div>

            <div className="mb-6">
              <p className="text-gray-600">
                Selected Timezone: {selectedTimezone || 'None'}
              </p>
            </div>

            <button
              onClick={saveAvailability}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-button cursor-pointer whitespace-nowrap transition-colors duration-200"
            >
              Save Availability
            </button>
          </div>

          <div className="transition-all duration-500 ease-in-out transform" style={{
            transform: !isAvailabilityView ? 'rotateY(0deg)' : 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            display: !isAvailabilityView ? 'block' : 'none'
          }}>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Sr.</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Day</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Time</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Data 1</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Data 2</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Reschedule</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {availabilityList.map((item, index) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-700">{index + 1}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{item.day}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{item.startTime} to {item.endTime}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{item.data1}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{item.data2}</td>
                      <td className="py-3 px-4">
                        <button 
                          onClick={() => handleReschedule(item.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-button cursor-pointer whitespace-nowrap transition-colors duration-200"
                        >
                          <i className="fas fa-calendar-alt"></i>
                        </button>
                      </td>
                      <td className="py-3 px-4">
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-button cursor-pointer whitespace-nowrap transition-colors duration-200"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {availabilityList.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-gray-500">
                        No availability settings found. Please add your availability.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDashboardAvailability;


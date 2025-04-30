// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from 'react';
import TimezoneSelect from "@/utils/timezoneSelect";
import { tutorFunctionalityAPI } from "@/api";
import { getAuthToken, getAuthUser } from "@/hooks/useCurrentUser";


const TutorDashboardAvailability: React.FC = () => {
   const [timezone, setTimezone] = useState('');
   const [flipped, setFlipped] = useState(false);
   const [availability, setAvailability] = useState<Record<string, boolean>>({
       monday: false, tuesday: false, wednesday: false,      
       thursday: false, friday: false, saturday: false, sunday: false,
     });
  const token = getAuthToken();
  const user = getAuthUser();
  const tutorId = user?.id;
  const [isAvailabilityView, setIsAvailabilityView] = useState<boolean>(true);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('17:00');
  const [selectedTimezone, setSelectedTimezone] = useState<string>('');
  const [availabilityNeedsUpdate, setAvailabilityNeedsUpdate] = useState(true);
  const [timeError, setTimeError] = useState<string>('');
  const [availabilityList, setAvailabilityList] = useState<Array<{
    id: number;
    day: string;
    startTime: string;
    endTime: string;
    data1: string;
    data2: string;
  }>>([
    // { id: 1, day: 'Mon', startTime: '11:00', endTime: '12:00', data1: 'Meeting', data2: 'Weekly' },
    // { id: 2, day: 'Mon', startTime: '15:00', endTime: '17:00', data1: 'Team Call', data2: 'Project X' },
    // { id: 3, day: 'Wed', startTime: '09:00', endTime: '11:00', data1: 'Planning', data2: 'Sprint' }
  ]);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // const toggleView = () => {
  //   setIsAvailabilityView(!isAvailabilityView);
  //   
  // };

  const toggleView = async () => {
    const nextView = !isAvailabilityView;
    setIsAvailabilityView(nextView);

    if (nextView) return; // Only fetch data when switching to availability view

    if (!tutorId || !token) {
      alert("User or token is missing.");
      return;
    }

    try {
      //alert(tutorId);
      const response = await tutorFunctionalityAPI.getTutorAvailability(tutorId, token);
      const data = response?.data;

      if (!data) {
        alert("No availability found.");
        return;
      }

      const formattedData = [
        {
          id: data.id,
          day: data.day_of_week?.substring(0, 3) || 'N/A',
          startTime: data.start_time,
          endTime: data.end_time,
          data1: "N/A", // Placeholder or parse from extra fields
          data2: "N/A",
        },
      ];

      setAvailabilityList(formattedData);
      alert("Availability loaded successfully!");
    } catch (err: any) {
      //console.error("Fetch failed:", err.message);
      alert(err.message);
    }
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

  

  const saveAvailability = async() => {
    if (!validateTimeRange(startTime, endTime)) {
      return;
    }
    if (!tutorId || !token) {
      alert("User or token is missing.");
      return;
    }
    if (selectedDays.length === 0) {
      alert('Please select at least one day');
      return;
    }

    const payload = {
      tutor_id: tutorId,
      day_of_week: selectedDays.map(day => day.toLowerCase()).join(","),
      start_time: startTime + ":00",
      end_time: endTime + ":00",
    };
    
    try {
          await tutorFunctionalityAPI.saveTutorAvailability(payload, token);
          setAvailabilityNeedsUpdate(true);  
          alert("Availability saved successfully!");
        } catch (err: any) {
          console.error("Save failed:", err.message);
          alert(err.message);
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
      setAvailabilityNeedsUpdate(true);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this availability?')) {
      setAvailabilityList(availabilityList.filter(item => item.id !== id));
      setAvailabilityNeedsUpdate(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex p-1">
      <div className="w-full max-w-8xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 ">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold  text-gray-800">
              {isAvailabilityView ? 'Set Your Availability' : 'Confirm Availability'}
            </h1>
            <button 
              onClick={toggleView}
              className="bg-indigo-600 rounded hover:bg-indigo-700 text-white py-2 px-4 rounded-button cursor-pointer whitespace-nowrap transition-colors duration-200"
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
                  
                </div>
              </div>
            </div>

            {timeError && (
              <div className="mb-4 text-red-500 text-sm">
                <i className="fas fa-exclamation-circle mr-1"></i> {timeError}
              </div>
            )}

            <div className="mb-6">
             <TimezoneSelect timezone={timezone} setTimezone={setTimezone} />
             <p className="mt-2 text-sm text-gray-700">Selected Timezone: {timezone || 'None'}</p>
            </div>

            

            <button
              onClick={saveAvailability}
              className="w-full bg-indigo-600 rounded hover:bg-indigo-700 text-white py-3 px-4 rounded-button cursor-pointer whitespace-nowrap transition-colors duration-200"
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
                    {/* <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Data 2</th> */}
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
                      {/* <td className="py-3 px-4 text-sm text-gray-700">{item.data2}</td> */}
                      <td className="py-3 px-4">
                        <button 
                          onClick={() => handleReschedule(item.id)}
                          className="bg-blue-500 rounded hover:bg-blue-600 text-white p-2 rounded-button cursor-pointer whitespace-nowrap transition-colors duration-200"
                        >
                          <i className="fas fa-calendar-alt "></i>
                        </button>
                      </td>
                      <td className="py-3 px-4">
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-500 rounded hover:bg-red-600 text-white p-2 rounded-button cursor-pointer whitespace-nowrap transition-colors duration-200"
                        >
                          <i className="fas fa-trash-alt "></i>
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


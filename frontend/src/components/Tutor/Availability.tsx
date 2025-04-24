import React, { useState } from "react";
import { tutorAvailabilityAPI } from "@/api";
import { getAuthToken, getAuthUser } from "@/hooks/useCurrentUser";
import TimezoneSelect from "@/utils/timezoneSelect";


const Availability = () => {
  
  const token = getAuthToken();
  const user = getAuthUser();

  const [availability, setAvailability] = useState<Record<string, boolean>>({
    monday: false, tuesday: false, wednesday: false,
    thursday: false, friday: false, saturday: false, sunday: false,
  });
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  //const [timezone, setTimezone] = useState("America/New_York");
  const [timezone, setTimezone] = useState('');
  const toggleDay = (day: string) => {
    setAvailability((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  
  const handleSave = async () => {

    const selectedDays = Object.entries(availability)
      .filter(([_, isAvailable]) => isAvailable)
      .map(([day]) => day);

    const tutorId = user?.id; 
  
    if (!tutorId || !token) {
      alert("User or token is missing.");
      return;
    }

    try {
      for (const day of selectedDays) {
        await tutorAvailabilityAPI.saveTutorAvailability(tutorId, day, startTime, endTime, token);
      }
      alert("Availability saved successfully!");
    } catch (err: any) {
      console.error("Save failed:", err.message);
    }
  };

  

  //-----------------------------------------------------------
  // const handleSave = async () => {
  //   const selectedDays = Object.entries(availability)
  //     .filter(([_, isAvailable]) => isAvailable)
  //     .map(([day]) => day);


  //   const tutorId = "your-tutor-id"; // replace this with actual ID (maybe from session or props)
  //   const token = "123"; // Replace with actual Bearer token from auth/session

  //   try {
  //     for (const day of selectedDays) {
  //       const response = await fetch("http://127.0.0.1:8000/api/tutor-availabilities", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({
  //           tutor_id: tutorId,
  //           day_of_week: day,
  //           start_time: startTime,
  //           end_time: endTime,
  //         }),
  //       });

  //       if (!response.ok) {
  //         console.error(`Error saving availability for ${day}`);
  //       }
  //     }

  //     alert("Availability saved successfully!");
  //   } catch (error) {
  //     console.error("Error saving availability:", error);
  //   }
  // };

  //----------------------------------------------------------------------------------------
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Set Your Availability</h2>

      <label className="block text-sm font-medium mb-2">Days Available</label>
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(availability).map((day) => (
          <button
            key={day}
            onClick={() => toggleDay(day)}
            className={`px-3 py-1.5 rounded-full text-sm ${availability[day] ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
      </div>

      <label className="block text-sm font-medium mb-2">Time Zone</label>
     
      <div>
      <TimezoneSelect timezone={timezone} setTimezone={setTimezone} />
      <p className="mt-2 text-sm text-gray-700">Selected Timezone: {timezone || 'None'}</p>
    </div>
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md" onClick={handleSave}>
        Save Availability
      </button>
    </div>
  );
};

export default Availability;

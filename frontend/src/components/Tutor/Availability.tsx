import React, { useState } from "react";

const Availability = () => {
  const [availability, setAvailability] = useState<Record<string, boolean>>({
    monday: false, tuesday: false, wednesday: false,
    thursday: false, friday: false, saturday: false, sunday: false,
  });
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [timezone, setTimezone] = useState("America/New_York");

  const toggleDay = (day: string) => {
    setAvailability((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Set Your Availability</h2>

      <label className="block text-sm font-medium mb-2">Days Available</label>
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(availability).map((day) => (
          <button
            key={day}
            onClick={() => toggleDay(day)}
            className={`px-3 py-1.5 rounded-full text-sm ${
              availability[day] ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
      <select
        value={timezone}
        onChange={(e) => setTimezone(e.target.value)}
        className="w-full border px-3 py-2 rounded-md mb-4"
      >
        <option value="America/New_York">Eastern Time (ET)</option>
        <option value="America/Chicago">Central Time (CT)</option>
        <option value="America/Denver">Mountain Time (MT)</option>
        <option value="America/Los_Angeles">Pacific Time (PT)</option>
        <option value="Asia/Seoul">Korean Standard Time (KST)</option>
        <option value="Europe/Madrid">Central European Time (CET)</option>
      </select>

      <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md">
        Save Availability
      </button>
    </div>
  );
};

export default Availability;

'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from "@/config";

const TimezoneSelect = ({ timezone, setTimezone }: { timezone: string; setTimezone: (tz: string) => void }) => {
  const [timezones, setTimezones] = useState<string[]>([]);
  const timeZone = `${config.timeZone}`;

  useEffect(() => {
    const fetchTimezones = async () => {
      try {
        const response = await axios.get('https://timeapi.io/api/TimeZone/AvailableTimeZones');
        setTimezones(response.data); // Returns array of timezones like "America/New_York", "Asia/Kolkata"
        const detectedTimeZone = `${config.timeZone}`;
        setTimezone(detectedTimeZone);
      } catch (error) {
        console.error('Failed to fetch timezones:', error);
      }
    };

    fetchTimezones();
  }, []);

  return (
    <select
      value={timezone}
      onChange={(e) => setTimezone(e.target.value)}
      className="w-full border px-3 py-2 rounded-md mb-4"
    >
      <option value="">Select Timezone</option>
      {timezones.map((tz) => (
        <option key={tz} value={tz}>
          {tz}
        </option>
      ))}
    </select>
  );
};

export default TimezoneSelect;

// src/api/tutor/availability.ts
import { apiClient } from "../apiClient";

export const saveTutorAvailability = async (
  tutorId: string,
  day: string,
  startTime: string,
  endTime: string,
  token: string
) => {
  return apiClient("tutor-availabilities", "POST", {
    tutor_id: tutorId,
    day_of_week: day,
    start_time: startTime,
    end_time: endTime,
  }, token);
};

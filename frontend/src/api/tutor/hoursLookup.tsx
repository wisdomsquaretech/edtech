// src/api/tutor/hoursLookup.tsx
import { apiClient } from "../apiClient";

export const getHours = async (
  tutorId: number,
  token: string
) => {
  const res = await apiClient(`tutor-hours-lookups/${tutorId}`, "GET", null, token);
  return res?.data?.duration || 0;
};

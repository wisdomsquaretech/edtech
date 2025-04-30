// src/api/tutor/functionality.ts
import { apiClient } from "../apiClient";


export const saveTutorAvailability = async (payload: any,token:string) => {
 
  return apiClient("tutor-availabilities", "POST", payload, token );
};

export const getUpcommingSession = async (
  tutorId: string,
  token: string
) => {
  return apiClient(`sessions/tutor/${tutorId}`, "GET", undefined, token);
};

export const getTutorAvailability = async (
  tutorId: string,
  token: string
) => {
  return apiClient(`tutor-availabilities/${tutorId}`, "GET", undefined, token);
};

// src/api/apiClient.ts

import config from "@/config";


export const apiClient = async (
  endpoint: string,
  method: string = "GET",
  body?: any,
  token?: string
) => {
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const options: RequestInit = {
    method,
    headers,
  };
  
  if (body && method !== "GET" && method !== "HEAD") {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${config.apiBaseUrl}/${endpoint}`, options);

  // const res = await fetch(`${config.apiBaseUrl}/${endpoint}`, {
  //   method,
  //   headers: {
  //     "Content-Type": "application/json",
  //     ...(token && { Authorization: `Bearer ${token}` }),
  //   },
  //   body: body ? JSON.stringify(body) : undefined,
  // });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "API Error");
  }

  return await res.json();
};

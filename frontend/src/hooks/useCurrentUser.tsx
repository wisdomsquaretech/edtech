// hooks/useCurrentUser.ts
import { useEffect, useState } from "react";

export const useCurrentUser = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("auth_user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, []);
  return { user };
}

export const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth_token");
  }
  return null;
};

export const getAuthUser = () => {
  if (typeof window !== "undefined") {
    const userString = localStorage.getItem("auth_user");
    return userString ? JSON.parse(userString) : null;
  }
  return null;
};
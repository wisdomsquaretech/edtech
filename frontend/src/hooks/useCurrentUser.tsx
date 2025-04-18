// hooks/useCurrentUser.ts
import { useEffect, useState } from "react";

export const useCurrentUser = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("auth_user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return user;
};

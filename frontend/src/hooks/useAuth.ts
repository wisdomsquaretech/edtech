// hooks/useAuth.ts
export const useAuth = () => {
    const login = async (formData: any, userType: string) => {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...formData, role: userType }),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");
      return data;
    };
  
    const register = async (payload: any) => {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");
      return data;
    };
  
    return { login, register };
  };
  
const config = {
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    jistiLink:"https://meet.jit.si",
  
  };
  
  export default config;
"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter  } from "next/navigation";

const RegistrationForm: React.FC = () => {
  const searchParams = useSearchParams();
  const [userType, setUserType] = useState<"student" | "tutor">("student");
  const [isLoginMode, setIsLoginMode] = useState(false); // new state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [mode, setMode] = useState<"register" | "login">("register");
  const router = useRouter();
  
  useEffect(() => {
    const typeParam = searchParams.get("type");
    const modeParam = searchParams.get("mode");

    if (typeParam === "student" || typeParam === "tutor") {
      setUserType(typeParam);
    }

    if (modeParam === "login") {
      setIsLoginMode(true); 
    }
  }, [searchParams]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    subject: "",
    experience: "",
    qualification: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (isLoginMode) {
      // LOGIN MODE
      if (!formData.email || !formData.password) {
        setErrors({ email: "Email and Password are required" });
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            role: userType, // optional
          }),
        });
      
        if (!response.ok) {
          // Handle 401 or other HTTP errors
          const errorData = await response.json();
          throw new Error(errorData.message || "Login failed");
        }
      
        const data = await response.json();
        const { user, token } = data;
      
        // Save to localStorage
        localStorage.setItem("auth_token", token);
          .setItem("auth_user", JSON.stringify(user));
      
        // Redirect based on role
        if (user.role === "tutor") {
          router.push("/tutor");
        } else if (user.role === "student") {
          router.push("/student");
        } else {
          router.push("/"); // fallback
        }
      
      } catch (error: any) {
        alert("Login failed: " + error.message);
      }
      

    } else {
      // REGISTER MODE
      if (!formData.fullName || formData.fullName.trim() === "") {
        setErrors({ fullName: "Please fill your name" });
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setErrors({ password: "Passwords do not match!" });
        return;
      }
      if (!/^[0-9]{10}$/.test(formData.phone)) {
        setErrors({ phone: "Please enter a valid 10-digit phone number." });
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setErrors({ email: "Please enter a valid email address." });
        return;
      }

      const payload: any = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        role: userType,
      };

    //   if (userType === "tutor") {
    //     payload.subject = formData.subject;
    //     payload.experience = formData.experience;
    //     payload.qualification = formData.qualification;
    //   }

      try {
        const response = await fetch("http://127.0.0.1:8000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (response.ok) {
          if (data.token) {
            localStorage.setItem("authToken", data.token);
          }
          alert("Registration successful!");
        } else if (data.errors) {
          setErrors(data.errors);
        } else {
          alert(data.message || "Registration failed.");
        }
      } catch (error: any) {
        alert("Something went wrong. Please try again.\n" + error.message);
      }
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {isLoginMode ? "Login to Your Account" : "Create an Account"}
        </h1>
        
      </div>

      {/* Mode Toggle */}
      <div className="text-center mb-4">
        <button
          onClick={() => setIsLoginMode(!isLoginMode)}
          className="text-blue-600 text-sm hover:underline"
        >
          {isLoginMode ? "Don't have an account? Register" : "Already have an account? Login"}
        </button>
      </div>

      {/* User Type Toggle */}
      {!isLoginMode && (
      <div className="flex justify-center mb-6">
        <div className="bg-gray-200 rounded-full p-1 flex w-full max-w-xs">
          <button
            type="button"
            onClick={() => setUserType("student")}
            className={`w-1/2 py-2 text-sm font-medium rounded-full transition ${
              userType === "student" ? "bg-blue-600 text-white shadow" : "text-gray-700"
            }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setUserType("tutor")}
            className={`w-1/2 py-2 text-sm font-medium rounded-full transition ${
              userType === "tutor" ? "bg-blue-600 text-white shadow" : "text-gray-700"
            }`}
          >
            Tutor
          </button>
        </div>
      </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name (Register only) */}
        {!isLoginMode && (
          <>
            <input
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-sm"
              required
            />
            {errors.fullName && <div className="text-red-500 text-xs">{errors.fullName}</div>}
          </>
        )}

        {/* Email */}
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded text-sm"
        />
        {errors.email && <div className="text-red-500 text-xs">{errors.email}</div>}

        {/* Phone (Register only) */}
        {!isLoginMode && (
          <>
            <input
              name="phone"
              placeholder="Phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-sm"
              required
            />
            {errors.phone && <div className="text-red-500 text-xs">{errors.phone}</div>}
          </>
        )}

        {/* Password */}
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded text-sm"
        />
        {errors.password && <div className="text-red-500 text-xs">{errors.password}</div>}

        {/* Confirm Password (Register only) */}
        {!isLoginMode && (
          <input
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded text-sm"
          />
        )}

        {/* Tutor Specific Fields (Register only) */}
        {!isLoginMode && userType === "tutor" && (
          <>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-sm"
              required
            >
              <option value="">Select Subject Expertise</option>
              <option value="Math">Math</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="Computer Science">Computer Science</option>
            </select>
            <input
              name="experience"
              placeholder="Years of Experience"
              type="number"
              value={formData.experience}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded text-sm"
            />
            <input
              name="qualification"
              placeholder="Qualification"
              value={formData.qualification}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded text-sm"
            />
          </>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
        >
          {isLoginMode ? `Login as ${userType}` : `Register as ${userType}`}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;

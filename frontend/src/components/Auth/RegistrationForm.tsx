"use client";
import React, { useState,  useEffect  } from "react";
import { useSearchParams } from "next/navigation";

const RegistrationForm: React.FC = () => {
  const searchParams = useSearchParams();
  const [userType, setUserType] = useState<"student" | "tutor">("student");

  useEffect(() => {
    const typeParam = searchParams.get("type");
    if (typeParam === "student" || typeParam === "tutor") {
      setUserType(typeParam);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registering:", { userType, ...formData });
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Create an Account</h1>
        <p className="text-gray-600 text-sm">Register as a Student or Tutor</p>
      </div>

      {/* Toggle Buttons */}
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

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded text-sm"
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded text-sm"
        />
        <input
          name="phone"
          placeholder="Phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded text-sm"
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded text-sm"
        />
        <input
          name="confirmPassword"
          placeholder="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded text-sm"
        />

        {userType === "tutor" && (
          <>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded text-sm"
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

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
        >
          Register as {userType === "student" ? "Student" : "Tutor"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-2">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;

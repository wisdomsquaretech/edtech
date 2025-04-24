"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormFields } from "./FormFields";
import { login, register} from "../../api/auth/auth";
import { validateRegisterForm } from "@/utils/validation";
// import { useAuth } from "@/hooks/useAuth";  *****  running code ***

const RegistrationForm = () => {
  const [userType, setUserType] = useState("student");
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "", confirmPassword: "", phone: "", subject: "", experience: "", qualification: "" });
  const [errors, setErrors] = useState({});
  const searchParams = useSearchParams();
  const router = useRouter();
  
  //const { login, register } = useAuth();    *****  running code ***

  useEffect(() => {
    const typeParam = searchParams.get("type");
    const modeParam = searchParams.get("mode");
    if (typeParam) setUserType(typeParam);
    if (modeParam === "login") setIsLoginMode(true);
  }, [searchParams]);

  // const RegistrationForm = ({ authType }: { authType: string }) => {
  //   const [userType, setUserType] = useState("student");
  //   const [isLoginMode, setIsLoginMode] = useState(authType === "login");
  // }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    try {
      if (isLoginMode) {
        //const data = await login(formData, userType);  *****  running code ***

        const data = await login(formData.email, formData.password);
         // Save token and user data
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("auth_user", JSON.stringify(data.user));

        // ✅ Set cookie for role-based middleware (expires in 1 day)
        document.cookie = `role=${data.user.role}; path=/; max-age=86400;`;
        //document.cookie = `name=${encodeURIComponent(data.user.name)}; path=/; max-age=86400;`;

        if (data.user.role === "tutor") {
          window.location.href = "/tutor";
        } else {
          window.location.href = "/student";
        }
      } else {
        const validationErrors = validateRegisterForm(formData);
        
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
        
        const payload = { ...formData, name: formData.fullName, password_confirmation: formData.confirmPassword, role: userType };
        //const data = await register(formData.email, formData.password);
        const data = await register(payload);
        localStorage.setItem("auth_token", data.token);
        alert("Registration successful!");

        // ✅ Set role cookie after registration
        //document.cookie = `role=${data.user.role}; path=/; max-age=86400;`;
      }
    } catch (error: any) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>{isLoginMode ? "Login" : "Register"}</h2>
      <button onClick={() => setIsLoginMode(!isLoginMode)} className="text-blue-600 text-sm mb-4">
        {isLoginMode ? "Don't have an account?" : "Already have an account?"}
      </button>
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
      {/* {!isLoginMode && (
      <ToggleButtons userType={userType} onChange={setUserType} />
      )} */}
      <form onSubmit={handleSubmit}>
        <FormFields
          formData={formData}
          errors={errors}
          isLoginMode={isLoginMode}
          userType={userType}
          handleChange={handleChange}
        />
        <button type="submit" className="btn-primary">
          {isLoginMode ? `Login ` : `Register as ${userType}`}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;

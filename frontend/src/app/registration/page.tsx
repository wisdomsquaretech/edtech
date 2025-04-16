"use client";
import React from "react";
import RegistrationForm from "@/components/Auth/RegistrationForm";
import AuthBanner from "@/components/Auth/AuthBanner";

const RegistrationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center w-full py-4 md:py-8">
      <div className="w-full max-w-[1440px] min-h-[1024px] flex flex-col lg:flex-row shadow-xl">
        {/* Left: Form */}
        <div className="w-full lg:w-1/2 bg-white p-4 sm:p-6 md:p-8 lg:p-10 flex items-center justify-center">
          <RegistrationForm />
        </div>

        {/* Right: Banner */}
        <div className="hidden lg:block w-full lg:w-1/2 bg-blue-50 relative overflow-hidden">
          <AuthBanner/>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
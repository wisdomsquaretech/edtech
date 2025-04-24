"use client";
import React, { Suspense } from "react";
import RegistrationForm from "@/components/Auth/RegistrationForm";
import AuthBanner from "@/components/Auth/AuthBanner";

const RegistrationPage = () => {
  return (
    <div className="h-screen bg-gray-50 flex items-center justify-center w-full">
      <div className="w-full max-w-[1440px] h-full flex flex-col lg:flex-row shadow-xl overflow-hidden">
        {/* Left: Form */}
        <div className="w-full lg:w-1/2 bg-white p-4 sm:p-6 md:p-8 lg:p-10 flex items-center justify-center">
          
          <Suspense fallback={<div>Loading form...</div>}><RegistrationForm /></Suspense>
        </div>

        {/* Right: Banner */}
        <div className="hidden lg:block w-full lg:w-1/2 bg-blue-50 relative">
        <Suspense fallback={<div>Loading banner...</div>}>
            <AuthBanner />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;

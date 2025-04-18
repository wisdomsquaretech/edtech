
import React from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';

const Hero = () =>{

      const router = useRouter();
      const handleRegisterClick = (type: "student" | "tutor") => {
          router.push(`/registration?type=${type}`);
        };

    return(
        <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://public.readdy.ai/ai/img_res/ce09c86538c71066ffab9be1a3b65f0f.jpg" 
            alt="Global Education" 
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-blue-900 bg-opacity-70"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Bridging Cultures Through Language Learning
          </h1>
          <p className="text-xl text-white mb-10 max-w-3xl mx-auto">
            Connect high school tutors in the U.S. with underprivileged students in South Korea and Mexico for meaningful 1-on-1 English tutoring experiences.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button onClick={()=>handleRegisterClick("tutor")} className="px-8 py-4 bg-white text-blue-700 font-bold rounded-button hover:bg-blue-50 transition duration-300 whitespace-nowrap cursor-pointer">
              Become a Tutor
            </button>
            <button onClick={()=>handleRegisterClick("student")}className="px-8 py-4 bg-blue-600 text-white font-bold rounded-button border border-white hover:bg-blue-700 transition duration-300 whitespace-nowrap cursor-pointer">
              Join as Student
            </button>
          </div>
        </div>
      </div>
    );
};

export default Hero;
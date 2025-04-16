import React from "react";

const AuthBanner: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 to-indigo-600/90 z-10">
      <img
        src="https://public.readdy.ai/ai/img_res/806e149e2a085da88518a808b6f4bf55.jpg"
        alt="Register Banner"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
      />
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-6 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-center">
          Join EduConnect
        </h2>
        <p className="text-lg md:text-xl mb-6 md:mb-8 text-center max-w-lg">
          Become a part of a growing learning community — whether you're here to study or share your knowledge.
        </p>
        <div className="space-y-4 md:space-y-6 w-full max-w-md">
          <div className="flex items-center bg-white/20 backdrop-blur-sm p-4 rounded-lg">
            <div className="bg-white/30 p-3 rounded-full mr-4">
              <i className="fas fa-chalkboard-teacher text-white text-lg md:text-xl"></i>
            </div>
            <div>
              <h3 className="font-semibold text-base md:text-lg">Inspire and Educate</h3>
              <p className="text-white/90 text-sm md:text-base">Tutors help learners grow in confidence and knowledge</p>
            </div>
          </div>
          <div className="flex items-center bg-white/20 backdrop-blur-sm p-4 rounded-lg">
            <div className="bg-white/30 p-3 rounded-full mr-4">
              <i className="fas fa-user-graduate text-white text-lg md:text-xl"></i>
            </div>
            <div>
              <h3 className="font-semibold text-base md:text-lg">Achieve Your Goals</h3>
              <p className="text-white/90 text-sm md:text-base">Students receive personalized support to succeed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthBanner;

// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
'use client';
import React, { useState, useEffect } from 'react';

const Registration: React.FC = () => {
  const [userType, setUserType] = useState<'student' | 'tutor'>('student');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    subjectExpertise: '',
    yearsOfExperience: '',
    qualification: ''
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
  };

  const subjects = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Computer Science',
    'English Literature',
    'History',
    'Geography',
    'Economics',
    'Foreign Languages'
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center w-full py-4 md:py-8">
      <div className="w-full max-w-[1440px] min-h-[1024px] flex flex-col lg:flex-row shadow-xl">
        {/* Banner for mobile view at top */}
        {isMobile && (
          <div className="w-full h-48 sm:h-64 bg-blue-50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 to-indigo-600/90 z-10"></div>
            <img
              src="https://public.readdy.ai/ai/img_res/69675728f56e3ce25314ddf67f541686.jpg"
              alt="Education Platform Banner"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-4">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center">Transform Your Learning Journey</h2>
              <p className="text-sm sm:text-base mb-2 text-center max-w-lg">
                Join our platform to connect with expert tutors or become a mentor.
              </p>
            </div>
          </div>
        )}
        
        {/* Left side - Form */}
        <div className="w-full lg:w-1/2 bg-white p-4 sm:p-6 md:p-8 lg:p-10 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Welcome</h1>
              <p className="text-gray-600 text-base sm:text-lg">
                {userType === 'student' ? 'Register as a Student' : 'Register as a Tutor'}
              </p>
            </div>
            
            {/* Toggle Switch */}
            <div className="flex justify-center mb-6">
              <div className="relative bg-gray-200 rounded-full p-1 w-full max-w-xs flex">
                <button
                  onClick={() => setUserType('student')}
                  className={`w-1/2 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 ease-in-out cursor-pointer whitespace-nowrap !rounded-button ${
                    userType === 'student'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Student
                </button>
                <button
                  onClick={() => setUserType('tutor')}
                  className={`w-1/2 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 ease-in-out cursor-pointer whitespace-nowrap !rounded-button ${
                    userType === 'tutor'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Tutor
                </button>
              </div>
            </div>
            
            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2 sm:py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-sm"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
              
              {/* Email Address */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none relative block w-full px-3 py-2 sm:py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-sm"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              
              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="appearance-none relative block w-full px-3 py-2 sm:py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-sm"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400`}></i>
                  </button>
                </div>
              </div>
              
              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className="appearance-none relative block w-full px-3 py-2 sm:py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-sm"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400`}></i>
                  </button>
                </div>
              </div>
              
              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  required
                  className="appearance-none relative block w-full px-3 py-2 sm:py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-sm"
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              
              {/* Additional Fields for Tutor */}
              {userType === 'tutor' && (
                <>
                  {/* Subject Expertise */}
                  <div>
                    <label htmlFor="subjectExpertise" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject Expertise
                    </label>
                    <div className="relative">
                      <select
                        id="subjectExpertise"
                        name="subjectExpertise"
                        required
                        className="appearance-none relative block w-full px-3 py-2 sm:py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-sm"
                        value={formData.subjectExpertise}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>Select your subject expertise</option>
                        {subjects.map((subject, index) => (
                          <option key={index} value={subject}>{subject}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <i className="fas fa-chevron-down"></i>
                      </div>
                    </div>
                  </div>
                  
                  {/* Years of Experience */}
                  <div>
                    <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-1">
                      Years of Experience
                    </label>
                    <input
                      id="yearsOfExperience"
                      name="yearsOfExperience"
                      type="number"
                      min="0"
                      required
                      className="appearance-none relative block w-full px-3 py-2 sm:py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      placeholder="Enter years of experience"
                      value={formData.yearsOfExperience}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  {/* Qualification */}
                  <div>
                    <label htmlFor="qualification" className="block text-sm font-medium text-gray-700 mb-1">
                      Qualification
                    </label>
                    <input
                      id="qualification"
                      name="qualification"
                      type="text"
                      required
                      className="appearance-none relative block w-full px-3 py-2 sm:py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-sm"
                      placeholder="Enter your highest qualification"
                      value={formData.qualification}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              )}
              
              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 sm:py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 cursor-pointer whitespace-nowrap !rounded-button"
                >
                  Register as {userType === 'student' ? 'Student' : 'Tutor'}
                </button>
              </div>
              
              {/* Login Link */}
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
        
        {/* Right side - Banner (only visible on desktop) */}
        {!isMobile && (
          <div className="w-full lg:w-1/2 bg-blue-50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 to-indigo-600/90 z-10"></div>
            <img
              src="https://public.readdy.ai/ai/img_res/806e149e2a085da88518a808b6f4bf55.jpg"
              alt="Education Platform Banner"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-6 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-center">Transform Your Learning Journey</h2>
              <p className="text-lg md:text-xl mb-6 md:mb-8 text-center max-w-lg">
                Join our platform to connect with expert tutors or become a mentor to help others excel in their academic pursuits.
              </p>
              <div className="space-y-4 md:space-y-6 w-full max-w-md">
                <div className="flex items-center bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                  <div className="bg-white/30 p-3 rounded-full mr-4">
                    <i className="fas fa-graduation-cap text-white text-lg md:text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base md:text-lg">Personalized Learning</h3>
                    <p className="text-white/90 text-sm md:text-base">Tailored education plans to meet your specific needs</p>
                  </div>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                  <div className="bg-white/30 p-3 rounded-full mr-4">
                    <i className="fas fa-users text-white text-lg md:text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base md:text-lg">Expert Tutors</h3>
                    <p className="text-white/90 text-sm md:text-base">Learn from qualified professionals in your field</p>
                  </div>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                  <div className="bg-white/30 p-3 rounded-full mr-4">
                    <i className="fas fa-clock text-white text-lg md:text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base md:text-lg">Flexible Schedule</h3>
                    <p className="text-white/90 text-sm md:text-base">Study at your own pace with 24/7 access</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Registration

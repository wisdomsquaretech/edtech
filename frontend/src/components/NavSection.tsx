import { useRouter } from 'next/navigation';
//'use client'; // optional if using interactivity

import Link from 'next/link';

const Nav = () => {
  return (
    
    <nav className="bg-white shadow-md py-4 px-8 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
        <div className="text-2xl font-bold text-blue-700">
          <i className="fas fa-globe-americas mr-2"></i>
          United Lingua
        </div>
        </Link>

        <div className="hidden md:flex space-x-8">
        <Link href="/student" className="text-gray-700 hover:text-blue-700 cursor-pointer">Student DB</Link>
        <Link href="/school" className="text-gray-700 hover:text-blue-700 cursor-pointer">School DB</Link>
        <Link href="/tutor" className="text-gray-700 hover:text-blue-700 cursor-pointer">Tutors DB</Link>
          <Link href="/registration" className="text-gray-700 hover:text-blue-700 cursor-pointer">Register</Link>
          <a href="#contact" className="text-gray-700 hover:text-blue-700 cursor-pointer">Contact</a>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="text-blue-700 hover:text-blue-900 cursor-pointer">
          <Link href="/registration?mode=login" className="text-blue-700 hover:text-blue-900 cursor-pointer">
                <i className="fas fa-sign-in-alt mr-1"></i> Login
          </Link>
          </button>
          <button className="bg-blue-700 text-white px-4 py-2 rounded-button hover:bg-blue-800 transition duration-300 whitespace-nowrap cursor-pointer">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

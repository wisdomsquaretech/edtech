import React from "react";
import HoursLookup from "./HoursLookup";
import { useCurrentUser } from "@/hooks/useCurrentUser";


interface HeaderProps {
  setNotificationsOpen: (open: boolean) => void;
  notificationsOpen: boolean;
  // user: any;
  greeting: string;
  dateString: string;
  
}


const Header: React.FC<HeaderProps> = ({ setNotificationsOpen, notificationsOpen,  greeting,
  dateString, }) => {

    const {user} = useCurrentUser();

  return (
    <header className="bg-white shadow-sm px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{greeting}, {user?.name}</h1>
          <p className="text-gray-600">{dateString}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
            <HoursLookup/>
          </div>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 text-gray-600 hover:text-indigo-600"
          >
            <i className="fas fa-bell"></i>
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-sm">
            <i className="fas fa-video mr-2"></i> Join Live Session
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

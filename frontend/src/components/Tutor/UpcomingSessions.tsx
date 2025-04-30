import React, { useEffect, useState } from "react";
import { tutorFunctionalityAPI } from "@/api";
import { getAuthToken, getAuthUser } from "@/hooks/useCurrentUser";
import config from "@/config";

const UpcomingSessions = () => {
  const token = getAuthToken();
  const user = getAuthUser();
  const tutorId = user?.id;

  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const generateMeetingLink = (tutorId: string, sessionId: string) => {
    const roomName = `${tutorId}_${sessionId}`;
    return `${config.jistiLink}/${roomName}`;
  };

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        if (tutorId && token) {
          const response = await tutorFunctionalityAPI.getUpcommingSession(tutorId, token);
          setSessions(response?.data || []);
        }
      } catch (err: any) {
        console.error("Failed to fetch sessions:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [tutorId, token]);

  if (loading) {
    return <div>Loading sessions...</div>;
  }


  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Upcoming Sessions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sessions.length === 0 ? (
          <p>No upcoming sessions found.</p>
        ) : (
          sessions.map((session, index) => {
            const meetingLink = generateMeetingLink(tutorId, session.id);
             return(
            <div key={index} className="bg-gray-50 rounded-lg p-4 border relative overflow-hidden">
              {session.dateLabel && (
                <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 text-xs font-semibold">
                  {session.dateLabel}
                </div>
              )}
              <h3 className="font-semibold text-gray-800">{session.id ? `Lesson #${session.id}` : "Session"}</h3>
              <p className="text-sm text-gray-600">Platform: {session.platform}</p>
              <div className="mt-3 flex items-center text-sm text-gray-500">
                <i className="fas fa-clock mr-2"></i>
                {session.start_time} - {new Date(session.end_time).toLocaleString()}
              </div>
              <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded text-sm transition-colors duration-200">
              
                <a href={meetingLink} className="flex-1 bg-indigo-600 text-white px-3 py-1.5 text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 !rounded-button whitespace-nowrap cursor-pointer" target="_blank" rel="noopener noreferrer">
                      Join Session
                </a>
              </button>
            </div>
          )}
          )
        )
        }

      </div>
    </div>
  );
};

export default UpcomingSessions;

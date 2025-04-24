
import React, { useEffect, useState } from "react";
import { getAuthToken, getAuthUser } from "@/hooks/useCurrentUser";
import { tutorHoursAPI } from "@/api";

const HoursLookup = () => {

    const [hours, setHours] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    const user = getAuthUser();
    const token = getAuthToken();

    useEffect(() => {
        const fetchHours = async () => {
            if (!user.id || !token) {
                alert("User or token is missing.");
                return;
            }
            try {
                const duration = await tutorHoursAPI.getHours(user.id, token);
                setHours(duration);
            } catch (err: any) {
                console.error("Error fetching hours:", err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchHours();
    }, [user, token]);

    if (loading) return null;

    return (
        <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <i className="fas fa-clock mr-2"></i>
            {hours} Hours Volunteered
        </div>
    );
};
export default HoursLookup;
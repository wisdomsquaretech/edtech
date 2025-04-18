'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Remove local storage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");

    // Clear role cookie
    document.cookie = "role=; path=/; max-age=0;";

    // Redirect to login
    router.push("/registration?mode=login");
  };

  return (
    <button onClick={handleLogout} className="text-red-500 font-semibold hover:underline">
      Logout
    </button>
  );
}

// src/utils/greeting.tsx
'use client';

import { useEffect } from 'react';

interface GreetingProps {
  onGreetingChange?: (greeting: string, date: string) => void;
}

const GreetingComponent: React.FC<GreetingProps> = ({ onGreetingChange }) => {
  useEffect(() => {
    const now = new Date();

    const formattedDate = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(now);

    const hour = now.getHours();
    let greeting = 'Hello';

    if (hour < 12) greeting = 'Good morning';
    else if (hour < 18) greeting = 'Good afternoon';
    else greeting = 'Good evening';

    // Pass the values up to parent
    if (onGreetingChange) {
      onGreetingChange(greeting, formattedDate);
    }
  }, [onGreetingChange]);

  return null; // this component doesn’t render anything directly
};

export default GreetingComponent;

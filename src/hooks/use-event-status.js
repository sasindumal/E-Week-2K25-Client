import { useState, useEffect } from 'react';

export const useEventStatus = (targetDate, endDate) => {
  const [status, setStatus] = useState('upcoming');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateStatus = () => {
      const now = new Date().getTime();
      const startTarget = new Date(targetDate).getTime();
      const endTarget = new Date(endDate).getTime();
      
      if (now >= endTarget) {
        // Event has ended
        setStatus('concluded');
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else if (now >= startTarget && now < endTarget) {
        // Event is live - countdown to end
        setStatus('live');
        const difference = endTarget - now;
        
        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          );
          const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60),
          );
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          setTimeLeft({ days, hours, minutes, seconds });
        }
      } else {
        // Event hasn't started yet - countdown to start
        setStatus('upcoming');
        const difference = startTarget - now;
        
        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          );
          const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60),
          );
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          setTimeLeft({ days, hours, minutes, seconds });
        }
      }
    };

    // Run immediately and then every second
    updateStatus();
    const timer = setInterval(updateStatus, 1000);

    return () => clearInterval(timer);
  }, [targetDate, endDate]);

  return { status, timeLeft };
};
